import axios from 'axios';

export async function seoulSubwayAPI(subwayNm) {
    const KEY = process.env.AUTH_KEY;
    const TYPE = 'json';
    const SERVICE = 'realtimePosition';
    const START_INDEX = 0;
    const END_INDEX = 200;

    try {
        const url = `http://swopenAPI.seoul.go.kr/api/subway/${KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}/${subwayNm}`;
        const res = await axios.get(url);
        const status = res.data.errorMessage.status;
        const now = new Date();

        if (status === 200) {
            const count = res.data.realtimePositionList.length;
            console.log(`[${now.toLocaleString()}] ${subwayNm} 호출 성공 : ${count} 건`);
            return res.data.realtimePositionList;
        }
        else {
            console.log(`[${now.toLocaleString()}] ${subwayNm} 호출 실패 : ${status} status`);
            return null;
        }
    }
    catch (error) {
        const now = new Date();
        console.log(`[${now.toLocaleString()}] ${subwayNm} 호출 실패 : ${error.message}`);
        return null;
    }
}