import { mdiImageCheck, mdiImageEdit, mdiImageLock } from '@mdi/js'
import React from 'react'
import { Task } from '../../interfaces'
import CardBox from '.'
import IconRounded from '../Icon/Rounded'
import { Field, Form, Formik } from 'formik'
import FormCheckRadio from '../Form/CheckRadio'
import FormCheckRadioGroup from '../Form/CheckRadioGroup'
import FormField from '../Form/Field'

type Props = {
  task: Task
}

const CardBoxCurrentTask = (props: Props) => {
  // const icon = {
  //   concept: mdiImageEdit,
  //   active: mdiImageLock,
  //   done: mdiImageCheck,
  // }[props.task.status]

  // const typeColor = () => {
  //   switch (props.task.status) {
  //     case 'concept':
  //       return 'info'
  //     case 'active':
  //       return 'warning'
  //     case 'done':
  //       return 'success'
  //   }
  // }

  return (
    <CardBox className="mb-6 last:mb-0">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          <div className="text-center space-y-1 md:text-left md:mr-6">
            <h4 className="text-xl">{props.task.title}</h4>
            <p>{props.task.description}</p>
            <p className="text-gray-500 dark:text-slate-400">
              <b>{new Date(props.task.created_timestamp).toLocaleDateString()}</b> - {props.task.project_name}
            </p>
          </div>
        </div>
        <div className="text-center md:text-right space-y-5">
          <Formik
            initialValues={{ switches: ['lorem']}}
            onSubmit={() => null}
          >
            <Form>
              <FormField>
                <FormCheckRadioGroup>
                  <FormCheckRadio type="switch">
                    <Field type="checkbox" name="switches" value="lorem" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>
            </Form>
          </Formik>
        </div>
      </div>
    </CardBox>
  )
}

export default CardBoxCurrentTask
