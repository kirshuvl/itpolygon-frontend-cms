export interface Teacher {
    id: number
    first_name: string
    last_name: string
    icon: string
}

interface Student {
    id: number
    first_name: string
    last_name: string
    icon: string
}

export interface TeacherGroupEnroll {
    id: number
    group: number
    teacher: Teacher
}

export interface StudentGroupEnroll {
    id: number
    group: number
    student: Student
}

export interface Group {
    id: number
    title: string
    icon?: string
    teacherEnrolls: TeacherGroupEnroll[]
    studentEnrolls: StudentGroupEnroll[]
}
