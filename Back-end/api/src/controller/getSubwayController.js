import { getSubwayService } from '../service/getSubwayService.js';

export async function getSubwayController(req, res) {
    try {
        const line = req.params.line;
        const result = await getSubwayService(line);

        if (result.status !== 200) {
            res.status(result.status).json(result.message);
        }

        return res.status(result.status).json(result.data);
    }
    catch(error) {
        return res.status(500).json(error.message);
    }
}