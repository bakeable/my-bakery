import { mdiAccount, mdiBallotOutline, mdiBook, mdiCursorDefault, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
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
import { Customer } from '../../interfaces'
import { api } from '../../api'

const FormsPage = () => {
  const router = useRouter()
  const { customerId } = router.query as { customerId: string}

  // Define state to hold the customer data
  const [customer, setCustomer] = useState<Partial<Customer>>({});

  // Use useEffect to fetch the customer data when customerId changes
  useEffect(() => {
    if (customerId) {
      // Call your async function to get the customer by customerId
      api.getCustomer(customerId).then((customer) => {
        // Set the customer data in state
        setCustomer(customer);
      });
    }
  }, [customerId]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Klant')}</title>
      </Head>

      <SectionMain>
        <SectionTitle icon={mdiBallotOutline} title={customer.name} main>
        </SectionTitle>

        <CardBox>
          <Formik
            initialValues={customer}
            enableReinitialize
            onSubmit={(values) => api.updateCustomer(customerId, values).then(() => router.push('/customers'))}
          >
            <Form>
              <FormField label="Klant" icons={[mdiBook]}>
                <Field name="name" placeholder="Geef de klant een naam" />
              </FormField>

              <Divider />

              <FormField label="Beschrijving" hasTextareaHeight>
                <Field name="description" as="textarea" placeholder="Beschrijf de klant" />
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
