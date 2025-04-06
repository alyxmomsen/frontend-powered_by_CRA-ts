import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import MyBusinessApp from './Business/App/App'

const app = new MyBusinessApp()

window.requestAnimationFrame(foo)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const maincontext = createContext<{ app: MyBusinessApp }>({ app })

root.render(
    <React.StrictMode>
        <maincontext.Provider value={{ app }}>
            <App />
        </maincontext.Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

function foo() {
    app.update()
    window.requestAnimationFrame(foo)
}
