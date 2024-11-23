import express from "express";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./models";
import "dotenv/config";
import { userRouter } from "./routes/userRouter";
import { articleRouter } from "./routes/articleRouter";

const app = express();
const db = drizzle(postgres(process.env.DATABASE_URL as string),{schema, logger: true});

app.use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/user', userRouter)
    .use('/article', articleRouter);

app.listen(8080, () => {
    console.log('App is running on port 8080');
})

export {db};