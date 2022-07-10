

export type pople = 'on' | 'between' | number | undefined
//47都道府県の各情報を取得し、記録しておくstate
export type korubaku = {
    prefCode : number                             /*1~47*/
    prefName : string                             /*北海道*/
    selected? : boolean
    data? : { year: number; value: number }[]     /*1990  540430*/
}
export type seriesHighcharts={
    name : string       //北海道
    data : number[]     //540430
    pointPlacement : pople  //'on' | 'between' | number | undefined
}