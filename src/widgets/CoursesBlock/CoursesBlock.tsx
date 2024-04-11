import { ActionButton, IconPlus, TitleBlock } from 'itpolygon-ui-dev'
import { type Component, For, Show, createSignal, onMount } from 'solid-js'

import { CourseCard } from '../../components/CourseCard/CourseCard'
import { CourseCreateModal } from '../../components/CourseCard/Modals/Create.Modal'
import { CourseCardSkeleton } from '../../components/CourseCard/Skeleton/CourseCard.Skeleton'
import { EmptyData } from '../../components/EmptyData'
import { useDashboardStateContext } from '../../context/dashboard'

export const CoursesBlock: Component = () => {
    const {
        courses: {
            teacherCourses,
            actions: { refetchTeacherCourses },
        },
    } = useDashboardStateContext()

    const [isCourseAdding, setIsCourseAdding] = createSignal<boolean>(false)
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)

    onMount(() => {
        if (teacherCourses() && !teacherCourses.loading) {
            refetchTeacherCourses()
        }
    })

    return (
        <>
            <TitleBlock
                title="Мои курсы"
                buttons={
                    <>
                        <ActionButton
                            onClick={() => setIsModalOpen(true)}
                            icon={IconPlus}
                            iconLoading={IconPlus}
                            loading={teacherCourses.loading}
                        />
                    </>
                }
            />
            <Show when={!teacherCourses() && teacherCourses.loading}>
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
            </Show>
            <Show when={teacherCourses() && teacherCourses()?.length === 0 && !isCourseAdding()}>
                <EmptyData text="Вы еще не создали ни одной группы" />
            </Show>
            <Show when={teacherCourses() && teacherCourses()?.length !== 0}>
                <For each={teacherCourses()}>{(course) => <CourseCard course={course} />}</For>
            </Show>
            <Show when={isCourseAdding()}>
                <CourseCardSkeleton />
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
