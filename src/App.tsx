import React, { useContext, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import MyComponent from './components/MyComponent'
import { maincontext } from '.'

function App() {
    const ctx = useContext(maincontext)

    useEffect(() => {
        console.log({ app: ctx.app })
        console.log('use effect')
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <MyComponent />
            </header>
        </div>
    )
}

export default App
