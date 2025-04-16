import { EnumRequestStatus } from '../Business/App/App'

export function decorder(state: EnumRequestStatus) {
    switch (state) {
        case EnumRequestStatus.standby:
            return 'idle'
            break
        case EnumRequestStatus.pending:
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
