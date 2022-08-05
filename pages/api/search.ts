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
  const { title } = req.query
  return new Promise((resolve, reject) => {
    axios.get('https://th-recruiting-moviesapi.herokuapp.com/search?title=' + title)
      .then(response => {
        res.status(200).json({ data: response.data })
        resolve(response.data);
      })
      .catch(error => {
        res.status(500).json({ data: error })
        resolve(error);
      })
  });
}
