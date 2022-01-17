import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { MikroORM } from "@mikro-orm/core";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
// import { MyContext } from './types';
import cors from "cors";
import express from "express";
import microConfig from "./mikro-orm.config";
import redis from "redis";
import session from "express-session";

const main = async () => {
	const orm = await MikroORM.init(microConfig);
	await orm.getMigrator().up();

	const app = express();

	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient();
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	app.use(
		session({
			name: "qid",
			store: new RedisStore({
				client: redisClient,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: "lax", // csrf
				secure: __prod__, // cookie only works in https
			},
			saveUninitialized: false,
			secret: "qowiueojwojfalksdjoqiwueo",
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ em: orm.em, req, res }),
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(4000, () => {
		console.log("server started on localhost:4000");
	});
};

main().catch((err) => {
	console.error(err);
});