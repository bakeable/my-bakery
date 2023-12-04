import { mdiAlertCircle, mdiClock, mdiClockPlus } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import {
  Button,
  Buttons,
  Divider,
  CardBox,
  SectionMain,
  SectionTitle,
  FormField,
} from '../../components'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import { api } from '../../api'
import ProjectDropdown from '../../components/DropDown/ProjectDropDown'
import { WorkSession } from '../../interfaces/entities'
import NotificationBar from '../../components/NotificationBar'

const FormsPage = () => {
  const router = useRouter()

  // Define state to hold the workSession data
  const [workSession, setWorkSession] = useState<Partial<WorkSession>>({
    start_time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
  });

  const [showNotification, setShowNotification] = useState(false);

  const startWorkSessionFrom9 = () => {
    startWorkSession({...workSession, start_time: "09:00"});
  }

  const startWorkSession = (values) => {
    if (!values.project_id) {
      setShowNotification(true);
      return;
    }
    api.startWorkSession(values).then(({id}) => router.push('/work_sessions/' + id))
  }

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
            onSubmit={(values) => startWorkSession(values)}
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

              {showNotification && (
                <NotificationBar color="danger" icon={mdiAlertCircle}>
                  <p>Vergeet niet om een project te selecteren</p>
                </NotificationBar>
              )}

              <FormField label="Tijdstip" icons={[mdiClock]}>
                <Field name="start_time" type="time" />
              </FormField>

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Start" />
                <Button type="reset" color="info" outline label="Start vanaf 9:00" onClick={startWorkSessionFrom9} />
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
