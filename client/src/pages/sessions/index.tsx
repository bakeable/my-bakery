import { mdiPlus, mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import {
  Button, CardBox, SectionMain, SectionTitleLineWithButton, TableProjects,
} from '../../components'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'

const pageName = 'Projecten'
const ProjectsPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{getPageTitle(pageName)}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title={pageName} main>
          <Button
            icon={mdiPlus}
            label="Project aanmaken"
            color="contrast"
            roundedFull
            small
            onClick={() => router.push('/projects/create')}
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableProjects />
        </CardBox>
      </SectionMain>
    </>
  )
}

ProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProjectsPage
