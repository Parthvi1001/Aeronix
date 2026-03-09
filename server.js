const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'aeronix.html'));
});

app.get('/login', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Static Aeronix build. No APIs available.' });
});

app.listen(PORT, () => {
    console.log(`Static server running on http://localhost:${PORT}`);
});
