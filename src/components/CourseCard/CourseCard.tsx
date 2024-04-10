import { type Component, Show, createSignal } from 'solid-js'
import type { Course } from '../../types/courses'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import styles from './CourseCard.module.scss'

type Props = {
    course: Course
}

export const CourseCard: Component<Props> = (props) => {
    const course = props.course
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)
    const [isGroupUpdating, setIsGroupUpdating] = createSignal<boolean>(false)
    return (
        <div onClick={() => navigate(`/course/${course.id}/`)} class={clsx(styles.card)}>
            <div class={clsx(styles.icon)}>
                <Show when={course.icon} fallback={<div class={clsx(styles.title)}>{course.title[0]}</div>}>
                    <img src={course.icon} alt={`Картинка группы ${course.title}`} />
                </Show>
            </div>
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.title)}>{course.title}</div>

                <div class={clsx(styles.info)}>10 / 15 лекций | 120 / 130 заданий</div>
            </div>
        </div>
    )
}
