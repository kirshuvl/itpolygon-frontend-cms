import { type Component, createSignal } from 'solid-js'

import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { useGroupStateContext } from '../../context/group'
import { TeachersBlock } from '../../widgets/TeachersBlock/TeachersBlock'
import styles from './Group.Screen.module.scss'

export const GroupScreen: Component = () => {
    const [tab, setTab] = createSignal('group')
    const { group } = useGroupStateContext()
    return (
        <>
            <div class={clsx(styles.buttons)}>
                <Button
                    value="Группа"
                    size="F"
                    outline={tab() !== 'group'}
                    onClick={() => setTab('group')}
                />
                <Button
                    value="Ученики"
                    size="F"
                    outline={tab() !== 'students'}
                    onClick={() => setTab('students')}
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
            <div class={clsx(styles.dashboard)}>
                <div class={clsx(styles.column, styles.left)}>
                    <div class={clsx(styles.card)}>
                        <div class={clsx(styles.skeleton)}>Временный блок</div>
                    </div>
                </div>
                <div class={clsx(styles.column, styles.right)}>
                    <div class={clsx(styles.card)}>
                        <TeachersBlock />
                    </div>
                </div>
            </div>
        </>
    )
}
