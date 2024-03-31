import express from "express";

import { pepoleRouter } from "./routers/pepoleRouter.js";

const app = express()

app.use('/pepole',pepoleRouter);

app.listen(8081, () => {
    console.log("start server port: 8081")
})
