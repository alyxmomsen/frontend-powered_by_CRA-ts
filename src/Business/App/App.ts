export type TResponseData<T> = {
    payload: T
}

export enum EnumLongpoolingSwitchState {
    on,
    off,
}

export enum EnumRequestStatus {
    idle,
    inProcess,
    returned,
    error,
}

export type TRequestData<T> = {
    targetId: number
    data: T
}

export default class MyBusinessLogicApp {
    private data: number
    private baseUrl: string

    private requestStatus: EnumRequestStatus
    private longpoolingSwitchState: EnumLongpoolingSwitchState

    //  test  method
    public do() {
        alert()
    }
    // -----------

    private onStatusChangedCallBack: (status: EnumRequestStatus) => void

    public onStatusChanged(cb: (status: EnumRequestStatus) => void) {
        this.onStatusChangedCallBack = cb
    }

    public async addTransactionAction(data: any) {
        console.log('action')
        const contentType = 'application/json'
        const endPoint = '/api/f/fb'

        try {
            this.requestStatus = EnumRequestStatus.inProcess

            const response = await fetch(this.baseUrl + endPoint, {
                method: 'post',
                headers: {
                    'content-type': contentType,
                },
                body: JSON.stringify({
                    targetId: 0,
                    data,
                } as TRequestData<any>),
            })

            const responsedData = (await response.json()) as TResponseData<{
                value: number
            }>

            const { payload } = responsedData

            console.log({ payload, data: responsedData })
        } catch (error) {
            console.log({ error })
        }

        this.requestStatus = EnumRequestStatus.returned
    }

    private async sendRequest() {
        console.log('hook request')
        const contentType = 'application/json'

        const endPoint = '/api/hook'

        try {
            this.requestStatus = EnumRequestStatus.inProcess
            // после каждого обновления статуса, вызыватся колбек
            this.onStatusChangedCallBack(this.requestStatus)

            const response = await fetch(this.baseUrl + endPoint, {
                method: 'post',
                headers: {
                    'content-type': contentType,
                },
                body: JSON.stringify({ clientId: 777 }), // clientId должен назначаться на backend http server
            })

            const data = (await response.json()) as TResponseData<{
                value: number
            }>

            const { payload } = data

            console.log({ payload, data })
        } catch (error) {
            console.log({ error })
            this.requestStatus = EnumRequestStatus.error
            this.onStatusChangedCallBack(this.requestStatus)
        }

        this.requestStatus = EnumRequestStatus.returned
        // после каждого обновления статуса, вызыватся колбек
        this.onStatusChangedCallBack(this.requestStatus)
    }

    public startLongpooling() {
        this.longpoolingSwitchState = EnumLongpoolingSwitchState.on
    }

    public stopLongpooling() {
        this.longpoolingSwitchState = EnumLongpoolingSwitchState.off
    }

    update() {
        const request = () => {
            if (
                this.requestStatus === EnumRequestStatus.inProcess ||
                this.longpoolingSwitchState === EnumLongpoolingSwitchState.off
                // this.requestStatus === EnumRequestStatus.idle ||
                // this.requestStatus === EnumRequestStatus.returned
            ) {
                return
            }

            this.sendRequest()
        }

        request()
    }

    constructor() {
        this.requestStatus = EnumRequestStatus.idle
        this.longpoolingSwitchState = EnumLongpoolingSwitchState.off
        this.onStatusChangedCallBack = () => {}
        this.baseUrl = 'http://127.0.0.1:3030'
        this.data = 0
    }
}

export interface IAction {}
