import express from "express";

import { userRouter } from "./routers/userRouter.js";

const app = express()

app.use(express.json());
app.use('/users',userRouter);

app.listen(8081, () => {
    console.log("start server port: 8081")
})
