import { type ParentComponent, createSignal } from 'solid-js'

import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { useGroupStateContext } from '../../context/group'
import styles from './Group.Screen.module.scss'

export const GroupScreen: ParentComponent = (props) => {
    const navigate = useNavigate()

    const { group } = useGroupStateContext()

    const [tab, setTab] = createSignal('group')
    return (
        <>
            <div class={clsx(styles.buttons)}>
                <Button
                    value="Группа"
                    size="F"
                    outline={tab() !== 'group'}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/`)
                        setTab('group')
                    }}
                />
                <Button
                    value="Ученики"
                    size="F"
                    outline={tab() !== 'students'}
                    onClick={() => {
                        navigate(`/groups/${group()?.id}/students`)
                        setTab('students')
                    }}
                />
                <Button
                    value="Курсы"
                    size="F"
                    outline={tab() !== 'courses'}
                    onClick={() => setTab('courses')}
                />
                <Button
                    value="Преподаватели"
                    size="F"
                    outline={tab() !== 'teachers'}
                    onClick={() => setTab('teachers')}
                />
                <Button
                    value="Занятия"
                    size="F"
                    outline={tab() !== 'lessons'}
                    onClick={() => setTab('lessons')}
                />
                <Button
                    value="Домашние задания"
                    size="F"
                    outline={tab() !== 'homeworks'}
                    onClick={() => setTab('homeworks')}
                />
            </div>
            {props.children}
        </>
    )
}
