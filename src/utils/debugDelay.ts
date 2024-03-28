import { debug } from './defugMessage'

export const debugDelay = async () => {
    if (debug) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
    }
}
