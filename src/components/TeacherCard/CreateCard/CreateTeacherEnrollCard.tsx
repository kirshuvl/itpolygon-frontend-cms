import clsx from 'clsx'
import { ActionButton, IconClose, IconPlus } from 'itpolygon-ui-dev'
import { type Component, type Setter, Show, createSignal } from 'solid-js'
import { useGroupStateContext } from '../../../context/group'
import type { Teacher, TeacherGroupEnroll } from '../../../types/groups'
import styles from './CreateTeacherEnrollCard.module.scss'

type Props = {
    user: Teacher
    loading: Setter<boolean>
}

export const CreateTeacherEnrollCard: Component<Props> = (props) => {
    const user = props.user

    const [isLoading, setIsLoading] = createSignal<boolean>(false)
    const [teacherEnroll, setTeacherEnroll] = createSignal<TeacherGroupEnroll | undefined>(undefined)

    const {
        actions: { createTeacherEnroll, deleteTeacherEnroll },
    } = useGroupStateContext()

    const createEnroll = async () => {
        setIsLoading(true)
        props.loading(true)
        const enroll = await createTeacherEnroll({ teacherId: user.id })
        setTeacherEnroll(enroll)
        setIsLoading(false)
        props.loading(false)
    }

    const deleteEnroll = async () => {
        setIsLoading(true)
        const id = teacherEnroll()?.id
        if (id === undefined) {
            throw new Error('TeacherEnroll ID is undefined')
        }
        await deleteTeacherEnroll({ teacherEnrollId: id })
        setTeacherEnroll(undefined)
        setIsLoading(false)
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
                    when={!teacherEnroll()}
                    fallback={
                        <ActionButton
                            icon={IconClose}
                            variant="danger"
                            onClick={deleteEnroll}
                            loading={isLoading()}
                        />
                    }
                >
                    <ActionButton
                        icon={IconPlus}
                        variant="success"
                        onClick={createEnroll}
                        loading={isLoading()}
                    />
                </Show>
            </div>
        </div>
    )
}
