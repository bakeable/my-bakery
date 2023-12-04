import { basicHandlers } from "./basic_handlers"

const startWorkSession = async (data: any) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'

    const res = await fetch(`${endpoint}/work_session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serialize(preprocess(data))),
    })
    return res.json()
}

const updateWorkSession = async (id: string, data: any) => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
    const res = await fetch(`${endpoint}/work_session/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serialize(preprocess(data))),
    })
    return res
}


const preprocess = (data: any) => {
    if (!data.started_timestamp && data.start_time) {
        const [hours, minutes] = data.start_time.split(':')
        let now = new Date()
        now = new Date(now.setHours(parseInt(hours)))
        now = new Date(now.setMinutes(parseInt(minutes)))
        data.started_timestamp = now.toLocaleString('sv-SE')
    } else {
        data.started_timestamp = new Date('2000-01-01').toLocaleString('sv-SE')
    }

    if (!data.finished_timestamp && data.finish_time) {
        const [hours, minutes] = data.finish_time.split(':')
        let now = new Date()
        now = new Date(now.setHours(parseInt(hours)))
        now = new Date(now.setMinutes(parseInt(minutes)))
        data.finished_timestamp = now.toLocaleString('sv-SE')
    } else {
        data.finished_timestamp = new Date('2000-01-01').toLocaleString('sv-SE')
        data.finish_time = '00:00'
    }

    if (!data.hours && data.started_timestamp && data.finished_timestamp) {
        const started = new Date(data.started_timestamp)
        const finished = new Date(data.finished_timestamp)
        const diff = finished.getTime() - started.getTime()
        data.hours = diff / 1000 / 60 / 60
    }

    console.log(data)

    return data
}

const serialize = (obj: any) => {
    return {
        ...obj,
        project_id: parseInt(obj.project_id),
    }
}

export const workSessionHandlers = {
    ...basicHandlers('WorkSession', '/work_session', serialize),
    startWorkSession,
    updateWorkSession,
}