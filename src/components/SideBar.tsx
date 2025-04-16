import React, { useEffect, useState } from 'react'
import { UseMyContext } from '../hooks/UseMyContext'
import { EnumRequestStatus } from '../Business/App/App'
import { decorder } from '../utils/utils'

const SideBar = () => {
    const { app, longpollingState } = UseMyContext()
    const [list, setList] = useState<{ subj: string; key: number }[]>([
        { subj: decorder(longpollingState), key: Date.now() },
    ])

    useEffect(() => {
        console.log('rerander')
        app.onStatusChanged((state: EnumRequestStatus) =>
            setList((prev) => [
                ...prev,
                { subj: decorder(state), key: Date.now() },
            ])
        )
    }, [])

    console.log('component updated')

    return (
        <div>
            {list.map((elem, i) => {
                return <div key={elem.key}>{elem.subj}</div>
            })}
            <button
                onClick={() =>
                    setList([...list, { subj: 'new item', key: Date.now() }])
                }
            >
                update
            </button>
        </div>
    )
}

export default SideBar
