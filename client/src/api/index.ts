import { customerHandlers} from './customer';
import { projectHandlers } from './project';
import { workSessionHandlers } from './work_session';
export const api = {
    ...customerHandlers,
    ...projectHandlers,
    ...workSessionHandlers,
} as any