import React, { useState } from 'react'

const MyComponent = () => {
    const [state, setState] = useState<number>(0)

    return (
        <div>
            <h1>this is my component</h1>
            <h2>My State</h2>
            <div>state: {state}</div>
            <div>
                <button
                    onClick={() => {
                        setState((value) => value + 1)
                    }}
                >
                    change the state
                </button>
            </div>
        </div>
    )
}

export default MyComponent
