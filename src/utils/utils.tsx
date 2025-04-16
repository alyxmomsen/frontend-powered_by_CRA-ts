import { EnumRequestStatus } from '../Business/App/App'

export function decorder(state: EnumRequestStatus) {
    switch (state) {
        case EnumRequestStatus.idle:
            return 'idle'
            break
        case EnumRequestStatus.inProcess:
            return 'inProcess'
            break
        case EnumRequestStatus.returned:
            return 'returned'
            break
        case EnumRequestStatus.error:
            return 'error'
            break
    }
}
