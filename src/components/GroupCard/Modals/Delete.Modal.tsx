import { ActionButton, Button, IconClose, Modal, TitleBlock } from 'itpolygon-ui-dev'
import type { Accessor, Component, Setter } from 'solid-js'
import { useDashboardStateContext } from '../../../context/dashboard'
import type { Group } from '../../../types/groups'
import { debugMessage } from '../../../utils/defugMessage'

type Props = {
    group: Group
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
    isGroupDeleting: Accessor<boolean>
    setIsGroupDeleting: Setter<boolean>
}

export const GroupDeleteModal: Component<Props> = (props) => {
    const {
        groups: {
            actions: { deleteTeacherGroup },
        },
    } = useDashboardStateContext()

    const submit = async () => {
        try {
            props.setIsGroupDeleting(true)
            await deleteTeacherGroup({
                groupId: props.group.id,
            })
        } catch (error) {
            debugMessage(`[buttonClick] ${error}`)
        } finally {
            props.setIsGroupDeleting(false)
            props.setIsModalOpen(false)
        }
    }
    const closeModal = () => {
        props.setIsModalOpen(false)
    }
    return (
        <Modal
            isModalOpen={props.isModalOpen}
            setIsModalOpen={props.setIsModalOpen}
            header={
                <TitleBlock
                    title="Удалить группу"
                    buttons={
                        <>
                            <ActionButton onClick={closeModal} icon={IconClose} />
                        </>
                    }
                />
            }
            footer={
                <>
                    <Button
                        value={props.isGroupDeleting() ? 'Удаляем...' : 'Удалить'}
                        size="F"
                        variant="danger"
                        loading={props.isGroupDeleting()}
                        onClick={submit}
                    />
                    <Button value="Отмена" size="F" onClick={closeModal} variant="secondary" outline />
                </>
            }
        >
            <>
                <div>
                    Вы точно уверены, что хотите удалить группу {props.group.title}? Это удалит все
                    связанные данные!
                </div>
            </>
        </Modal>
    )
}
