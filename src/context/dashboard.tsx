import { produce } from 'immer'
import {
    type ParentComponent,
    type Resource,
    type Setter,
    createContext,
    createResource,
    onCleanup,
    onMount,
    useContext,
} from 'solid-js'
import { apiCourses } from '../api/courses/apiCourses'
import { apiGroups } from '../api/groups/apiGroups'
import type { Course } from '../types/courses'
import type { Group } from '../types/groups'
import { debugMessage } from '../utils/defugMessage'
import { useSessionStateContext } from './session'

type DashboardContextType = {
    groups: {
        teacherGroups: Resource<Group[] | null>
        actions: {
            mutateTeacherGroups: () => Setter<Group[]> | undefined
            refetchTeacherGroups: () => Group[] | Promise<Group[] | undefined> | null | undefined
            createTeacherGroup: ({ title }: { title: string }) => Promise<Group>
            updateTeacherGroup: ({ groupId, title }: { groupId: number; title: string }) => Promise<Group>
            getTeacherGroup: ({ id }: { id: number }) => Group | undefined
            deleteTeacherFromGroup: ({
                groupId,
                enrollId,
            }: { groupId: number; enrollId: number }) => Promise<void>
        }
    }
    courses: {
        teacherCourses: Resource<Course[] | null>
        actions: {
            mutateTeacherCourses: () => Setter<Course[]> | undefined
            refetchTeacherCourses: () => Course[] | Promise<Course[] | undefined> | null | undefined
            createCourse: ({ title, icon }: { title: string; icon?: File }) => Promise<Course>
        }
    }
}

const DashboardStateContext = createContext<DashboardContextType>()

export const DashboardProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()

    const [teacherGroups, { mutate: mutateTeacherGroups, refetch: refetchTeacherGroups }] = createResource<
        Group[],
        boolean
    >(isAuthenticated, apiGroups.getGroups)
    const [teacherCourses, { mutate: mutateTeacherCourses, refetch: refetchTeacherCourses }] =
        createResource<Course[], boolean>(isAuthenticated, apiCourses.getCourses)

    const createTeacherGroup = async ({ title }: { title: string }): Promise<Group> => {
        try {
            const group = await apiGroups.createGroup({ title })
            const new_groups = produce(teacherGroups(), (draftState) => {
                draftState?.push(group)
            })
            mutateTeacherGroups(new_groups)
            return group
        } catch (error) {
            debugMessage(`[createTeacherGroup] ${error}`)
            throw error
        }
    }

    const updateTeacherGroup = async ({
        groupId,
        title,
    }: { groupId: number; title: string }): Promise<Group> => {
        try {
            const group = await apiGroups.updateGroup({ groupId, title })
            const next_state = produce(teacherGroups(), (draftState) => {
                const index = draftState?.findIndex((group) => group.id === groupId)

                if (index !== -1 && index !== undefined && draftState) {
                    draftState[index] = group // Заменяем группу с groupId на новую группу
                }
            })
            mutateTeacherGroups(next_state)
            return group
        } catch (error) {
            debugMessage(`[updateTeacherGroup] ${error}`)
            throw error
        }
    }

    const getTeacherGroup = ({ id }: { id: number }): Group | undefined => {
        return teacherGroups()?.find((group) => group.id === id)
    }

    const deleteTeacherFromGroup = async ({
        groupId,
        enrollId,
    }: { groupId: number; enrollId: number }): Promise<void> => {
        try {
            const enroll = await apiGroups.deleteTeacherFromGroup({ id: enrollId })
            const next_state = produce(teacherGroups(), (draftState) => {
                const group = draftState?.find((group) => group.id === groupId)
                if (group) {
                    group.teacherEnrolls = group?.teacherEnrolls.filter((enroll) => enroll.id !== enrollId)
                }
                console.log(JSON.stringify(group))
            })
            mutateTeacherGroups(next_state)
            return enroll
        } catch (error) {
            debugMessage(`[deleteTeacherFromGroup] ${error}`)
            throw error
        }
    }

    const createCourse = async ({ title, icon }: { title: string; icon?: File }): Promise<Course> => {
        try {
            const course = await apiCourses.createCourse({ title, icon })
            const new_courses = produce(teacherCourses(), (draftState) => {
                draftState?.push(course)
            })
            mutateTeacherCourses(new_courses)
            return course
        } catch (error) {
            debugMessage(`[createCourse] ${error}`)
            throw error
        }
    }

    const groups = {
        teacherGroups,
        actions: {
            mutateTeacherGroups,
            refetchTeacherGroups,
            createTeacherGroup,
            updateTeacherGroup,
            getTeacherGroup,
            deleteTeacherFromGroup,
        },
    }

    const courses = {
        teacherCourses,
        actions: {
            mutateTeacherCourses,
            refetchTeacherCourses,
            createCourse,
        },
    }

    const value = {
        groups,
        courses,
    }

    onMount(() => {
        debugMessage('[onMount][Provider] Dashboard')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] Dashboard')
    })

    return <DashboardStateContext.Provider value={value}>{props.children}</DashboardStateContext.Provider>
}

export function useDashboardStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(DashboardStateContext)!
}
