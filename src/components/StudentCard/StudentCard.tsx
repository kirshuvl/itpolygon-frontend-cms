import { type Component, Show } from 'solid-js'
import type { StudentGroupEnroll } from '../../types/groups'

import clsx from 'clsx'
import { ActionButton, IconPencil, IconTrash } from 'itpolygon-ui-dev'
import styles from './StudentCard.module.scss'

type Props = {
    enroll: StudentGroupEnroll
}

export const StudentCard: Component<Props> = (props) => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)}>
                <Show
                    when={props.enroll.user.icon}
                    fallback={<div class={clsx(styles.title)}>{props.enroll.user.first_name[0]}</div>}
                >
                    <img
                        src={props.enroll.user.icon}
                        alt={`Картинка группы ${props.enroll.user.first_name}`}
                    />
                </Show>
            </div>
            <div class={clsx(styles.content)}>
                {props.enroll.user.first_name} {props.enroll.user.last_name}
            </div>
            <div class={clsx(styles.button)}>
                <ActionButton
                    icon={IconPencil}
                    variant="primary"
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                />
                <ActionButton
                    icon={IconTrash}
                    variant="danger"
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                />
            </div>
        </div>
    )
}
