import 'reflect-metadata'

import { COOKIE_NAME, __prod__ } from './constants'

import { ApolloServer } from 'apollo-server-express'
import { HelloResolver } from './resolvers/hello'
import { Post } from "./entities/Post"
import { PostResolver } from './resolvers/post'
import Redis from 'ioredis'
import { User } from "./entities/User"
import { UserResolver } from './resolvers/user'
import { buildSchema } from 'type-graphql'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { createConnection } from "typeorm"
import express from 'express'
import path from 'path'
import session from 'express-session'

const main = async () => {
const conn =	await createConnection({
		type: 'postgres',
		database: 'social-media',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		migrations: [path.join(__dirname, './migrations/*')],
		entities: [Post, User]
	})

await conn.runMigrations()

	const app = express()

	const RedisStore = connectRedis(session)
	const redis = new Redis()
	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		}),
	)

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax', // csrf
				secure: __prod__, // cookie only works in https
			},
			saveUninitialized: false,
			secret: 'qowiueojwojfalksdjoqiwueo',
			resave: false,
		}),
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res, redis }),
	})

	apolloServer.applyMiddleware({
		app,
		cors: false,
	})

	app.listen(4000, () => {
		console.log('server started on localhost:4000')
	})
}

main().catch((err) => {
	console.error(err)
})
