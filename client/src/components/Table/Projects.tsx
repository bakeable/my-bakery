import { mdiBookEdit, mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { Client, Project } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import { useRouter } from 'next/router'
import { api } from '../../api'

const TableProjects = () => {
  const router = useRouter()

  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    api.getProjects().then((projects) => {
      setProjects(projects || []);
    });
  }, []);

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const projectsPaginated = projects.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(projects.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalDeleteActive, setIsModalDeleteActive] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  const closeModal = () => {
    setIsModalDeleteActive(false)
  }

  const confirmDeleteProject = (projectId: string) => {
    setIsModalDeleteActive(true)
    setProjectToDelete(projectId)
  }

  const deleteProject = () => {
    if (projectToDelete) {
      api
        .deleteProject(projectToDelete)
        .then(() => {
          closeModal();
  
          // Filter out the deleted project and update the state
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== projectToDelete)
          );
        })
        .catch(() => {
          closeModal();
        });
    }
  }

  return (
    <>
      <CardBoxModal
        title="Weet je het zeker?"
        buttonColor="danger"
        buttonLabel="Bevestigen"
        isActive={isModalDeleteActive}
        onConfirm={deleteProject}
        onCancel={closeModal}
      >
        <p>Deze actie kan niet ongedaan worden gemaakt</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Projectnaam</th>
            <th>Bedrijf</th>
            <th>Status</th>
            <th>Progressie</th>
            <th>Gestart op</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projectsPaginated.map((project: Project) => (
            <tr key={project.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={project.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Name">{project.name}</td>
              <td data-label="Company">{project.company}</td>
              <td data-label="Status">{project.status}</td>
              <td data-label="Progress" className="lg:w-32">
                <progress
                  className="flex w-2/5 self-center lg:w-full"
                  max="100"
                  value={project.progress}
                >
                  {project.progress}
                </progress>
              </td>
              <td data-label="Started">
                <small className="text-gray-500 dark:text-slate-400">{new Date(project.project_started_timestamp || Date.now()).toLocaleDateString()}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="success"
                    icon={mdiBookEdit}
                    onClick={() => router.push(`/projects/${project.id}`)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => confirmDeleteProject(project.id)}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableProjects
