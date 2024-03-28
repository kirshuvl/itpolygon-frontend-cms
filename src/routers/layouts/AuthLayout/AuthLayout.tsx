import { useNavigate } from '@solidjs/router'
import { type ParentComponent, createEffect, onCleanup, onMount } from 'solid-js'
import { useSessionStateContext } from '../../../context/session'
import { debugMessage } from '../../../utils/defugMessage'

export const AuthLayout: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext()
    const navigate = useNavigate()

    createEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard')
        }
    })

    onMount(() => {
        debugMessage('[AuthLayout] onMount')
    })
    onCleanup(() => {
        debugMessage('[AuthLayout] onCleanup')
    })
    return <>{props.children}</>
}
