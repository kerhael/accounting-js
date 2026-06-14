import {type Config} from '#/domain/types/config'

import dbConf from './db'

let env: 'development' | 'test' | 'production' = 'production'
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    env = process.env.NODE_ENV
}

export const config: Config = {
    appName: 'accounting',
    db: dbConf[env],
    env,
    http: {
        host: process.env.HTTP_HOST || '',
        port: +(process.env.HTTP_PORT || 8085),
    },
    logLevel: process.env.NODE_LOG_LEVEL || 'info',
}
