import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('../loader/subwayData.json');

export async function geteSubwayRepository(line) {
    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        const allData = JSON.parse(fileData);
        const data = allData.filter(item => item.subwayNm === line);

        return data;
    }
    catch (error) {
        return null;
    }
}