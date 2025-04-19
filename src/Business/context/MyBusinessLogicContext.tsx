import { createContext, useEffect, useState } from 'react'
import MyBusinessLogicApp, { EnumRequestStatus } from '../App/App'

export type TInerfaceGlobalState = {
    longpollingState: EnumRequestStatus
}

export type TMyContext = {
    app: MyBusinessLogicApp
} & TInerfaceGlobalState

export const MyContext = createContext<TMyContext | undefined>(undefined)

export function MyBusinessLogicContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [app] = useState(new MyBusinessLogicApp())
    const [state, setState] = useState<TInerfaceGlobalState>({
        longpollingState: EnumRequestStatus.standby,
    })

    useEffect(() => {
        app.onStatusChanged((status: EnumRequestStatus) =>
            setState({
                longpollingState: status,
            })
        )

        const loop = () => {
            app.update()
            window.requestAnimationFrame(loop)
        }

        loop()
    }, [])

    return (
        <MyContext.Provider
            value={{ app, longpollingState: state.longpollingState }}
        >
            {children}
        </MyContext.Provider>
    )
}
