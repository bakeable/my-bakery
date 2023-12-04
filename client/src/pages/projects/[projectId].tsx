import { mdiAccount, mdiBallotOutline, mdiBook, mdiCurrencyEur, mdiCursorDefault, mdiGithub, mdiImageText, mdiMail, mdiRayStartVertexEnd, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import {
  Button,
  Buttons,
  Divider,
  CardBox,
  FormField,
  SectionMain,
  SectionTitle,
} from '../../components'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import { Project } from '../../interfaces'
import { api } from '../../api'
import CustomerDropdown from '../../components/DropDown/CustomerDropDown'

const FormsPage = () => {
  const router = useRouter()
  const { projectId } = router.query as { projectId: string}

  // Define state to hold the project data
  const [project, setProject] = useState<Partial<Project>>({});

  // Use useEffect to fetch the project data when projectId changes
  useEffect(() => {
    if (projectId) {
      // Call your async function to get the project by projectId
      api.getProject(projectId).then((project) => {
        // Set the project data in state
        setProject(project);
      });
    }
  }, [projectId]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>
        <SectionTitle icon={mdiBallotOutline} title={project.name} main>
        </SectionTitle>

        <CardBox>
          <Formik
            initialValues={project}
            enableReinitialize
            onSubmit={(values) => api.updateProject(projectId, values).then(() => router.push('/projects'))}
          >
            <Form>
              <FormField label="Projectnaam" icons={[mdiBook]}>
                <Field name="name" placeholder="Geef het project een naam" />
              </FormField>

              <Field name="customer_id">
                {(props) => (
                  <CustomerDropdown
                    label="Klant"
                    labelFor="customer_id"
                    name={props.field.name}
                    id="customer_id"
                  />
                )}
              </Field>

              <Divider />

              <FormField label="Uurloon (excl. BTW)" icons={[mdiCurrencyEur]}>
                <Field type="number" name="wage" placeholder="Stel het afgesproken uurloon in" />
              </FormField>

              <Divider />

              <FormField label="Status" labelFor="status" icons={[mdiRayStartVertexEnd]}>
                <Field name="status" id="status" component="select">
                  <option value="concept">Concept</option>
                  <option value="active">Actief</option>
                  <option value="inactive">Inactief</option>
                  <option value="done">Afgerond</option>
                </Field>
              </FormField>

              <Divider />

              <FormField label="Beschrijving" hasTextareaHeight>
                <Field name="description" as="textarea" placeholder="Beschrijf het doel van het project" />
              </FormField>

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Opslaan" />
                <Button type="reset" color="info" outline label="Reset" />
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
