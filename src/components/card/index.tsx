import type { FC } from 'react'
import styleCard from './index.module.css'

type CardProps = {//type宣言は大文字
    //index.module.cssに
    children?: React.ReactNode
}

export const Card: FC<CardProps> = ({children}) =>{
    return(
        <div className={styleCard.card}>
            {children}
        </div>
    )
}