import { useContext } from 'react'
import {
    TMyContext,
    MyBusinessLogicContext,
    MyContext,
} from '../Business/context/MyBusinessLogicContext'

export function UseMyContext(): TMyContext {
    const ctx = useContext(MyContext)

    if (ctx === undefined) throw new Error('no context')

    return { app: ctx.app, longpollingState: ctx.longpollingState }
}
