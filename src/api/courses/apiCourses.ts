import type { Course } from "../../types/courses";
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
}