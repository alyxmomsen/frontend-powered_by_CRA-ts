import { WebSocketService } from '../services/WebSocketService'

export type TResponseData<T> = {
    payload: T
}

export enum EnumLongpoolingSwitchState {
    on,
    off,
}

export enum EnumRequestStatus {
    standby,
    pending,
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

    private websocketService: WebSocketService

    //  test  method
    public do() {
        alert()
    }
    // -----------

    private onStatusChangedCallBacks: ((status: EnumRequestStatus) => void)[]

    // private onWebSocketMessageCallBacks: ((message: string) => void)[]

    public onStatusChanged(cb: (status: EnumRequestStatus) => void) {
        this.onStatusChangedCallBacks.push(cb)
    }

    public onWebSocketMessageResponse(cb: (message: string) => void) {
        this.websocketService.onMessage(cb)
    }

    public sendWebSocketMessage() {}

    private webSocketApiInit() {
        if (this.websocketService === null) return

        this.websocketService.open()
    }

    public async addTransactionAction(data: any) {
        console.log('action')
        const contentType = 'application/json'
        const endPoint = '/api/f/fb'

        try {
            this.requestStatus = EnumRequestStatus.pending

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

    private async sendLongPollingRequest() {
        if (
            this.requestStatus === EnumRequestStatus.pending ||
            this.longpoolingSwitchState === EnumLongpoolingSwitchState.off
            // this.requestStatus === EnumRequestStatus.idle ||
            // this.requestStatus === EnumRequestStatus.returned
        )
            return

        console.log('hook request')
        const contentType = 'application/json'

        const endPoint = '/api/hook'

        try {
            this.requestStatus = EnumRequestStatus.pending
            // после каждого обновления статуса, вызыватся колбек
            this.onStatusChangedCallBacks.forEach((elem, i) =>
                elem(this.requestStatus)
            )

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
            this.onStatusChangedCallBacks.forEach((elem, i) =>
                elem(this.requestStatus)
            )
        }

        this.requestStatus = EnumRequestStatus.returned
        // после каждого обновления статуса, вызыватся колбек
        this.onStatusChangedCallBacks.forEach((elem, i) =>
            elem(this.requestStatus)
        )
    }

    public startLongpooling() {
        this.longpoolingSwitchState = EnumLongpoolingSwitchState.on
    }

    public stopLongpooling() {
        this.longpoolingSwitchState = EnumLongpoolingSwitchState.off
    }

    public initWebSocket() {
        this.webSocketApiInit()
    }

    update() {
        this.sendLongPollingRequest()

        // this.webSocketApiInit()
    }

    constructor() {
        this.requestStatus = EnumRequestStatus.standby
        this.longpoolingSwitchState = EnumLongpoolingSwitchState.off
        this.onStatusChangedCallBacks = []
        this.baseUrl = 'http://127.0.0.1:3030'
        this.data = 0

        // websocket service instance

        this.websocketService = WebSocketService.Instance()

        console.log('wss', this.websocketService, WebSocketService.Instance())
        // this.webSocketAPI = null ;
        // this.onWebSocketMessageCallBacks = []
    }
}

export interface IAction {}
