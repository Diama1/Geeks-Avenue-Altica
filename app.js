import express from "express";
import bodyparser from "body-parser";
import swaggerUI from "swagger-ui-express";
import UserRoutes from "./routers/UserRoute";
import articleRoutes from "./routers/Article.route";
import swaggerDocument from "./Swagger-Docs/swagger.json";

const app = express();
const Port = process.env.PORT || 9000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// below are the user endpoint for logging into the system
app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/articles", articleRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const server = app.listen(Port, () => {
    console.log(`the app is tuned on this server ${Port}`);
});

export default server;
