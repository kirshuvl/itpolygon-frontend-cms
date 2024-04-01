import type { Group } from '../../types/groups'
import { createFormData } from '../../utils/createFormData'
import { debugMessage } from '../../utils/defugMessage'
import { axiosPrivate } from '../api'

export const apiGroups = {
    getGroups: async (): Promise<Group[]> => {
        try {
            const response = await axiosPrivate.get('/api/v1/cms/groups/')

            return response.data
        } catch (error) {
            debugMessage(`[getGroups] ${error}`)
            throw error
        }
    },
    createGroup: async ({ title }: { title: string }): Promise<Group> => {
        try {
            const response = await axiosPrivate.post(
                '/api/v1/cms/groups/',
                createFormData({
                    title: title,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createTeacherGroup] ${error}`)
            throw error
        }
    },
    updateGroup: async ({ groupId, title }: { groupId: number; title: string }): Promise<Group> => {
        try {
            const response = await axiosPrivate.patch(
                `/api/v1/cms/groups/${groupId}`,
                createFormData({
                    title: title,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[updateTeacherGroup] ${error}`)
            throw error
        }
    },
    deleteTeacherFromGroup: async ({ id }: { id: number }): Promise<void> => {
        try {
            const response = await axiosPrivate.delete(`/api/v1/cms/groups/teachers/${id}`)

            return response.data
        } catch (error) {
            debugMessage(`[deleteTeacherFromGroup] ${error}`)
            throw error
        }
    },
    getGroup: async ({ id }: { id: string }): Promise<Group> => {
        try {
            const response = await axiosPrivate.get(`/api/v1/cms/groups/${id}`)

            return response.data
        } catch (error) {
            debugMessage(`[getGroup] ${error}`)
            throw error
        }
    }
}
