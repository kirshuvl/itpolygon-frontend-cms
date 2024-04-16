import { type Accessor, type Component, For, type Setter, Show, createResource } from 'solid-js'

import { ActionButton, IconClose, Modal, TitleBlock } from 'itpolygon-ui-dev'
import { apiGroups } from '../../../api/groups/apiGroups'
import { useGroupStateContext } from '../../../context/group'
import type { Teacher } from '../../../types/groups'
import { CreateTeacherEnrollCard } from '../CreateCard/CreateTeacherEnrollCard'

import clsx from 'clsx'
import { EmptyData } from '../../EmptyData'
import styles from './CreateTeacer.Modal.module.scss'

type Props = {
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
    isAddingInProgress: Accessor<boolean>
    setIsAddingInProgress: Setter<boolean>
}

export const TeacherEnrollCreateModal: Component<Props> = (props) => {
    const { group } = useGroupStateContext()

    const [users] = createResource<Teacher[], boolean>(props.isModalOpen, async () => {
        const groupId = group()?.id
        if (groupId === undefined) {
            throw new Error('Group ID is undefined')
        }
        const responce = await apiGroups.getPotentialTeachers({ groupId: groupId })
        return responce
    })

    const closeModal = () => {
        props.setIsModalOpen(false)
    }

    return (
        <Modal
            isModalOpen={props.isModalOpen}
            setIsModalOpen={props.setIsModalOpen}
            header={
                <TitleBlock
                    title="Добавить преподавателя"
                    buttons={<ActionButton onClick={closeModal} icon={IconClose} />}
                />
            }
        >
            <Show when={users() && users()?.length === 0}>
                <EmptyData text="Скорее всего вы добавили всех кого только можно" />
            </Show>
            <div class={clsx(styles.body)}>
                <For each={users()}>
                    {(user) => (
                        <CreateTeacherEnrollCard user={user} loading={props.setIsAddingInProgress} />
                    )}
                </For>
            </div>
        </Modal>
    )
}
