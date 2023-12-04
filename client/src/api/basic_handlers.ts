const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'

// export const fetch = async (path: string, config?: any) => {
//     console.log(path.split(endpoint).pop())
    
//     console.log(config)
//     return {
//         json: async () => {
//             if (!config || config.methods === "GET") {
//                 return testData[path.split(endpoint).pop()]
//             }
//             if (config?.method === "POST") {
//                 return { id: 1 }
//             }
//             return []
//         },
//     }
// }

export const buildPath = (path: string, ids: string | string[]): string[] => {
    while (path.includes(':id')) {
        const id = typeof ids === "object" ? ids.shift() : ids
        path = path.replace(':id', id)
    }
    
    return [path, typeof ids === "object" ? ids.shift() : ids]
}

export const basicHandlers = (entityName: string, path: string, serialize: any) => {
    return {
        ["get" + entityName + "s"]: async () => {
            const res = await fetch(`${endpoint}${path}`)
            return await res.json()
        },
        ["get" + entityName]: async (id: string) => {
            const res = await fetch(`${endpoint}${path}/${id}`)
            return await res.json()
        },
        ["create" + entityName]: async (data: any) => {
            const res = await fetch(`${endpoint}${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serialize(data)),
            })
            return res
        },
        ["update" + entityName]: async (id: string, data: any) => {
            const res = await fetch(`${endpoint}${path}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serialize(data)),
            })
            return res
        },
        ["delete" + entityName]: async (id: string) => {
            const res = await fetch(`${endpoint}${path}/${id}`, {
                method: 'DELETE',
            })
        }
    }
}