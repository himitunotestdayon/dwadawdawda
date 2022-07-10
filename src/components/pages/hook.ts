import axios from "axios"
import { useEffect, useState } from "react"
import { korubaku, seriesHighcharts } from "../../types"

export const useView= () => {
    //Checkboxを作るための都道府県名とそのCodeのstate
    const [prefectureNames, setPrefectureNames] = useState<korubaku[]>([])

    //Highchartに渡すためのstate
    const [valuesForHighcharts, setValuesForHighcharts] = useState<seriesHighcharts[]>([])

    //何年から何年までの数値が入っているかのstate
    const [y_AxisYears, setY_AxisYears] = useState<number[]>([])

    useEffect(() => {
        const getPrefectureFromApi = async () => {
            const {data} = await axios.get("/api/hello")
            if(data.message === "成功"){
                setPrefectureNames([...data.result])
            }else{
                alert(data.message)
            }
        }
        getPrefectureFromApi()
    },[]);

    const updatePrefectureData = async (e : React.ChangeEvent<HTMLInputElement>) =>{
        const updatedPrefectures = await Promise.all(
            prefectureNames.map(async (prefectureData) =>{
            if(e.currentTarget.value === String(prefectureData.prefCode)){
                prefectureData.data = prefectureData.data ?? await getPopulationFromApi(prefectureData.prefCode)
                prefectureData.data?.length ? prefectureData.selected = e.target.checked : e.target.checked = !e.target.checked
            }
            return prefectureData
            })
        )
        renderHighCharts()
        setPrefectureNames(updatedPrefectures)
    }

    const getPopulationFromApi = async (prefCode:number) =>{
        const {data} = await axios.get("/api/populationPerYear/".concat(String(prefCode)))
        if(data.message === "成功"){
            return [...data.result.data[0].data]
        }else{
            alert(data.message)
            return undefined
        }
    }

    const renderHighCharts = () =>{
        //年度は全ての都道府県において1960〜2045までであるためデータの入っている最初のyearを横軸に
        const x_AxisYears = prefectureNames.find(x => x.data)?.data?.map(x => x.year)??[]
        setY_AxisYears(x_AxisYears)

        const chartIntoValue = prefectureNames
                            .filter((x) => x.selected)
                            .map((x:korubaku) : seriesHighcharts=> (
                                {
                                name : x.prefName,
                                data : x.data?.map(x => x.value)??[],
                                pointPlacement : "on"
                                }
                            ))
        setValuesForHighcharts(chartIntoValue)
    }

    const options = { 
        title: {
            text: '総人口推移',
        },
        
        xAxis: {
            categories: y_AxisYears,
            title: {
                text: "年度",
            },
        },
        
        yAxis: {
            title: {
                text: "人口数",
            },
        },
        
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        
        series: 
            valuesForHighcharts
        ,
        
        responsive: {
            rules: [
            {
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    pane: {
                        size: '100%'
                    }
                }
            }
            ]
        }
    };

    return{
        prefectureNames,
        updatePrefectureData,
        options,
    }
}