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