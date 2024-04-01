import { ActionButton, Button, IconClose, Modal, TitleBlock } from 'itpolygon-ui-dev'
import type { Accessor, Component, Setter } from 'solid-js'
import type { TeacherGroupEnroll } from '../../../types/groups'

type InfoTeacherModalProps = {
    enroll: TeacherGroupEnroll
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
}

export const InfoTeacherModal: Component<InfoTeacherModalProps> = (props) => {
    const closeModal = () => {
        props.setIsModalOpen(false)
    }

    return (
        <Modal
            isModalOpen={props.isModalOpen}
            setIsModalOpen={props.setIsModalOpen}
            header={
                <TitleBlock
                    title="Информация"
                    buttons={
                        <>
                            <ActionButton onClick={closeModal} icon={IconClose} />
                        </>
                    }
                />
            }
            footer={
                <>
                    <Button value="Понятно" size="F" variant="primary" onClick={closeModal} />
                    <Button value="Отмена" size="F" onClick={closeModal} variant="secondary" outline />
                </>
            }
        >
            <>
                <div>
                    В этом месте должен быть функционал, который даст нам какую-то информацию о
                    преподавателе {props.enroll.teacher.first_name} {props.enroll.teacher.last_name} в этой
                    группе. Например, это может быть количество проверенных работ.
                </div>
            </>
        </Modal>
    )
}
