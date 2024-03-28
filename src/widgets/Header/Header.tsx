import { type Component, Show } from 'solid-js'

import { A, useNavigate } from '@solidjs/router'

import clsx from 'clsx'
import { Button } from 'itpolygon-ui-dev'
import styles from './Header.module.scss'

export const Header: Component = () => {
    const navigate = useNavigate()
    return (
        <header class={clsx(styles.header)}>
            <A href="/" class={clsx(styles.logo)}>
                <img src="/public/icons/logo.png" alt="" /> ИТ Полигон
            </A>
            <div class={clsx(styles.buttons)}>
                <Show
                    when={true}
                    fallback={
                        <>
                            <Button value="Войти" onClick={() => navigate('/login')} />
                        </>
                    }
                >
                    <Button value="Дашборд" onClick={() => navigate('/dashboard')} />
                    <Button value="Выйти" outline />
                </Show>
            </div>
        </header>
    )
}
