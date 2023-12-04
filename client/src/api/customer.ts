import { basicHandlers } from "./basic_handlers";

export const customerHandlers = {
    ...basicHandlers('Customer', '/customer', (data) => data)
}