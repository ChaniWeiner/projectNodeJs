import express from "express";

import { userRouter } from "./routers/userRouter.js";
import { postRouter } from "./routers/postRouter.js";
import { todoRouter } from "./routers/todoRouter.js";
import { commentRouter } from "./routers/commentRouter.js";

const app = express()

app.use(express.json());
app.use('/users',userRouter);
app.use('/post',postRouter);
app.use('/todo',todoRouter);
app.use('/comment',commentRouter);

app.listen(8081, () => {
    console.log("start server port: 8081");
})
