export type DbConfig = {
    database: string
    dialect: 'postgres'
    dialectOptions?: {
        ssl?: boolean
    }
    host: string
    migrationStorageTableName?: string
    password: string
    pool?: {
        max?: number
    }
    port: number
    schema?: string
    username: string
}
