import { mdiClockPlus } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import {
  Button,
  Buttons,
  Divider,
  CardBox,
  SectionMain,
  SectionTitle,
} from '../../components'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import { api } from '../../api'
import ProjectDropdown from '../../components/DropDown/ProjectDropDown'
import { WorkSession } from '../../interfaces/entities'

const FormsPage = () => {
  const router = useRouter()
  const { workSessionId } = router.query as { workSessionId: string}

  // Define state to hold the workSession data
  const [workSession, setWorkSession] = useState<Partial<WorkSession>>({});

  return (
    <>
      <Head>
        <title>{getPageTitle('Sessie')}</title>
      </Head>

      <SectionMain>
        <SectionTitle icon={mdiClockPlus} title="Nieuwe werksessie" main>
        </SectionTitle>

        <CardBox>
          <Formik
            initialValues={workSession}
            enableReinitialize
            onSubmit={(values) => api.createProject(values).then(() => router.push('/work_sessions'))}
          >
            <Form>
              <Field name="project_id">
                {(props) => (
                  <ProjectDropdown
                    label="Project"
                    labelFor="project_id"
                    name={props.field.name}
                    id="project_id"
                  />
                )}
              </Field>

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Start" />
                <Button type="reset" color="info" outline label="Start vanaf tijdstip" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
