// Next.js API route support: 
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
    data: any
}

export default function search(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { omdb_id, favorite } = req.query
    return new Promise((resolve, reject) => {
        axios.post('https://th-recruiting-moviesapi.herokuapp.com/favorites?omdb_id=' + omdb_id + "&favorite=" + favorite)
            .then(response => {
                res.status(200).json({ data: response.data })
                resolve(response.data);
            })
            .catch(error => {
                res.status(500).json({ data: error })
                resolve(error.data);
            })
    });
}
