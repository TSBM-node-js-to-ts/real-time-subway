import dotenv from 'dotenv';
import { subwayDataService } from './src/service/subwayDataService.js';

dotenv.config();
const intervalTime = Number(process.env.INTERVAL_TIME);

setInterval(async () => {
    await subwayDataService()
}, intervalTime);