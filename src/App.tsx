import React, { useContext, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import './styles/mystyles.css'
import MyDemoComponent from './components/MyComponent'
import SideBar from './components/SideBar'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="flex">
                    <div>
                        <MyDemoComponent />
                    </div>
                    <div>
                        <SideBar />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default App
