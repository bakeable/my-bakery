export type Project = {
    id: string
    customer_id: number
    customer_name: string
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