import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getRESASApiResponseResult } from '../../../components/pages/getRESASApiResponseResult';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await axios.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode='.concat(String(req.query.id)), {headers: {"X-API-KEY": process.env.API_KEY as string,}})
  .then(response =>{
    const resultResponse = getRESASApiResponseResult(response)
    res.status(resultResponse.code).json({message: resultResponse.message, result:resultResponse.result})
  })
  .catch(error =>{
    res.status(200).json({message: "ネットワークエラー、またはURLがまちがっている可能性があります。", result:undefined})
  })
}
