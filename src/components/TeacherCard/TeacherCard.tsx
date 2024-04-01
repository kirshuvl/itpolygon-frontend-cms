import clsx from 'clsx'
import { type Component, Show, createSignal } from 'solid-js'

import styles from './TeacherCard.module.scss'

import { ActionButton, IconTrash, IconUser } from 'itpolygon-ui-dev'
import type { TeacherGroupEnroll } from '../../types/groups'

type Props = {
    enroll: TeacherGroupEnroll
}

export const TeacherEnrollCard: Component<Props> = (props) => {
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)
    const [isGroupUpdating, setIsGroupUpdating] = createSignal<boolean>(false)
    const enroll = props.enroll
    return (
        <>
            <div class={clsx(styles.card)}>
                <div class={clsx(styles.icon)}>
                    <Show
                        when={enroll.teacher.icon}
                        fallback={<div class={clsx(styles.title)}>{enroll.teacher.first_name[0]}</div>}
                    >
                        <img
                            src={enroll.teacher.icon}
                            alt={`Картинка преподавателя ${enroll.teacher.first_name}`}
                        />
                    </Show>
                </div>
                <div class={clsx(styles.content)}>
                    <div class={clsx(styles.title)}>
                        {enroll.teacher.first_name} {enroll.teacher.last_name}
                    </div>
                </div>
                <div class={clsx(styles.button)}>
                    <ActionButton
                        icon={IconUser}
                        variant="primary"
                        onClick={(event) => {
                            event.stopPropagation()
                            setIsModalOpen(true)
                        }}
                    />
                    <ActionButton
                        icon={IconTrash}
                        variant="danger"
                        onClick={(event) => {
                            event.stopPropagation()
                            setIsModalOpen(true)
                        }}
                    />
                </div>
            </div>
        </>
    )
}
