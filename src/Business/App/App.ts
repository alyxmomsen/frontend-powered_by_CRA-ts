export type TResponseData<T> = {
    payload: T
}

export enum EnumRequestStatus {
    idle,
    inProcess,
    returned,
}

export default class App {
    private data: number

    private requestStatus: EnumRequestStatus

    private async sendRequest() {
        const contentType = 'application/json' ;

        const baseUrl = 'http://127.0.0.1:3030' ;

        const endPoint = '/api/main';

        try {
            this.requestStatus = EnumRequestStatus.inProcess;

            const response = await fetch(baseUrl + endPoint, {
                method: 'post',
                headers: {
                    'content-type': contentType,
                },
                body: JSON.stringify({foo:'bar'}),
            })

            const data = (await response.json()) as TResponseData<{
                value: number
            }>

            const { payload } = data

            console.log({ payload })
            
        } catch (error) {
            console.log({ error })
        }

        this.requestStatus=EnumRequestStatus.returned;
    }

    update() {
        if (
            this.requestStatus === EnumRequestStatus.idle ||
            this.requestStatus === EnumRequestStatus.returned
        ) {
            this.sendRequest();
        }
    }

    constructor() {
        this.requestStatus = EnumRequestStatus.idle
        this.data = 0
    }
}
