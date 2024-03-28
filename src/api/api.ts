import axios from 'axios'
import { debugDelay } from '../utils/debugDelay'
import {
    type Tokens,
    apiSession,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from './session/apiSession'

const BASE_URL = 'http://127.0.0.1:8000'

export const axiosCommon = axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
})

let refreshTokenPromise: Promise<Tokens> | null = null

axiosPrivate.interceptors.request.use(
    async (config) => {
        let accessToken = getAccessToken()
        const refreshToken = getRefreshToken() ?? false
        await debugDelay()

        if (accessToken && apiSession.isTokenNeedUpdate(accessToken)) {
            if (!refreshTokenPromise && refreshToken) {
                refreshTokenPromise = apiSession.refreshToken({ refreshToken })
            }
            const newTokens = await refreshTokenPromise

            if (newTokens) {
                accessToken = newTokens.access
                setAccessToken(newTokens.access)
                setRefreshToken(newTokens.refresh)
            }
            refreshTokenPromise = null
        }
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
    },
    (error) => Promise.reject(error),
)
