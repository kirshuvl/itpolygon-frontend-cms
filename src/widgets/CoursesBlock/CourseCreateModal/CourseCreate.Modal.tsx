import type { Accessor, Component, Setter } from 'solid-js'

import { ActionButton, Button, IconClose, InputField, Modal, TitleBlock } from 'itpolygon-ui-dev'
import { useFormHandler } from 'solid-form-handler'
import { yupSchema } from 'solid-form-handler/yup'
import * as yup from 'yup'
import { useDashboardStateContext } from '../../../context/dashboard'
import { debugMessage } from '../../../utils/defugMessage'

type CourseCreateModalProps = {
    isModalOpen: Accessor<boolean>
    setIsModalOpen: Setter<boolean>
    isAddingInProgress: Accessor<boolean>
    setIsAddingInProgress: Setter<boolean>
}

type FormSchema = {
    title: string
}

const schema: yup.Schema<FormSchema> = yup.object({
    title: yup.string().required('Введите название курса'),
})

export const CourseCreateModal: Component<CourseCreateModalProps> = (props) => {
    const formHandler = useFormHandler(yupSchema(schema), {
        delay: 1000,
    })
    const { formData } = formHandler
    const {
        courses: {
            actions: { createCourse },
        },
    } = useDashboardStateContext()

    const submit = async () => {
        try {
            props.setIsAddingInProgress(true)
            await formHandler.validateForm()
            await createCourse(formData())
            formHandler.resetForm()
        } catch (error) {
            debugMessage(`[buttonClick] ${error}`)
        } finally {
            props.setIsAddingInProgress(false)
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
                    title="Создать курс"
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
                        value={props.isAddingInProgress() ? 'Создаем...' : 'Создать'}
                        size="F"
                        loading={props.isAddingInProgress()}
                        disabled={formHandler.isFormInvalid()}
                    />
                    <Button value="Отмена" size="F" onClick={closeModal} variant="secondary" outline />
                </>
            }
        >
            <InputField name="title" formHandler={formHandler} placeholder="Заголовок курса" />
        </Modal>
    )
}
