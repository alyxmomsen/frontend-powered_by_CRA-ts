import { useContext } from 'react'
import {
    IMyContext,
    MyBusinessLogicContext,
    MyContext,
} from '../Business/context/MyContext'

export function UseMyContext(): IMyContext {
    const ctx = useContext(MyContext)

    if (ctx === undefined) throw new Error('no context')

    return { app: ctx.app }
}
