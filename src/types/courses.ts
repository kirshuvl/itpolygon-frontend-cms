interface Teacher {
    id: number
    first_name: string
    last_name: string
    icon: string
}

interface authorEnrolls {
    id: number
    course: number
    user: Teacher
}

export interface Course {
    id: number
    icon?: string
    title: string
    authorEnrolls: authorEnrolls[]
}