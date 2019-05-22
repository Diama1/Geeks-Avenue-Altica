import express from "express";
import bodyparser from "body-parser";
import UserRoutes from "./routers/UserRoute";

const app = express();
const Port = process.env.PORT || 9000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// below are the user endpoint for logging into the system
app.use("/api/v1/auth", UserRoutes);

app.listen(Port, () => {
    console.log(`the app is tuned on this server ${Port}`);
});
