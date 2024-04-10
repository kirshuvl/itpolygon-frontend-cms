import { Route, Router } from '@solidjs/router'
import { CourseScreen } from '../screens/Course/Course.Screen'
import { DashboardScreen } from '../screens/Dashboard/Dashboard.Screen'
import { Error404 } from '../screens/Errors/Error404'
import { GroupScreen } from '../screens/Group/Group.Screen'
import { GroupMain } from '../screens/Group/GroupMain/GroupMain'
import { GroupStudentsScreen } from '../screens/Group/GroupStudents/GroupStudents'
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
                    <Route path="/groups/:groupId" component={GroupLayout}>
                        <Route path="/" component={GroupScreen}>
                            <Route path="/" component={GroupMain} />
                            <Route path="/students" component={GroupStudentsScreen} />
                        </Route>
                    </Route>
                    <Route path="/course/:courseId/" component={CourseScreen} />
                    <Route path="*404" component={Error404} />
                </Route>
            </Router>
        </>
    )
}
