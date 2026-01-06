const logger = require('./logger'); 

const serverHealthCheck = (url) => {
    const healthCheck = async () => {
        try {
            const response = await fetch(url);
            logger.info(`Pinged portfolio page: ${response.status}`);
        } catch (error) {
            logger.error(`Error pinging portfolio page: ${error.message}`);
        }
    };

    healthCheck();
    setInterval(healthCheck, 14 * 60 * 1000);
};

module.exports = serverHealthCheck;
