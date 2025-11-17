import { dbConnection } from './dbConnection.js';

export async function saveToDb(allProcess) {
    try {
        const db = await dbConnection();

        //tmp 테이블 비우기
        const tmpCleanQuery = 'TRUNCATE TABLE tmp';
        await db.query(tmpCleanQuery);

        //tmp 테이블에 데이터 삽입
        const tmpInsertQuery = `
            INSERT INTO tmp (
                subwayId,
                subwayNm,
                statnId,
                statnNm,
                trainNo,
                updnLine,
                statnTid,
                statnTnm,
                trainSttus,
                directAt,
                lstcarAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        for (const process of allProcess) {
            await db.query(tmpInsertQuery, [
                process.subwayId,
                process.subwayNm,
                process.statnId,
                process.statnNm,
                process.trainNo,
                process.updnLine,
                process.statnTid,
                process.statnTnm,
                process.trainSttus,
                process.directAt,
                process.lstcarAt
            ]);
        }

        //tmp 테이블을 main 테이블에 적용
        await db.beginTransaction();
        const mainCleanQuery = 'TRUNCATE TABLE main';
        await db.query(mainCleanQuery);
        const mainInsertQuery = 'INSERT INTO main SELECT * FROM tmp';
        await db.query(mainInsertQuery);
        await db.commit();

        await db.end()

        const now = new Date();
        console.log(`[${now.toLocaleString()}] DB 저장 성공`);
    }
    catch (error) {
        const now = new Date();
        console.log(`[${now.toLocaleString()}] DB 저장 실패 : ${error.message}`);
    }
}