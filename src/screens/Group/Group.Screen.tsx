import type { ParentComponent } from 'solid-js'

import { useLocation, useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { useGroupStateContext } from '../../context/group'
import styles from './Group.Screen.module.scss'

export const GroupScreenWrapper: ParentComponent = (props) => {
    const navigate = useNavigate()
    const location = useLocation()

    const { group } = useGroupStateContext()

    const isTabActive = (tabName: string) => {
        const currentPath = location.pathname
        // Проверяем, содержит ли текущий путь ожидаемое значение tabName
        return currentPath.includes(tabName)
    }

    return (
        <>
            <div class={clsx(styles.buttons)}>
                <Button
                    value="Группа"
                    size="F"
                    outline={
                        isTabActive('students') ||
                        isTabActive('courses') ||
                        isTabActive('teachers') ||
                        isTabActive('lessons') ||
                        isTabActive('homeworks')
                    }
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/`)
                    }}
                />
                <Button
                    value="Ученики"
                    size="F"
                    outline={!isTabActive('students')}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/students`)
                    }}
                />
                <Button
                    value="Курсы"
                    size="F"
                    outline={!isTabActive('courses')}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/courses`)
                    }}
                />
                <Button
                    value="Преподаватели"
                    size="F"
                    outline={!isTabActive('teachers')}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/teachers`)
                    }}
                />
                <Button
                    value="Занятия"
                    size="F"
                    outline={!isTabActive('lessons')}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/lessons`)
                    }}
                />
                <Button
                    value="Домашние задания"
                    size="F"
                    outline={!isTabActive('homeworks')}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/homeworks`)
                    }}
                />
            </div>
            {props.children}
        </>
    )
}
