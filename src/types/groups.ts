interface Teacher {
    id: number
    first_name: string
    last_name: string
    icon: string
}

export interface TeacherGroupEnroll {
    id: number
    teacher: Teacher
}

export interface Group {
    id: number
    title: string
    icon?: string
    teacherEnrolls: TeacherGroupEnroll[]
}
