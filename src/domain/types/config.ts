import {type DbConfig} from './db'

export type Config = {
    appName: string
    db: DbConfig
    env: string
    http: {
        host: string
        port: number
    }
    logLevel: string
}
