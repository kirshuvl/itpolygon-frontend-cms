import { type Component, For, Show, createSignal } from 'solid-js'

import { ActionButton, IconPlus, TitleBlock } from 'itpolygon-ui-dev'
import { EmptyData } from '../../components/EmptyData'
import { TeacherEnrollCreateModal } from '../../components/TeacherCard/Modals/CreateTeacher.Modal'
import { TeacherCardSkeleton } from '../../components/TeacherCard/Skeleton/TeacherCard.Skeleton'
import { TeacherEnrollCard } from '../../components/TeacherCard/TeacherCard'
import { useGroupStateContext } from '../../context/group'

export const TeachersBlock: Component = () => {
    const { group } = useGroupStateContext()

    const [isTeacherAdding, setIsTeacherAdding] = createSignal<boolean>(false)
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)

    return (
        <>
            <TitleBlock
                title="Преподаватели"
                buttons={
                    <>
                        <ActionButton onClick={() => setIsModalOpen(true)} icon={IconPlus} />
                    </>
                }
            />
            <Show when={!group()?.teacherEnrolls && group.loading}>
                <TeacherCardSkeleton />
                <TeacherCardSkeleton />
                <TeacherCardSkeleton />
            </Show>
            <Show
                when={
                    group()?.teacherEnrolls && group()?.teacherEnrolls?.length === 0 && !isTeacherAdding()
                }
            >
                <EmptyData text="Вы еще не создали ни одной группы" />
            </Show>
            <Show when={group()?.teacherEnrolls && group()?.teacherEnrolls?.length !== 0}>
                <For each={group()?.teacherEnrolls}>
                    {(enroll) => <TeacherEnrollCard enroll={enroll} />}
                </For>
            </Show>
            <Show when={isTeacherAdding()}>
                <TeacherCardSkeleton />
            </Show>
            <TeacherEnrollCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isAddingInProgress={isTeacherAdding}
                setIsAddingInProgress={setIsTeacherAdding}
            />
        </>
    )
}
