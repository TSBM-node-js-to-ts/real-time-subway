import fs from 'fs';
import path from 'path';

export async function saveToFile(allProcess) {
    try {
        const filePath = path.resolve('subwayData.json');
        fs.writeFileSync(filePath, JSON.stringify(allProcess, null, 2), 'utf-8');

        const now = new Date();
        const count = allProcess.length;
        console.log(`[${now.toLocaleString()}] 저장 성공 : ${count} 건`);
    }
    catch (error) {
        const now = new Date();
        console.log(`[${now.toLocaleString()}] 저장 실패 : ${error.message}`);
    }
}