import { EnumRequestStatus } from '../Business/App/App'

export function decorder(state: EnumRequestStatus) {
    switch (state) {
        case EnumRequestStatus.standby:
            return 'standby'
            break
        case EnumRequestStatus.pending:
            return 'pending'
            break
        case EnumRequestStatus.returned:
            return 'returned'
            break
        case EnumRequestStatus.error:
            return 'error'
            break
    }
}
