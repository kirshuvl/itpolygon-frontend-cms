import { useParams } from '@solidjs/router'
import { produce } from 'immer'
import {
    type ParentComponent,
    type Resource,
    type Setter,
    createContext,
    createEffect,
    createResource,
    useContext,
} from 'solid-js'
import { apiGroups } from '../api/groups/apiGroups'
import type { Group } from '../types/groups'
import type { TeacherGroupEnroll } from '../types/groups'
import { debugMessage } from '../utils/defugMessage'
import { useDashboardStateContext } from './dashboard'

type GroupContext = {
    group: Resource<Group | null>
    actions: {
        mutateGroup: Setter<Group | undefined>
        refetchGroup: (info?: unknown) => Group | Promise<Group | undefined> | null | undefined
        createTeacherEnroll: ({ teacherId }: { teacherId: number }) => Promise<TeacherGroupEnroll>
    }
}

const GroupStateContext = createContext<GroupContext>()

export const GroupProvider: ParentComponent = (props) => {
    const { groupId } = useParams<{ groupId: string }>()
    const [group, { mutate: mutateGroup, refetch: refetchGroup }] = createResource<Group, { id: string }>(
        { id: groupId },
        apiGroups.getGroup,
    )
    const {
        groups: {
            actions: { updateGroups },
        },
    } = useDashboardStateContext()

    createEffect(() => {
        updateGroups({ group: group() })
    })

    const createTeacherEnroll = async ({
        teacherId,
    }: { teacherId: number }): Promise<TeacherGroupEnroll> => {
        try {
            const enroll = await apiGroups.createTeacherEnroll({
                groupId: group()?.id,
                teacherId: teacherId,
            })
            const nextState = produce(group(), (draftState) => {
                draftState?.teacherEnrolls.push(enroll)
            })
            mutateGroup(nextState)

            return enroll
        } catch (error) {
            debugMessage(`[createTeacherEnroll] ${error}`)
            throw error
        }
    }

    const value = {
        group,
        actions: {
            mutateGroup,
            refetchGroup,
            createTeacherEnroll,
        },
    }
    return <GroupStateContext.Provider value={value}>{props.children}</GroupStateContext.Provider>
}

export function useGroupStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(GroupStateContext)!
}

/*
const next_state = produce(teacherGroups(), (draftState) => {
                const index = draftState?.findIndex((group) => group.id === groupId)

                if (index !== -1 && index !== undefined && draftState) {
                    draftState[index] = group // Заменяем группу с groupId на новую группу
                }
            })
            mutateTeacherGroups(next_state)
            refetchTeacherGroups()
            */
