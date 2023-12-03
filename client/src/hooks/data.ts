import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getProjects = () => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
  const { data, error } = useSWR(`${endpoint}/project`, fetcher)
  return {
    projects: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const getProject = async (id: string) => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4040/api'
  const { data, error } = useSWR(`${endpoint}/project/${id}`, fetcher)
  return {
    project: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
