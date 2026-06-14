import fastify from 'fastify'
import type {FastifyError, FastifyInstance} from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
    jsonSchemaTransform,
    jsonSchemaTransformObject,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import {config} from '#/config'
import {registerHealthCheckRoutes} from '#/infrastructure/routes/healthcheck'

export function createServer() {
    const app = fastify({
        disableRequestLogging: true,
        logger: true,
    }).withTypeProvider<ZodTypeProvider>()

    // zod compatibility
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    // openapi
    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'ACCOUNTING API',
                version: '1.0.0',
            },
        },
        refResolver: {buildLocalReference: json => `${json.$id}`},
        transform: jsonSchemaTransform,
        transformObject: jsonSchemaTransformObject,
    })

    app.register(fastifySwaggerUi, {
        routePrefix: '/openapi',
    })

    app.get('/openapi.yaml', {schema: {tags: ['X-HIDDEN']}}, async (_, reply) => {
        await app.ready()
        const openapi = app.swagger({yaml: true})
        reply.type('text/plain').send(openapi)
    })
    app.get('/', {schema: {tags: ['X-HIDDEN']}}, async (_, reply) => {
        reply.redirect('/openapi')
    })

    // error handler
    app.setErrorHandler<FastifyError>((error, req, res) => {
        app.log.error({error, res}, error.message)
        res.code(error.statusCode ?? 500).send({
            error: error.name,
            message: error.message,
            statusCode: error.statusCode ?? 500,
        })
    })

    // "locals" object in request
    app.decorateRequest('locals')
    app.addHook('onRequest', async req => {
        // @ts-ignore: Required to avoid sharing locals reference between requests
        req.locals = {}
    })

    // routes
    registerHealthCheckRoutes(app)

    return app
}

export async function startServer(app: FastifyInstance) {
    // Start the server
    await app.listen({host: config.http.host, port: config.http.port})
}
