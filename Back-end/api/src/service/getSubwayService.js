import { geteSubwayRepository } from '../repository/geteSubwayRepository.js';

export async function getSubwayService(line) {
    try {
        const lines = process.env.SUBWAY_LINES.split(',');

        if (!lines.includes(line)) {
            return {
                status: 400,
                message: '유효하지 않은 호선'
            }
        }

        const data = await geteSubwayRepository(line);

        if (data === null || data.length === 0) {
            return {
                status: 400,
                message: '데이터 없음'
            }
        }

        return {
            status: 200,
            data: data
        }
    }
    catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}