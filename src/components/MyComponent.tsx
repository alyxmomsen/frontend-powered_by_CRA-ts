import { UseMyContext } from '../hooks/UseMyContext'
import { UseInterfaceContext } from '../Business/context/RendeContext'
import { EnumRequestStatus } from '../Business/App/App'
import { useEffect } from 'react'

const MyComponent = () => {
    const { app } = UseMyContext()
    const { longpollingState } = UseInterfaceContext()

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
                {longpollingState === EnumRequestStatus.idle
                    ? 'idle'
                    : longpollingState === EnumRequestStatus.inProcess
                      ? 'in process'
                      : longpollingState === EnumRequestStatus.returned
                        ? 'returned'
                        : 'other'}
            </div>
        </div>
    )
}

export default MyComponent
