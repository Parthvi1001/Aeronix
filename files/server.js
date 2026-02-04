const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Initialize database file if it doesn't exist
async function initDatabase() {
    try {
        await fs.access(DB_FILE);
    } catch {
        await fs.writeFile(DB_FILE, JSON.stringify({ users: [] }, null, 2));
    }
}

// Read database
async function readDB() {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
}

// Write database
async function writeDB(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Hash password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Sign up endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const db = await readDB();

        // Check if user already exists
        const existingUser = db.users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create new user
        const newUser = {
            id: crypto.randomUUID(),
            email,
            name: name || '',
            password: hashPassword(password),
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        db.users.push(newUser);
        await writeDB(db);

        // Don't send password back
        const { password: _, ...userWithoutPassword } = newUser;

        res.json({ 
            success: true, 
            message: 'User created successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Sign in endpoint
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password, remember } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const db = await readDB();
        const user = db.users.find(u => u.email === email);

        if (!user || user.password !== hashPassword(password)) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        await writeDB(db);

        // Don't send password back
        const { password: _, ...userWithoutPassword } = user;

        res.json({ 
            success: true, 
            message: 'Sign in successful',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all users (for admin purposes - remove in production)
app.get('/api/users', async (req, res) => {
    try {
        const db = await readDB();
        // Remove passwords from response
        const usersWithoutPasswords = db.users.map(({ password, ...user }) => user);
        res.json({ success: true, users: usersWithoutPasswords });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start server
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Database file: ${DB_FILE}`);
    });
});
