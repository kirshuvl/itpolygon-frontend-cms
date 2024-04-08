import type { Course } from "../../types/courses";
import { createFormData } from "../../utils/createFormData";
import { debugMessage } from "../../utils/defugMessage";
import { axiosPrivate } from "../api";



export const apiCourses = {
    getCourses: async (): Promise<Course[]> => {
        try {
            const response = await axiosPrivate.get('/api/v1/cms/courses/')

            return response.data
        } catch (error) {
            debugMessage(`[getCourses] ${error}`)
            throw error
        }
    },
    createCourse: async ({ title }: { title: string }): Promise<Course> => {
        try {
            const response = await axiosPrivate.post(
                '/api/v1/cms/courses/',
                createFormData({
                    title: title,
                }),
            )

            return response.data
        } catch (error) {
            debugMessage(`[createCourse] ${error}`)
            throw error
        }
    },
}