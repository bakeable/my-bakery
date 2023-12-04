import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ReactElement } from 'react';
import LayoutAuthenticated from '../../layouts/Authenticated';
import {
  SectionMain,
  SectionTitle,
} from '../../components';
import { getPageTitle } from '../../config';
import { api } from '../../api';
import CardBoxWidget from '../../components/CardBox/Widget';
import { WorkSession } from '../../interfaces';
import { mdiClockOutline, mdiListBox, mdiBank, mdiClock } from '@mdi/js';

const WorkSessionPage = () => {
  const router = useRouter();
  const { workSessionId } = router.query as { workSessionId: string };

  // Define state to hold the workSession data
  const [workSession, setWorkSession] = useState<Partial<WorkSession>>({});
  const [timeWorked, setTimeWorked] = useState("00:00:00");
  const [amountEarned, setAmountEarned] = useState("0");

  // Use useEffect to fetch the workSession data when workSessionId changes
  useEffect(() => {
    if (workSessionId) {
      // Call your async function to get the workSession by workSessionId
      api.getWorkSession(workSessionId).then((workSession) => {
        // Set the workSession data in state
        setWorkSession(workSession);
      });
    }
  }, [workSessionId]);

  useEffect(() => {
    let intervalId;
    console.log(workSession.started_timestamp)
    if (workSession.started_timestamp) {
      const startTime = new Date(workSession.started_timestamp).getTime();
  
      intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedMilliseconds = currentTime - startTime;
  
        const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor((elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const elapsedSeconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);
  
        const formattedTime = new Date(0);
        formattedTime.setHours(elapsedHours, elapsedMinutes, elapsedSeconds);

        setTimeWorked(formattedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setAmountEarned(((elapsedMilliseconds / 1000 / 60 / 60) * 75).toLocaleString('nl-NL', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' }));
      }, 1000); // Update every second
    }
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [workSession.started_timestamp]);
  

  return (
    <>
      <Head>
        <title>{getPageTitle('Sessie')}</title>
      </Head>

      <SectionMain>
        <SectionTitle title="Sessie" main icon={mdiClock} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel={`Totaal: ${timeWorked} gewerkt`}
            trendType="info"
            trendColor="success"
            icon={mdiClockOutline}
            iconColor="info"
            number={timeWorked}
            label="Gewerkt"
          />
          <CardBoxWidget
            trendLabel={`Totaal: ${amountEarned} verdiend`}
            trendType="up"
            trendColor="success"
            icon={mdiBank}
            iconColor="danger"
            number={amountEarned}
            label="Verdiend"
          />
          <CardBoxWidget
            trendLabel={`Totaal: 100 taken afgerond`}
            trendType="up"
            trendColor="success"
            icon={mdiListBox}
            iconColor="success"
            number={0}
            label="Afgerond"
          />
        </div>
      </SectionMain>
    </>
  );
};

WorkSessionPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default WorkSessionPage;
