require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('./utils/logger');
const serverHealthCheck = require('./utils/serverHealth');
const requestLogger = require('./middleware/requestLogger');
const { version } = require('./package.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(requestLogger);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Hi!' });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API running' });
});

app.get('/admin/only/health', (req, res) => {
    res.status(200).json({ status: 'Server running' });
});

// Start server
app.listen(PORT, () => {

    // ✨ Nice startup log
    logger.info('🚀================ SERVER START =================🚀');
    logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`📝 App version: v${version}`);
    logger.info(`📡 Listening on port: ${PORT}`);
    logger.info(`🏠 Visit: http://localhost:${PORT}`);
    logger.info('🚀===============================================🚀');

    // Start health check
    serverHealthCheck("https://portfolio-page-5kft.onrender.com/");
});
