import express from "express";

import { userRouter } from "./routers/userRouter.js";
import { todoRouter } from "./routers/todoRouter.js";

const app = express()

app.use(express.json());
app.use('/users',userRouter);
app.use('/todos',todoRouter);

app.listen(8081, () => {
    console.log("start server port: 8081");
})
