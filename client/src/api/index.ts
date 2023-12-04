import * as customerHandlers from './customer';
import * as projectHandlers from './project';
import * as workSessionHandlers from './work_session';
export const api = {
    ...customerHandlers,
    ...projectHandlers,
    ...workSessionHandlers,
}