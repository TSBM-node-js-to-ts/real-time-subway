import express from 'express';
import dotenv from 'dotenv';
import { getSubwayController } from './src/controller/getSubwayController.js'

dotenv.config();
const port = process.env.PORT;
const app = express();

app.get('/getSubway/:line', getSubwayController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});