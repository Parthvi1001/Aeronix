const express = require('express');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;

// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Change this to your MySQL password
    database: 'aeronix_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Initialize Database - Create table if it doesn't exist
async function initDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // Create users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(36) PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255),
                password VARCHAR(64) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                lastLogin TIMESTAMP NULL
            )
        `);
        
        connection.release();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
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
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        const connection = await pool.getConnection();

        try {
            // Check if user already exists
            const [existingUser] = await connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (existingUser.length > 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'User already exists' 
                });
            }

            // Create new user
            const userId = crypto.randomUUID();
            const hashedPassword = hashPassword(password);

            await connection.query(
                'INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)',
                [userId, email, name || '', hashedPassword]
            );

            res.json({ 
                success: true, 
                message: 'User created successfully',
                user: {
                    id: userId,
                    email,
                    name: name || ''
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Sign in endpoint
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password, remember } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        const connection = await pool.getConnection();

        try {
            // Find user
            const [users] = await connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            const user = users[0];

            if (!user || user.password !== hashPassword(password)) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Invalid email or password' 
                });
            }

            // Update last login
            await connection.query(
                'UPDATE users SET lastLogin = NOW() WHERE id = ?',
                [user.id]
            );

            res.json({ 
                success: true, 
                message: 'Sign in successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Get all users (for admin purposes - remove in production)
app.get('/api/users', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        try {
            const [users] = await connection.query(
                'SELECT id, email, name, createdAt, lastLogin FROM users'
            );

            res.json({ 
                success: true, 
                users 
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Start server
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Connected to MySQL database: aeronix_db');
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
