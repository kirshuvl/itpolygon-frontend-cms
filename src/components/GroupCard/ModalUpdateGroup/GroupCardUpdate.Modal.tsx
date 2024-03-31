import { ActionButton, Button, IconClose, InputField, Modal, TitleBlock } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import type { Accessor, Component, Setter } from 'solid-js'
import * as yup from 'yup'
import { useDashboardStateContext } from '../../../context/dashboard'
import type { Group } from '../../../types/groups'
import { debugMessage } from '../../../utils/defugMessage'
type GroupCardModalUpdate = {
    group: Group
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
    isGroupUpdating: Accessor<boolean>
    setIsGroupUpdating: Setter<boolean>
}

type FormSchema = {
    title: string
}

const schema: yup.Schema<FormSchema> = yup.object({
    title: yup.string().required('Введите название группы'),
})

export const GroupCardUpdateModal: Component<GroupCardModalUpdate> = (props) => {
    const formHandler = useFormHandler(yupSchema(schema), {
        delay: 1000,
    })

    const {
        groups: {
            actions: { updateTeacherGroup },
        },
    } = useDashboardStateContext()

    const submit = async () => {
        try {
            props.setIsGroupUpdating(true)
            await formHandler.validateForm()
            await updateTeacherGroup({
                groupId: props.group.id,
                title: formHandler.getFieldValue('title'),
            })
            formHandler.resetForm()
        } catch (error) {
            debugMessage(`[buttonClick] ${error}`)
        } finally {
            props.setIsGroupUpdating(false)
            props.setIsModalOpen(false)
        }
    }
    const closeModal = () => {
        formHandler.resetForm()
        props.setIsModalOpen(false)
    }

    return (
        <>
            <Modal
                isModalOpen={props.isModalOpen}
                setIsModalOpen={props.setIsModalOpen}
                header={
                    <TitleBlock
                        title="Редактировать группу"
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
                            onClick={() => submit()}
                            value={props.isGroupUpdating() ? 'Сохраняем...' : 'Сохранить'}
                            size="F"
                            loading={props.isGroupUpdating()}
                            disabled={formHandler.isFormInvalid()}
                        />
                        <Button value="Отмена" size="F" onClick={closeModal} variant="secondary" outline />
                    </>
                }
            >
                <InputField
                    value={props.group.title}
                    name="title"
                    formHandler={formHandler}
                    placeholder="Название группы"
                />
            </Modal>
        </>
    )
}
