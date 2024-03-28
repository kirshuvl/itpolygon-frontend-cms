import type { Component } from 'solid-js'

import { A, useNavigate } from '@solidjs/router'

import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import { useSessionStateContext } from '../../context/session'
import styles from './Header.module.scss'

export const Header: Component = () => {
    const navigate = useNavigate()
    const {
        actions: { signOut },
    } = useSessionStateContext()

    return (
        <header class={clsx(styles.header)}>
            <A href="/" class={clsx(styles.logo)}>
                <img src="/public/icons/logo.png" alt="" /> ИТ Полигон
            </A>
            <div class={clsx(styles.buttons)}>
                <Button value="Дашборд" onClick={() => navigate('/dashboard')} />
                <Button value="Выйти" onClick={() => signOut()} outline />
            </div>
        </header>
    )
}
