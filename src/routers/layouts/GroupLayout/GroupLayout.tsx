import type { ParentComponent } from 'solid-js'
import { GroupProvider } from '../../../context/group'

export const GroupLayout: ParentComponent = (props) => {
    return <GroupProvider>{props.children}</GroupProvider>
}
