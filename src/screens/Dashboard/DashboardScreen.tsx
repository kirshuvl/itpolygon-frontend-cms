import clsx from 'clsx'
import type { Component } from 'solid-js'
import styles from './DashboardScreen.module.scss'

import { TeacherGroupsBlock } from '../../widgets/GroupBlock'

export const DashboardScreen: Component = () => {
    return (
        <div class={clsx(styles.dashboard)}>
            <div class={clsx(styles.column, styles.left)}>
                <div class={clsx(styles.card)}>
                    <div class={clsx(styles.skeleton)}>Временный блок</div>
                </div>
                <div class={clsx(styles.card)}>
                    <div class={clsx(styles.skeleton)}>Временный блок</div>
                </div>
            </div>
            <div class={clsx(styles.column, styles.right)}>
                <div class={clsx(styles.card)}>
                    <TeacherGroupsBlock />
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
