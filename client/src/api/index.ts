import * as customerHandlers from './customer';
import * as projectHandlers from './project';
export const api = {
    ...customerHandlers,
    ...projectHandlers
}