import { seoulSubwayAPI } from '../api/seoulSubwayAPI.js';
import { saveToFile } from '../fs/saveToFile.js';
import { saveToDb } from '../repository/saveToDb.js';

export async function subwayDataService() {
    const lines = process.env.SUBWAY_LINES.split(',');
    const allProcess = [];

    for (const line of lines) {
        const data = await seoulSubwayAPI(line);

        if (data === null) {
            continue;
        }

        const process = data.map(item => ({
            subwayId: item.subwayId,        //지하철호선ID
            subwayNm: item.subwayNm,        //지하철호선명
            statnId: item.statnId,          //지하철역ID
            statnNm: item.statnNm,          //지하철역명
            trainNo: item.trainNo,          //열차번호
            updnLine: item.updnLine,        //상하행선구분 (0 : 상행/내선, 1 : 하행/외선)
            statnTid: item.statnTid,        //종착지하철역ID
            statnTnm: item.statnTnm,        //종착지하철역명
            trainSttus: item.trainSttus,    //열차상태구분 (0:진입 1:도착, 2:출발, 3:전역출발)
            directAt: item.directAt,        //급행여부 (1:급행, 0:아님, 7:특급)
            lstcarAt: item.lstcarAt,        //막차여부(1:막차, 0:아님)
        }));

        allProcess.push(...process);
    }

    //await saveToFile(allProcess);
    await saveToDb(allProcess);
    return allProcess;
}