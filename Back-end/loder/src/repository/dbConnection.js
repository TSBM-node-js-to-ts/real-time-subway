import mysql from 'mysql2/promise';

export async function dbConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_IP,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_SCHEMA
        });

        const now = new Date();
        console.log(`[${now.toLocaleString()}] DB 연결 성공`);
        return connection;
    }
    catch(error) {
        const now = new Date();
        console.log(`[${now.toLocaleString()}] DB 연결 실패 : ${error.message}`);
        return null;
    }
}