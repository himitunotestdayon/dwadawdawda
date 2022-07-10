import type { ChangeEventHandler, FC } from 'react'
import cssLabel from './index.module.css'

type LabelProps = {
    prefCode: number
    changefunc: ChangeEventHandler<HTMLInputElement>
    prefName: string
}//依存してるならそれがわかるようにcheckboxwithlabel

export const Label: FC<LabelProps> = (props) =>{
    return(
        <label key="" className={cssLabel.label}>
        <input type="checkbox" className={cssLabel.input} value={props.prefCode} onChange={props.changefunc}/>{props.prefName}
        </label>
    )
}