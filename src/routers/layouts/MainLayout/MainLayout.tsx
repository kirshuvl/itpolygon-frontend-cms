import clsx from 'clsx'
import type { ParentComponent } from 'solid-js'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import styles from './MainLayout.module.scss'

export const MainLayout: ParentComponent = (props) => {
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
