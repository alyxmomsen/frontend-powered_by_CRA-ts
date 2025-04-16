import { createContext, useEffect, useState } from 'react'
import MyBusinessLogicApp from '../App/App'

export interface IMyContext {
    app: MyBusinessLogicApp
}

export const MyContext = createContext<IMyContext | undefined>(undefined)

export function MyBusinessLogicContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [app, setApp] = useState(new MyBusinessLogicApp())

    useEffect(() => {
        const loop = () => {
            console.log('lllllooooppp')

            app.update()

            window.requestAnimationFrame(loop)
        }

        loop()
    }, [])

    return <MyContext.Provider value={{ app }}>{children}</MyContext.Provider>
}
