import type {FastifyInstance, FastifyPluginAsync} from 'fastify'

import {db} from '#/infrastructure/db'

const STATUS = {
    KO: 'KO',
    OK: 'OK',
} as const

const healthCheckRoutes: FastifyPluginAsync = async server => {
    server.get('/live', {schema: {tags: ['X-HIDDEN']}}, async (_, reply) => {
        return reply.code(200).send({status: STATUS.OK})
    })

    server.get('/ready', {schema: {tags: ['X-HIDDEN']}}, async (_, reply) => {
        const [isDbOK] = await Promise.all([
            db
                .authenticate({logging: false})
                .then(() => true)
                .catch(() => false),
        ])

        return reply.code(isDbOK ? 200 : 500).send({status: isDbOK ? STATUS.OK : STATUS.KO})
    })
}

export const registerHealthCheckRoutes = (server: FastifyInstance) => {
    server.register(healthCheckRoutes, {
        logLevel: 'error',
        prefix: '/check',
    })
}
