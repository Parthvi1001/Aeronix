# Sign In Application with JSON Database

A complete authentication system that stores user data in a JSON file.

## Features

✅ User sign up and sign in
✅ Password hashing (SHA-256)
✅ JSON file database
✅ Remember me functionality
✅ Responsive design
✅ Form validation
✅ Success messages

## Files Included

- `index.html` - Frontend sign-in/sign-up page
- `server.js` - Backend Node.js server with Express
- `package.json` - Node.js dependencies
- `users.json` - Auto-created database file (stores user data)

## Setup Instructions

### 1. Install Node.js
Make sure you have Node.js installed on your computer. Download from: https://nodejs.org/

### 2. Install Dependencies
Open terminal/command prompt in the project folder and run:
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Database file: /path/to/users.json
```

### 4. Open the Application
Open your browser and go to: http://localhost:3000

## How to Use

### Sign Up
1. Click "Sign up" link
2. Enter your email and password (name is optional)
3. Click "Sign Up" button
4. You'll be automatically signed in

### Sign In
1. Enter your email and password
2. Check "Remember me" if desired
3. Click "Sign In" button
4. You'll see a welcome screen with your account details

### Sign Out
Click the "Sign Out" button on the success screen

## Database Structure

The `users.json` file stores data in this format:

```json
{
  "users": [
    {
      "id": "unique-uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "password": "hashed-password",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "lastLogin": "2024-01-02T12:00:00.000Z"
    }
  ]
}
```

## API Endpoints

### POST /api/signup
Create a new user account
```json
{
  "email": "user@example.com",
  "password": "your-password",
  "name": "Your Name"
}
```

### POST /api/signin
Sign in an existing user
```json
{
  "email": "user@example.com",
  "password": "your-password",
  "remember": true
}
```

### GET /api/users
Get all users (for debugging - remove in production)

## Security Notes

⚠️ **This is a demonstration project. For production use:**

1. Use bcrypt instead of SHA-256 for password hashing
2. Implement JWT tokens for authentication
3. Add HTTPS/SSL encryption
4. Use a real database (MongoDB, PostgreSQL, etc.)
5. Add rate limiting
6. Implement CSRF protection
7. Add email verification
8. Use environment variables for sensitive data
9. Remove the `/api/users` endpoint

## Troubleshooting

**Server won't start:**
- Make sure port 3000 is not already in use
- Check that Node.js is installed: `node --version`

**Can't connect to server:**
- Verify the server is running
- Check that you're accessing http://localhost:3000

**Data not saving:**
- Check file permissions in the directory
- Make sure the server has write access

## Customization

**Change the port:**
Edit `server.js` and change:
```javascript
const PORT = 3000; // Change to your desired port
```

**Change database file location:**
Edit `server.js` and change:
```javascript
const DB_FILE = path.join(__dirname, 'users.json'); // Change path
```

## License

Free to use and modify!
