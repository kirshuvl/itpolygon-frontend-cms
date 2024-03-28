import { Route, Router } from '@solidjs/router'
import { HomeScreen } from '../screens/HomeScreen'
import { MainLayout } from './layouts/MainLayout/MainLayout'

export const AppRouters = () => {
    return (
        <>
            <Router>
                <Route path="/" component={MainLayout}>
                    <Route path="/" component={HomeScreen} />
                </Route>
            </Router>
        </>
    )
}
