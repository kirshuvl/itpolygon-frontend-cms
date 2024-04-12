import clsx from 'clsx'
import { ActionButton, IconPlus } from 'itpolygon-ui-dev'
import { type Component, Show, createSignal } from 'solid-js'
import { useGroupStateContext } from '../../../context/group'
import type { Teacher } from '../../../types/groups'
import styles from './createTeacherCard.module.scss'
type Props = {
    user: Teacher
}

export const CreateTeacherCard: Component<Props> = (props) => {
    const [isEnroll, setIsEnroll] = createSignal(false)
    const user = props.user

    const {
        actions: { createTeacherEnroll },
    } = useGroupStateContext()

    const createEnrollTeacher = async () => {
        await createTeacherEnroll({ teacherId: user.id })

        setIsEnroll(true)
    }

    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)}>
                <Show
                    when={user.icon}
                    fallback={<div class={clsx(styles.title)}>{user.first_name[0]}</div>}
                >
                    <img src={user.icon} alt={`Картинка преподавателя ${user.first_name}`} />
                </Show>
            </div>
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.title)}>
                    {user.first_name} {user.last_name}
                </div>
            </div>
            <div class={clsx(styles.button)}>
                <Show
                    when={!isEnroll()}
                    fallback={
                        <ActionButton
                            icon={IconPlus}
                            variant="danger"
                            onClick={() => {
                                setIsEnroll(false)
                            }}
                        />
                    }
                >
                    <ActionButton icon={IconPlus} variant="primary" onClick={createEnrollTeacher} />
                </Show>
            </div>
        </div>
    )
}
