import { EnumRequestStatus } from '../Business/App/App'

/**
 *
 * @param state
 * @returns string
 */
export function decorder(state: EnumRequestStatus) {
    switch (state) {
        case EnumRequestStatus.standby:
            return 'standby'
        case EnumRequestStatus.pending:
            return 'pending'
        case EnumRequestStatus.returned:
            return 'returned'
        case EnumRequestStatus.error:
            return 'error'
        default:
            return 'other'
    }
}
/**
 *
 * @param code
 * @returns
 */
export function decoder2(code: EnumRequestStatus) {
    const obj = {
        [EnumRequestStatus.error]: 'error',
        [EnumRequestStatus.pending]: 'pending',
        [EnumRequestStatus.standby]: 'standby',
        [EnumRequestStatus.returned]: 'returned',
    }

    return obj[code]
}
