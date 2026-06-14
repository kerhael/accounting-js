import {createServer, startServer} from '#/server'

const app = createServer()
startServer(app)

process.on('uncaughtException', err => {
    app.log.error(err)
    process.exit(1)
})

process.on('unhandledRejection', err => {
    app.log.error(err)
    process.exit(1)
})
