export const getCustomers = async () => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/customer`)
    return await res.json()
}

export const getCustomer = async (id: string) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/customer/${id}`)
    return await res.json()
}

export const createCustomer = async (data: any) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return res
}

export const updateCustomer = async (id: string, data: any) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/customer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return res
}

export const deleteCustomer = async (id: string) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/customer/${id}`, {
        method: 'DELETE',
    })
    return res
}
