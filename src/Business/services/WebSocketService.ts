export class WebSocketService {
    /**
     * timestamp by unix date
     */
    private lastWebsocketInstanceDate: number

    private webSocketAPIInstance: WebSocket | null

    // init the instance defaul valuej as null
    private static _instance: WebSocketService | null = null

    /**
     * callbacks that will be triggered if the websocket server sends any message
     */
    private onWebSocketMessageCallBacks: ((message: string) => void)[]

    /**
     * the method you need call before destruct this instance
     * @returns
     */
    public static Destruct() {
        if (WebSocketService._instance === null) return

        if (WebSocketService._instance.webSocketAPIInstance === null) return

        const websocketAPIInstance =
            WebSocketService._instance.webSocketAPIInstance

        websocketAPIInstance.close()

        WebSocketService._instance = null
    }

    public static Instance() {
        if (WebSocketService._instance === null) {
            WebSocketService._instance = new WebSocketService()
        }

        return WebSocketService._instance
    }

    /**
     *
     * @param cb
     */
    onMessage(cb: (message: string) => void) {
        this.onWebSocketMessageCallBacks.push(cb)
    }

    open() {}

    private constructor() {
        this.lastWebsocketInstanceDate = Infinity
        this.webSocketAPIInstance = null
        this.onWebSocketMessageCallBacks = []
    }
}
