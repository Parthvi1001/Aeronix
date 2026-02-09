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
