import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { type Component, Show, createSignal } from 'solid-js'

import type { Group } from '../../types/groups'
import styles from './GroupCard.module.scss'

import { ActionButton, IconTrash } from 'itpolygon-ui-dev'
import { IconPencil } from 'itpolygon-ui-dev'
import { GroupDeleteModal } from './Modals/Delete.Modal'
import { GroupUpdateModal } from './Modals/Update.Modal'
import { GroupCardSkeleton } from './Skeleton/GroupCard.Skeleton'

type Props = {
    group: Group
}

export const GroupCard: Component<Props> = (props) => {
    const group = props.group
    const navigate = useNavigate()

    const [isUpdateModalOpen, setIsUpdateModalOpen] = createSignal<boolean>(false)
    const [isGroupUpdating, setIsGroupUpdating] = createSignal<boolean>(false)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal<boolean>(false)
    const [isGroupDeleting, setIsGroupDeleting] = createSignal<boolean>(false)

    return (
        <>
            <Show when={!(isGroupUpdating() || isGroupDeleting())} fallback={<GroupCardSkeleton />}>
                <div onClick={() => navigate(`/groups/${group.id}/`)} class={clsx(styles.card)} >
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
                                setIsUpdateModalOpen(true)
                            }}
                        />
                        <ActionButton
                            icon={IconTrash}
                            variant="danger"
                            onClick={(event) => {
                                event.stopPropagation()
                                setIsDeleteModalOpen(true)
                            }}
                        />
                    </div>
                </div>
            </Show>
            <GroupUpdateModal
                group={group}
                isModalOpen={isUpdateModalOpen}
                setIsModalOpen={setIsUpdateModalOpen}
                isGroupUpdating={isGroupUpdating}
                setIsGroupUpdating={setIsGroupUpdating}
            />
            <GroupDeleteModal
                group={group}
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                isGroupDeleting={isGroupDeleting}
                setIsGroupDeleting={setIsGroupDeleting}
            />
        </>
    )
}
