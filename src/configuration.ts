const {
    APP_PORT,
    REDIS_PORT,
    REDIS_HOST,
    RABBITMQ_NAME,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASS,
    POSTGRES_DATABASE,
    POSTGRES_PORT,
} = process.env;

export const configuration = {
    appPort: APP_PORT,

    redis: {
        port: parseInt(REDIS_PORT, 10),
        host: REDIS_HOST,
    },

    rabbitmq: {
        name: RABBITMQ_NAME,
        hostname: RABBITMQ_HOST,
        port: parseInt(RABBITMQ_PORT, 10),
    },

    postgres: {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASS,
        database: POSTGRES_DATABASE,
        port: parseInt(POSTGRES_PORT, 10),
    },
};
