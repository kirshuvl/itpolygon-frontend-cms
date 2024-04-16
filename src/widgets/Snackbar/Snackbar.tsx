import { For, type ParentComponent } from 'solid-js'

import clsx from 'clsx'

import { ToastNotification } from 'itpolygon-ui-dev'
import { useSnackbarStateContext } from '../../context/snackbar'
import styles from './Snackbar.module.scss'

export const SnackbarContainer: ParentComponent = () => {
    const {
        toasts,
        actions: { deleteToast },
    } = useSnackbarStateContext()
    return (
        <div class={clsx(styles.snackbar)}>
            <For each={toasts}>
                {(toast) => <ToastNotification toast={toast} onClose={() => deleteToast(toast.id)} />}
            </For>
        </div>
    )
}
