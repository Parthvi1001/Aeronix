const express = require('express');
const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.static(__dirname));

async function ensureDatabase() {
    try {
        await fs.access(DB_FILE);
    } catch (error) {
        await fs.writeFile(DB_FILE, JSON.stringify({ users: [] }, null, 2), 'utf8');
        console.log(`Created database file at ${DB_FILE}`);
    }
}

async function readDatabase() {
    const file = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(file);
}

async function writeDatabase(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function sanitizeUser(user) {
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
}

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const db = await readDatabase();
        const existing = db.users.find(user => user.email.toLowerCase() === email.toLowerCase());

        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const now = new Date().toISOString();
        const user = {
            id: crypto.randomUUID(),
            email,
            name: name || '',
            password: hashPassword(password),
            createdAt: now,
            lastLogin: now
        };

        db.users.push(user);
        await writeDatabase(db);

        res.json({
            success: true,
            message: 'User created successfully',
            user: sanitizeUser(user)
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const db = await readDatabase();
        const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user || user.password !== hashPassword(password)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        user.lastLogin = new Date().toISOString();
        await writeDatabase(db);

        res.json({
            success: true,
            message: 'Sign in successful',
            user: sanitizeUser(user)
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.get('/api/users', async (_req, res) => {
    try {
        const db = await readDatabase();
        res.json({
            success: true,
            users: db.users.map(sanitizeUser)
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

ensureDatabase()
    .then(() => {
                app.listen(PORT, () => {
                    console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Database file: ${DB_FILE}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
                if (error.code === 'EADDRINUSE') {
                    console.error(`Port ${PORT} is already in use. Stop the other process or change PORT in server.js.`);
                }
        process.exit(1);
    });
