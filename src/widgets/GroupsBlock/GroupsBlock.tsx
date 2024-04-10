import { type Component, For, Show, createSignal } from 'solid-js'

import { ActionButton, IconPlus, TitleBlock } from 'itpolygon-ui-dev'

import { EmptyData } from '../../components/EmptyData'
import { GroupCard, GroupCardSkeleton } from '../../components/GroupCard'
import { TeacherCardSkeleton } from '../../components/TeacherCard/Skeleton/TeacherCard.Skeleton'
import { useDashboardStateContext } from '../../context/dashboard'
import { GroupCardCreateModal } from './GroupCreateModal/GroupCreate.Modal'

export const GroupsBlock: Component = () => {
    const {
        groups: { teacherGroups },
    } = useDashboardStateContext()
    const [isGroupAdding, setIsGroupAdding] = createSignal<boolean>(false)
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)

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
            <GroupCardCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isGroupAdding={isGroupAdding}
                setIsGroupAdding={setIsGroupAdding}
            />
        </>
    )
}

/*
----------------
            <Show when={teacherGroups()?.length !== 0 && !teacherGroups.loading} fallback={
                <Show when={teacherGroups.loading} fallback={<EmptyData text='У вас еще нет групп' />}>
                    <TeacherCardSkeleton />
                    <TeacherCardSkeleton />
                    <TeacherCardSkeleton />
                </Show>
            }>
                <For each={teacherGroups()}>{(group) => <GroupCard group={group} />}</For>


            </Show>

            <Show when={isGroupAdding()}>
                <GroupCardSkeleton />
            </Show>
            <Show when={isGroupAdding()}>
                <GroupCardSkeleton />
            </Show>
*/
