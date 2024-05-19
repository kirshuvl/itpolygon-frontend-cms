import type { Course } from '../../types/courses'
import { createFormData } from '../../utils/createFormData'
import { debugMessage } from '../../utils/defugMessage'
import { axiosPrivate } from '../api'

export const apiCourses = {
    getCourses: async (): Promise<Course[]> => {
        try {
            const response = await axiosPrivate.get('cms/courses/')

            return response.data
        } catch (error) {
            debugMessage(`[getCourses] ${error}`)
            throw error
        }
    },
    createCourse: async ({ title, icon }: { title: string; icon?: File }): Promise<Course> => {
        try {
            const response = await axiosPrivate.post(
                'cms/courses/',
                createFormData({
                    title: title,
                    icon: icon,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createCourse] ${error}`)
            throw error
        }
    },
}
