import type { Component } from 'solid-js'
import { AppRouters } from './routers'
import { SnackbarContainer } from './widgets/Snackbar/Snackbar'

export const App: Component = () => {
    return (
        <>
            <SnackbarContainer />
            <AppRouters />
        </>
    )
}
