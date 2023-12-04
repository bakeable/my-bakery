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
import CardBoxCurrentTask from '../../components/CardBox/CurrentTask';
import CardBoxTask from '../../components/CardBox/Task';

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
  
  const task = {
    "id": "1", 
    "description":"Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ", 
    "created_timestamp": "2023-12-04 09:00:00", 
    "finished_timestamp": null, 
    "started_timestamp": null,
    "earned_amount": 30, 
    "project_id": 1,
    "project_name": "Administratie",
    "title": "BTW AAngifte",
    "hours": 2,
    "priority": 5,
    "status": "active" as any,
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Sessie')}</title>
      </Head>

      <SectionMain>
        <SectionTitle title="Sessie" main icon={mdiClock} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            icon={mdiClockOutline}
            iconColor="info"
            number={timeWorked}
            label="Gewerkt"
          />
          <CardBoxWidget
            icon={mdiBank}
            iconColor="danger"
            number={amountEarned}
            label="Verdiend"
          />
          <CardBoxWidget
            icon={mdiListBox}
            iconColor="success"
            number={0}
            label="Afgerond"
          />
        </div>

        <SectionTitle title="Takenlijst" main icon={mdiListBox} />

        <CardBoxCurrentTask task={task} />


        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
          <CardBoxTask task={task} />
        </div>
      </SectionMain>
    </>
  );
};

WorkSessionPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default WorkSessionPage;
