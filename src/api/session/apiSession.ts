import { jwtDecode } from 'jwt-decode'
import { createFormData } from '../../utils/createFormData'
import { debugMessage } from '../../utils/defugMessage'
import { axiosCommon } from '../api'

type refreshToken = {
    refresh: string
}

type accessToken = {
    access: string
}

type infoToken = {
    detail?: string
}

export type Tokens = refreshToken & accessToken & infoToken

const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'access'
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'refresh'

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
}

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
}

export const setAccessToken = (token: string) => {
    if (!token) {
        debugMessage('[setAccessToken] Token is null')
    }

    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token)
}

export const setRefreshToken = (token: string) => {
    if (!token) {
        debugMessage('[setRefreshToken] Token is null')
    }

    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, token)
}

export const resetAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
}

export const resetRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
}

export const resetTokens = () => {
    resetAccessToken()
    resetRefreshToken()
}

export const apiSession = {
    getTokens: async ({ email, password }: { email: string; password: string }): Promise<Tokens> => {
        try {
            const response = await axiosCommon.post(
                'api/v1/token/get/',
                createFormData({
                    email: email,
                    password: password,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage('[getTokens] Error')
            throw error
        }
    },
    refreshToken: async ({ refreshToken }: { refreshToken: string }): Promise<Tokens> => {
        try {
            const response = await axiosCommon.post(
                'api/v1/token/refresh/',
                createFormData({
                    refresh: refreshToken,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage('[refreshToken] Error')
            throw error
        }
    },
    isTokenNeedUpdate: (token: string): boolean => {
        const currentTime = Math.floor(Date.now() / 1000)
        const tokenExpiredTime = jwtDecode(token).exp ?? 0
        if (currentTime + 5 < tokenExpiredTime) {
            return false
        }
        return true
    },
}