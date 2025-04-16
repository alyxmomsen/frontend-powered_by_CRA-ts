import React, { createContext, useContext, useEffect, useState } from 'react'
import { EnumRequestStatus } from '../App/App'
import { UseMyContext } from '../../hooks/UseMyContext'

export type TInerfaceGlobalState = {
    longpollingState: EnumRequestStatus
}

export type TInterfaceContext = {
    longpollingState: EnumRequestStatus
    updateContext: (newState: TInerfaceGlobalState) => void
}

const Ctx = createContext<TInterfaceContext | undefined>(undefined)

export function InerfaceContextComponent({
    children,
}: {
    children: React.ReactNode
}) {
    const { app } = UseMyContext()
    const [state, setState] = useState<TInerfaceGlobalState>({
        longpollingState: EnumRequestStatus.idle,
    })

    useEffect(() => {
        app.onStatusChanged((status: EnumRequestStatus) =>
            setState({ longpollingState: status })
        )
    }, [])

    return (
        <Ctx.Provider
            value={{
                longpollingState: state.longpollingState,
                updateContext: (newState: TInerfaceGlobalState) =>
                    setState(newState),
            }}
        >
            {children}
        </Ctx.Provider>
    )
}

export const UseInterfaceContext = () => {
    const { app } = UseMyContext()
    const ctx = useContext(Ctx)

    if (ctx === undefined) throw new Error('no interface context')

    return ctx
}
