import clsx from 'clsx'
import type { Component } from 'solid-js'

import styles from './GroupCard.Skeleton.module.scss'

export const GroupCardSkeleton: Component = () => {
    return (
        <div class={clsx(styles.card)}>
            <div class={clsx(styles.icon)} />
            <div class={clsx(styles.content)}>
                <div class={clsx(styles.title)} />
                <div class={clsx(styles.students)} />
            </div>
        </div>
    )
}
