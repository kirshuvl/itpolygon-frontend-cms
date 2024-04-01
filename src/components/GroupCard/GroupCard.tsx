import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { type Component, Show, createSignal } from 'solid-js'

import type { Group } from '../../types/groups'
import styles from './GroupCard.module.scss'

import { ActionButton } from 'itpolygon-ui-dev'
import { IconPencil } from 'itpolygon-ui-dev'
import { GroupCardUpdateModal } from './ModalUpdateGroup/GroupCardUpdate.Modal'

type Props = {
    group: Group
}

export const GroupCard: Component<Props> = (props) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false)
    const [isGroupUpdating, setIsGroupUpdating] = createSignal<boolean>(false)
    const group = props.group
    return (
        <>
            <div onClick={() => navigate(`/groups/${group.id}/`)} class={clsx(styles.card)}>
                <div class={clsx(styles.icon)}>
                    <Show
                        when={group.icon}
                        fallback={<div class={clsx(styles.title)}>{group.title[0]}</div>}
                    >
                        <img src={group.icon} alt={`Картинка группы ${group.title}`} />
                    </Show>
                </div>
                <div class={clsx(styles.content)}>
                    <div class={clsx(styles.title)}>{group.title}</div>

                    <div class={clsx(styles.students)}>Студентов: {group.teacherEnrolls.length}</div>
                </div>
                <div class={clsx(styles.button)}>
                    <ActionButton
                        icon={IconPencil}
                        variant="primary"
                        onClick={(event) => {
                            event.stopPropagation()
                            setIsModalOpen(true)
                        }}
                    />
                </div>
            </div>
            <GroupCardUpdateModal
                group={group}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isGroupUpdating={isGroupUpdating}
                setIsGroupUpdating={setIsGroupUpdating}
            />
        </>
    )
}
