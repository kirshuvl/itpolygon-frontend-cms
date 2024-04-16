import { render } from 'solid-js/web'
import { App } from './App'
import { SessionProvider } from './context/session'
import { SnackbarProvider } from './context/snackbar'
import './styles/style.scss'
import { debugMessage } from './utils/defugMessage'

const root = document.getElementById('root')

if (root) {
    render(
        () => (
            <SnackbarProvider>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </SnackbarProvider>
        ),
        root,
    )
} else {
    debugMessage('Element with id "root" not found.')
}
