import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'
import { type ParentComponent, createEffect } from 'solid-js'
import { useSessionStateContext } from '../../../context/session'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import styles from './MainLayout.module.scss'

export const MainLayout: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()
    const navigate = useNavigate()

    createEffect(() => {
        if (!isAuthenticated()) {
            navigate('/')
        }
    })
    return (
        <div class="container">
            <div class={clsx(styles.content)}>
                <Header />
                <div class={clsx(styles.main)}>{props.children}</div>
                <Footer />
            </div>
        </div>
    )
}
