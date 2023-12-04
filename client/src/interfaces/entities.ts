export type Project = {
  id: string
  customer_id: number
  customer_name: string
  description: string
  name: string
  status: string
  progress: number
  created_timestamp: string
}

export type Customer = {
  id: string
  name: string
  relation_number: number
  created_timestamp: string
}

export type WorkSession = {
  id: string
  project_id: number
  created_timestamp: string
  started_timestamp: string
  start_time: string
  finished_timestamp: string
  finish_time: string
  hours: number
  earned_amount: number
}

export type Task = {
  id: string
  created_timestamp: string
  description: string
  earned_amount: number
  finished_timestamp: string
  hours: number
  priority: number
  project_id: number
  project_name: string
  started_timestamp: string
  status: 'concept' | 'active' | 'done'
  title: string

}