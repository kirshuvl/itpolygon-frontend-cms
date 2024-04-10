import { ActionButton, Button, IconClose, Modal, TitleBlock } from 'itpolygon-ui-dev'
import type { Accessor, Component, Setter } from 'solid-js'
import { useDashboardStateContext } from '../../../context/dashboard'
import { debugMessage } from '../../../utils/defugMessage'

import { InputField } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import * as yup from 'yup'

type Props = {
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
    isGroupAdding: Accessor<boolean>
    setIsGroupAdding: Setter<boolean>
}

type FormSchema = {
    title: string
}

const schema: yup.Schema<FormSchema> = yup.object({
    title: yup.string().required('Введите название группы'),
})

export const GroupCreateModal: Component<Props> = (props) => {
    const formHandler = useFormHandler(yupSchema(schema), {
        delay: 1000,
    })
    const { formData } = formHandler

    const {
        groups: {
            actions: { createTeacherGroup },
        },
    } = useDashboardStateContext()

    const submit = async () => {
        try {
            props.setIsGroupAdding(true)
            await formHandler.validateForm()
            await createTeacherGroup(formData())
            formHandler.resetForm()
        } catch (error) {
            debugMessage(`[buttonClick] ${error}`)
        } finally {
            props.setIsGroupAdding(false)
            props.setIsModalOpen(false)
        }
    }

    const closeModal = () => {
        formHandler.resetForm()
        props.setIsModalOpen(false)
    }

    return (
        <Modal
            block={!formHandler.formHasChanges()}
            isModalOpen={props.isModalOpen}
            setIsModalOpen={props.setIsModalOpen}
            header={
                <TitleBlock
                    title="Создать группу"
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
                        value={props.isGroupAdding() ? 'Создаем...' : 'Создать'}
                        size="F"
                        loading={props.isGroupAdding()}
                        disabled={formHandler.isFormInvalid()}
                    />
                    <Button value="Отмена" size="F" onClick={closeModal} variant="secondary" outline />
                </>
            }
        >
            <InputField name="title" formHandler={formHandler} placeholder="Название группы" />
        </Modal>
    )
}
