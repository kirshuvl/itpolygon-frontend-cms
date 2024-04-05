import clsx from 'clsx'
import type { Component } from 'solid-js'
import styles from './Dashboard.Screen.module.scss'

import { CoursesBlock } from '../../widgets/CoursesBlock/CoursesBlock'
import { GroupsBlock } from '../../widgets/GroupsBlock'

export const DashboardScreen: Component = () => {
    return (
        <div class={clsx(styles.dashboard)}>
            <div class={clsx(styles.column, styles.left)}>
                <div class={clsx(styles.card)}>
                    <CoursesBlock />
                </div>
            </div>
            <div class={clsx(styles.column, styles.right)}>
                <div class={clsx(styles.card)}>
                    <GroupsBlock />
                </div>
                <div class={clsx(styles.card)}>
                    <div class={clsx(styles.skeleton)}>Временный блок</div>
                </div>
                <div class={clsx(styles.card)}>
                    <div class={clsx(styles.skeleton)}>Временный блок</div>
                </div>
            </div>
        </div>
    )
}
