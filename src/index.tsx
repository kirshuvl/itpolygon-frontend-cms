import { render } from 'solid-js/web'
import { App } from './App'
import './styles/style.scss'

const root = document.getElementById('root')

if (root) {
    render(() => <App />, root)
} else {
    console.error('Element with id "root" not found.')
}
