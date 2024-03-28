export const createFormData = (data: { [key: string]: string }): FormData => {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }

    return formData
}
