import { type Component, For, Show } from 'solid-js'

import clsx from 'clsx'
import { StudentCard } from '../../../components/StudentCard/StudentCard'
import { useGroupStateContext } from '../../../context/group'
import styles from './GroupStudents.module.scss'

export const GroupStudentsScreen: Component = () => {
    const { group } = useGroupStateContext()
    return (
        <div class={clsx(styles.content)}>
            <Show when={group()?.studentEnrolls}>
                <For each={group()?.studentEnrolls}>{(enroll) => <StudentCard enroll={enroll} />}</For>
            </Show>
        </div>
    )
}
