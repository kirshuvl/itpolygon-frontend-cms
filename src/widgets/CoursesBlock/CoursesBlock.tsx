import { type Component, For, Show, createSignal } from 'solid-js'

import { ActionButton, IconPlus, TitleBlock } from 'itpolygon-ui-dev'

import { CourseCard } from '../../components/CourseCard/CourseCard'
import { CourseCardSkeleton } from '../../components/CourseCard/Skeleton/CourseCard.Skeleton'
import { EmptyData } from '../../components/EmptyData'
import { useDashboardStateContext } from '../../context/dashboard'
import { CourseCreateModal } from './CourseCreateModal/CourseCreate.Modal'

export const CoursesBlock: Component = () => {
    const {
        courses: { teacherCourses },
    } = useDashboardStateContext()
    const [isCourseAdding, setIsCourseAdding] = createSignal<boolean>(false)
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)

    return (
        <>
            <TitleBlock
                title="Мои курсы"
                buttons={
                    <>
                        <ActionButton onClick={() => setIsModalOpen(true)} icon={IconPlus} />
                    </>
                }
            />
            <Show
                when={teacherCourses() && !teacherCourses.loading}
                fallback={
                    <>
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                    </>
                }
            >
                <Show
                    when={teacherCourses()?.length !== 0}
                    fallback={
                        <Show when={!isCourseAdding()}>
                            <EmptyData
                                text="Вы не создали еще ни одного курса"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </Show>
                    }
                >
                    <For each={teacherCourses()}>{(course) => <CourseCard course={course} />}</For>
                </Show>
                <Show when={isCourseAdding()}>
                    <CourseCardSkeleton />
                </Show>
            </Show>
            <CourseCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isAddingInProgress={isCourseAdding}
                setIsAddingInProgress={setIsCourseAdding}
            />
        </>
    )
}
