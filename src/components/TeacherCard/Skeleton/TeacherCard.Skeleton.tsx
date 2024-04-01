import clsx from 'clsx'
import type { Component } from 'solid-js'

import styles from './TeacherCard.Skeleton.module.scss'

export const TeacherCardSkeleton: Component = () => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)} />
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.first)} />
                <div class={clsx(styles.second)} />
            </div>
        </div>
    )
}
