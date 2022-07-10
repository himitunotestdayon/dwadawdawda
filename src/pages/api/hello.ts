import axios, { AxiosResponse }  from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Axios } from 'axios'
import { getRESASApiResponseResult } from '../../components/pages/getRESASApiResponseResult';


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {headers: {"X-API-KEY": process.env.API_KEY as string}})
  .then(response =>{
    const w2 = getRESASApiResponseResult(response)
    res.status(w2.code).json({message: w2.message, result:w2.result})
  })
  .catch(error =>{
    res.status(200).json({message: "ネットワークエラー、またはURLがまちがっている可能性があります。", result:undefined})
  })
  
}