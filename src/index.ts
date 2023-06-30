import express from "express";
import route from "./routes/index";
const app = express();
const port = 3000;
route(app);
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
