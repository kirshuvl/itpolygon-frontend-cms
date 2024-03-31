import { Route, Router } from '@solidjs/router'
import { DashboardScreen } from '../screens/Dashboard/Dashboard.Screen'
import { Error404 } from '../screens/Errors/Error404'
import { LoginScreen } from '../screens/LoginScreen/Login.Screen'
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
                    <Route path="/dashboard" component={DashboardScreen} />
                    <Route path="*404" component={Error404} />
                </Route>
            </Router>
        </>
    )
}
