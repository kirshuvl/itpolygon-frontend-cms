import { Route, Router } from '@solidjs/router'
import { Error404 } from '../screens/Errors/Error404'
import { HomeScreen } from '../screens/HomeScreen'
import { LoginScreen } from '../screens/LoginScreen/LoginScreen'
import { AuthLayout } from './layouts/AuthLayout/AuthLayout'
import { MainLayout } from './layouts/MainLayout/MainLayout'

export const AppRouters = () => {
    return (
        <>
            <Router>
                <Route path="/" component={AuthLayout}>
                    <Route path="/" component={LoginScreen} />
                </Route>
                <Route path="/" component={MainLayout}>
                    <Route path="/dashboard" component={HomeScreen} />
                    <Route path="*404" component={Error404} />
                </Route>
            </Router>
        </>
    )
}
