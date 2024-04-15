import clsx from 'clsx'
import type { Component } from 'solid-js'
import { TeachersBlock } from '../../../widgets/TeachersBlock/TeachersBlock'
import styles from './Main.Screen.module.scss'

export const GroupMainScreen: Component = () => {
    return (
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
    )
}
