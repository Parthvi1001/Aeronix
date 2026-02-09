const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Static Aeronix build. No APIs available.' });
});

app.listen(PORT, () => {
    console.log(`Static server running on http://localhost:${PORT}`);
});
        await fs.writeFile(DB_FILE, JSON.stringify({ users: [] }, null, 2));
