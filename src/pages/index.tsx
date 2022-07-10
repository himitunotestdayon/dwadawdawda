import type { NextPage } from 'next'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import stylessss from '../components/layout.module.css'
import { useView } from '../components/pages/hook'
import { Label } from '../components/label'
import { Card } from '../components/card'
import { Center } from '../components/center'
import { LabelGrid } from '../components/labelgrid'
import { Padding } from '../components/padding'

const Home = () => {

  const {prefectureNames, updatePrefectureData, options} = useView()
  
  //labelgrid横幅設定
  //labelname func 
  return (
    <Center>
      <Card>
        <div>
          <Padding>
            {prefectureNames.length ? 
            <>
              <h1 className={stylessss.title}>各都道府県における総人口推移</h1>
              <span>都道府県</span>
              <LabelGrid>
                {prefectureNames.map((rere) =>(
                  <Label key="" prefCode={rere.prefCode} changefunc={updatePrefectureData} prefName={rere.prefName}/>
                ))}
              </LabelGrid>
            </>
            : <h1 className={stylessss.title}>ローディング中・・・</h1>}
          </Padding>
          <Padding>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Padding>
        </div>
      </Card>
    </Center>
  )
}

export default Home

