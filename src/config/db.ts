import type {DbConfig} from '#/domain/types/db'

type Env = 'development' | 'test' | 'production'

const baseConfig: DbConfig = {
    database: process.env.DB_NAME || 'accounting',
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'postgres',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
}

const dbConfig: Record<Env, DbConfig> = {
    development: baseConfig,
    production: baseConfig,
    test: {
        ...baseConfig,
        database: process.env.DB_NAME || 'accounting_test',
    },
}

export default dbConfig
