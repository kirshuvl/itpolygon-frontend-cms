import { ActionButton, IconPlus, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, createSignal } from 'solid-js'

import { EmptyData } from '../../components/EmptyData'
import { GroupCard, GroupCardSkeleton } from '../../components/GroupCard'
import { GroupCreateModal } from '../../components/GroupCard/Modals/Create.Modal'
import { TeacherCardSkeleton } from '../../components/TeacherCard/Skeleton/TeacherCard.Skeleton'
import { useDashboardStateContext } from '../../context/dashboard'

export const GroupsBlock: Component = () => {
    const {
        groups: { teacherGroups },
    } = useDashboardStateContext()

    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)
    const [isGroupAdding, setIsGroupAdding] = createSignal<boolean>(false)

    return (
        <>
            <TitleBlock
                title="Мои группы"
                buttons={
                    <>
                        <ActionButton
                            onClick={() => setIsModalOpen(true)}
                            icon={IconPlus}
                            iconLoading={IconPlus}
                            loading={teacherGroups.loading}
                        />
                    </>
                }
            />
            <Show when={!teacherGroups() && teacherGroups.loading}>
                <TeacherCardSkeleton />
                <TeacherCardSkeleton />
                <TeacherCardSkeleton />
            </Show>
            <Show when={teacherGroups() && teacherGroups()?.length === 0 && !isGroupAdding()}>
                <EmptyData text="no groups" />
            </Show>
            <Show when={teacherGroups() && teacherGroups()?.length !== 0}>
                <For each={teacherGroups()}>{(group) => <GroupCard group={group} />}</For>
            </Show>
            <Show when={isGroupAdding()}>
                <GroupCardSkeleton />
            </Show>
            <GroupCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isGroupAdding={isGroupAdding}
                setIsGroupAdding={setIsGroupAdding}
            />
        </>
    )
}
