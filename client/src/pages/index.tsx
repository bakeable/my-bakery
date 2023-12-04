import {
  mdiAccountMultiple,
  mdiBank,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiClockOutline,
  mdiClockPlus,
  mdiGithub,
  mdiListBox,
  mdiMonitorCellphone,
  mdiReload,
} from '@mdi/js'
import Head from 'next/head'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import Button from '../components/Button'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxWidget from '../components/CardBox/Widget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBox/Transaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBox/Client'
import SectionBannerStarOnGitHub from '../components/Section/Banner/StarOnGitHub'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import NotificationBar from '../components/NotificationBar'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import { useRouter } from 'next/router'
import { TableCustomers } from '../components'

const DashboardPage = () => {
  const router = useRouter()
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Maand-overzicht" main>
          <Button
            target="_blank"
            icon={mdiClockPlus}
            label="Nieuwe sessie starten"
            color="contrast"
            roundedFull
            small
            onClick={() => router.push('/work_sessions/create')}
          />
        </SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="vandaag: 12 taken afgerond"
            trendType="up"
            trendColor="success"
            icon={mdiListBox}
            iconColor="success"
            number={512}
            label="Taken afgerond"
          />
          <CardBoxWidget
            trendLabel="vandaag: 16 uur gewerkt"
            trendType="up"
            trendColor="success"
            icon={mdiClockOutline}
            iconColor="info"
            number={7770}
            label="Uren gewerkt"
          />
          <CardBoxWidget
            trendLabel="vandaag: €50 verdiend"
            trendType="up"
            trendColor="success"
            icon={mdiBank}
            iconColor="danger"
            number={256}
            numberPrefix="€"
            label="Te factureren"
          />
        </div>

        <SectionTitleLineWithButton icon={mdiChartPie} title="Project Statistieken">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Klanten" />

        <CardBox hasTable>
          <TableCustomers />
        </CardBox>
      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
