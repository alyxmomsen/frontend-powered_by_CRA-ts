import { UseMyContext } from '../hooks/UseMyContext'
// import { UseInterfaceContext } from '../Business/context/RendeContext'
import { EnumRequestStatus } from '../Business/App/App'

const MyDemoComponent = () => {
    const { app , longpollingState } = UseMyContext()
    // const { longpollingState } = UseInterfaceContext()

    return (
        <div>
            <h1>header 1</h1>
            <div></div>
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
                    {longpollingState === EnumRequestStatus.idle
                        ? 'idle'
                        : longpollingState === EnumRequestStatus.inProcess
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
