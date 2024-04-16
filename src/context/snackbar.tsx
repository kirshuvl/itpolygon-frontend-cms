import { produce } from 'immer'
import {
    type ParentComponent,
    createContext,
    createUniqueId,
    onCleanup,
    onMount,
    useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { debugMessage } from '../utils/defugMessage'

export type Toast = {
    id?: string
    type?: 'default' | 'success' | 'error'
    title: string
    duration?: number
}

type SnackbarStateContextType = {
    toasts: Toast[]
    actions: {
        createToast: (toast: Toast) => void
        deleteToast: (toastId: string | undefined) => void
    }
}

const SnackbarStateContext = createContext<SnackbarStateContextType>()

export const SnackbarProvider: ParentComponent = (props) => {
    const [toasts, setToasts] = createStore<Toast[]>([])

    onMount(() => {
        debugMessage('[onMount][Provider] Snackbar')
    })

    onCleanup(() => {
        debugMessage('[onCleanup][Provider] Snackbar')
    })

    const createToast = (toast: Toast) => {
        console.log(JSON.stringify(toast))

        setToasts([
            ...toasts,
            {
                id: createUniqueId(),
                ...toast,
            },
        ])
    }

    const deleteToast = (toastId: string | undefined) => {
        if (toastId === undefined) {
            return
        }
        const nextState = produce(toasts, (draftState) => {
            return draftState.filter((toast) => toast.id !== toastId)
        })
        setToasts(nextState)
    }

    const value = {
        toasts,
        actions: {
            createToast,
            deleteToast,
        },
    }

    return <SnackbarStateContext.Provider value={value}>{props.children}</SnackbarStateContext.Provider>
}

export function useSnackbarStateContext() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return useContext(SnackbarStateContext)!
}
