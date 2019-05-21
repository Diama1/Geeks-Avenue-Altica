import express from 'express';
import bodyparser from 'body-parser';

const app = express();
const Port = process.env.PORT || 9000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.listen(Port, () => {
    console.log(`the app is tuned on this server ${Port}`);
});
