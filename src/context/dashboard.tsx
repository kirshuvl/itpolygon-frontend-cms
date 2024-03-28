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
import { apiGroups } from '../api/groups/apiGroups'
import type { Group } from '../types/groups'
import { debugMessage } from '../utils/defugMessage'
import { useSessionStateContext } from './session'

type CMSContextType = {
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
}

const CMSStateContext = createContext<CMSContextType>()

export const CMSProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()

    const [teacherGroups, { mutate: mutateTeacherGroups, refetch: refetchTeacherGroups }] = createResource<
        Group[],
        boolean
    >(isAuthenticated, apiGroups.getTeacherGroups)

    const createTeacherGroup = async ({ title }: { title: string }): Promise<Group> => {
        try {
            const group = await apiGroups.createTeacherGroup({ title })
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
            const group = await apiGroups.updateTeacherGroup({ groupId, title })
            const next_state = produce(teacherGroups(), (draftState) => {
                const index = draftState?.findIndex((group) => group.id === groupId)
                if (index !== -1 && index && draftState) {
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

    const value = {
        groups,
    }

    onMount(() => {
        debugMessage('[onMount][Provider] CMS')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] CMS')
    })

    return <CMSStateContext.Provider value={value}>{props.children}</CMSStateContext.Provider>
}

export function useCMSStateContext() {
    return useContext(CMSStateContext)
}
