export const getProjects = async () => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/project`)
    return await res.json()
}

export const getProject = async (id: string) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/project/${id}`)
    return await res.json()
}

export const createProject = async (data: any) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/project`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return res
}

export const updateProject = async (id: string, data: any) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/project/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return res
}

export const deleteProject = async (id: string) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/project/${id}`, {
        method: 'DELETE',
    })
    return res
}