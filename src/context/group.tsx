import { useParams } from '@solidjs/router'
import {
    type ParentComponent,
    type Resource,
    type Setter,
    createContext,
    createResource,
    useContext,
} from 'solid-js'
import { apiGroups } from '../api/groups/apiGroups'
import type { Group } from '../types/groups'

type GroupContext = {
    group: Resource<Group | null>
    actions: {
        mutateGroup: Setter<Group | undefined>
        refetchGroup: (info?: unknown) => Group | Promise<Group | undefined> | null | undefined
    }
}

const GroupStateContext = createContext<GroupContext>()

export const GroupProvider: ParentComponent = (props) => {
    const { groupId } = useParams<{ groupId: string }>()
    const [group, { mutate: mutateGroup, refetch: refetchGroup }] = createResource<Group, { id: string }>(
        { id: groupId },
        apiGroups.getGroup,
    )

    const value = {
        group,
        actions: {
            mutateGroup,
            refetchGroup,
        },
    }
    return <GroupStateContext.Provider value={value}>{props.children}</GroupStateContext.Provider>
}

export function useGroupStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(GroupStateContext)!
}
