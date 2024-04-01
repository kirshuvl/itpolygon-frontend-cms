import { ActionButton, Button, IconClose, Modal, TitleBlock } from 'itpolygon-ui-dev'
import type { Accessor, Component, Setter } from 'solid-js'
import type { TeacherGroupEnroll } from '../../../types/groups'

type DeleteTeacherModalProps = {
    enroll: TeacherGroupEnroll
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
    isTeacherDeleting: Accessor<boolean>
    setIsTeacherDeleting: Setter<boolean>
}

export const DeleteTeacherModal: Component<DeleteTeacherModalProps> = (props) => {
    const closeModal = () => {
        props.setIsModalOpen(false)
    }

    return (
        <Modal
            isModalOpen={props.isModalOpen}
            setIsModalOpen={props.setIsModalOpen}
            header={
                <TitleBlock
                    title="Удалить преподавателя"
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
                        value={props.isTeacherDeleting() ? 'Сохраняем...' : 'Удалить'}
                        size="F"
                        variant="danger"
                    />
                    <Button value="Отмена" size="F" onClick={closeModal} variant="secondary" outline />
                </>
            }
        >
            <>
                <div>
                    В этом месте должен быть функционал удаления преподавателя{' '}
                    {props.enroll.teacher.first_name} {props.enroll.teacher.last_name} из группы. Но пока
                    что он не реализован. Когда этот функционал будет реализован, Вы сможете удалять
                    преподавателей из группы
                </div>
            </>
        </Modal>
    )
}
