import React, { useContext, useEffect, useState } from 'react'
import { UseMyContext } from '../hooks/UseMyContext'

const MyComponent = () => {
    const { app } = UseMyContext()

    return (
        <div>
            <div>{}</div>
            <button
                onClick={() => {
                    app.addTransactionAction({
                        foo: 'fucking bar',
                    })
                }}
            >
                click
            </button>
        </div>
    )
}

export default MyComponent
