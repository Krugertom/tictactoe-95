import { Orchestrator } from './orchestrator';
import { logger } from './logging/logger';


const orchestrator = new Orchestrator();

async function main() {
    try {
        await orchestrator.start();
    } catch (error) {
        logger.error({ err: error }, 'Failed to start server');
        process.exit(1);
    }
}

process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully');
    try {
        await orchestrator.stop();
        process.exit(0);
    } catch (error) {
        logger.error({ err: error }, 'Error during shutdown');
        process.exit(1);
    }
});

process.on('SIGINT', async () => {
    logger.info('SIGINT received, shutting down gracefully');
    try {
        await orchestrator.stop();
        process.exit(0);
    } catch (error) {
        logger.error({ err: error }, 'Error during shutdown');
        process.exit(1);
    }
});

main();
