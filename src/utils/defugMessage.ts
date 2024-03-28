export const debug = false

export const debugMessage = (string: string) => {
    if (debug) {
        console.info(string)
    }
}
