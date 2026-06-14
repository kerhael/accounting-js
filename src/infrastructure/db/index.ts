import {Sequelize} from 'sequelize'

import {config} from '#/config'

export const db = new Sequelize({
    ...config.db,
    logging: process.env.NODE_LOG_SQL === 'true',
})
