import { Route, Router } from '@solidjs/router'
import { DashboardScreen } from '../screens/Dashboard/Dashboard.Screen'
import { Error404 } from '../screens/Errors/Error404'
import { GroupScreen } from '../screens/Groups/Group.Screen'
import { LoginScreen } from '../screens/LoginScreen/Login.Screen'
import { AuthLayout } from './layouts/AuthLayout/AuthLayout'
import { GroupLayout } from './layouts/GroupLayout/GroupLayout'
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
                    <Route path="/" component={GroupLayout}>
                        <Route path="/groups/:groupId" component={GroupScreen} />
                    </Route>
                    <Route path="*404" component={Error404} />
                </Route>
            </Router>
        </>
    )
}
