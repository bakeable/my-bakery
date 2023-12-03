import { mdiOfficeBuilding, mdiPlus } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import {
  Button,
  CardBox,
  SectionMain,
  SectionTitleLineWithButton,
  TableCustomers,
} from '../../components'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'

const pageName = 'Klanten'
const CustomersPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{getPageTitle(pageName)}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiOfficeBuilding} title={pageName} main>
          <Button
            icon={mdiPlus}
            label="Klant aanmaken"
            color="contrast"
            roundedFull
            small
            onClick={() => router.push('/customers/create')}
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableCustomers />
        </CardBox>
      </SectionMain>
    </>
  )
}

CustomersPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default CustomersPage
