import { type Component, For, Show, createSignal } from 'solid-js'

import { ActionButton, IconPlus, TitleBlock } from 'itpolygon-ui-dev'

import { EmptyData } from '../../components/EmptyData'
import { GroupCard, GroupCardSkeleton } from '../../components/GroupCard'
import { useDashboardStateContext } from '../../context/dashboard'
import { GroupCardCreateModal } from './ModalCreateGroup/GroupCreate.Modal'

export const TeacherGroupsBlock: Component = () => {
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
                        <ActionButton onClick={() => setIsModalOpen(true)} icon={IconPlus} />
                    </>
                }
            />
            <Show
                when={teacherGroups() && !teacherGroups.loading}
                fallback={
                    <>
                        <GroupCardSkeleton />
                        <GroupCardSkeleton />
                        <GroupCardSkeleton />
                    </>
                }
            >
                <Show
                    when={teacherGroups()?.length !== 0}
                    fallback={
                        <Show when={!isGroupAdding()}>
                            <EmptyData
                                text="Вы не создали еще ни одной группы"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </Show>
                    }
                >
                    <For each={teacherGroups()}>{(group) => <GroupCard group={group} />}</For>
                </Show>
                <Show when={isGroupAdding()}>
                    <GroupCardSkeleton />
                </Show>
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
