import { Route, Router } from '@solidjs/router'
import { CourseScreen } from '../screens/Course/Course.Screen'
import { DashboardScreen } from '../screens/Dashboard/Dashboard.Screen'
import { Error404 } from '../screens/Errors/Error404'
import { LoginScreen } from '../screens/LoginScreen/Login.Screen'
import { AuthLayout } from './layouts/AuthLayout/AuthLayout'
import { GroupLayout } from './layouts/GroupLayout/GroupLayout'
import { MainLayout } from './layouts/MainLayout/MainLayout'

import {
    GroupCoursesScreen,
    GroupHomeworksScreen,
    GroupLessonsScreen,
    GroupMainScreen,
    GroupScreenWrapper,
    GroupStudentsScreen,
    GroupTeachersScreen,
} from '../screens/Group'

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
                        <Route path="/" component={GroupScreenWrapper}>
                            <Route path="/" component={GroupMainScreen} />
                            <Route path="/students" component={GroupStudentsScreen} />
                            <Route path="/courses" component={GroupCoursesScreen} />
                            <Route path="/teachers" component={GroupTeachersScreen} />
                            <Route path="/lessons" component={GroupLessonsScreen} />
                            <Route path="/homeworks" component={GroupHomeworksScreen} />
                        </Route>
                    </Route>
                    <Route path="/course/:courseId/" component={CourseScreen} />
                    <Route path="*404" component={Error404} />
                </Route>
            </Router>
        </>
    )
}
