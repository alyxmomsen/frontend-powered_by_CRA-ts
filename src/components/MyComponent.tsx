import { UseMyContext } from '../hooks/UseMyContext'
// import { UseInterfaceContext } from '../Business/context/RendeContext'
import { EnumRequestStatus } from '../Business/App/App'
import { useEffect, useState } from 'react'

const MyDemoComponent = () => {
    const { app, longpollingState } = UseMyContext()
    // const { longpollingState } = UseInterfaceContext()

    const [websocketMessage, setMessage] = useState<string>('no message')

    useEffect(() => {
        app.onWebSocketMessageResponse((message: string) => setMessage(message))
    }, [])

    return (
        <div>
            <h1>header 1</h1>
            <div>
                <h2>websocket</h2>
                <button
                    onClick={() => {
                        app.initWebSocket()
                    }}
                >
                    init
                </button>
                <div>{websocketMessage}</div>
            </div>
            <button
                onClick={() => {
                    app.addTransactionAction({
                        foo: 'fucking bar',
                    })
                }}
            >
                send action
            </button>
            <div>
                <div>
                    {longpollingState === EnumRequestStatus.standby
                        ? 'idle'
                        : longpollingState === EnumRequestStatus.pending
                          ? 'in process'
                          : longpollingState === EnumRequestStatus.returned
                            ? 'returned'
                            : 'other'}
                </div>
                <button
                    onClick={() => {
                        app.startLongpooling()
                    }}
                >
                    start
                </button>
                <button
                    onClick={() => {
                        app.stopLongpooling()
                    }}
                >
                    stop
                </button>
            </div>
        </div>
    )
}

export default MyDemoComponent
