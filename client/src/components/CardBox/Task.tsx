import React from 'react'
import { Task } from '../../interfaces'
import CardBox from '.'
import PillTag from '../PillTag'

type Props = {
  task: Task
}

const CardBoxTask = (props: Props) => {

  const typeColor = () => {
    switch (props.task.priority) {
      case 0:
        return 'info'
      case 1:
        return 'warning'
      case 2:
        return 'danger'
      default:
        return 'danger'
    }
  }

  return (
    <CardBox className="mb-6 last:mb-0">
      <div className="flex flex-col md:flex-row items-center justify-between" style={{position: "relative"}}>
        <div className="flex flex-col md:flex-row items-center justify-start" >
          <div style={{position: "absolute", top: "-30px", right: "-40px"}}>
            <PillTag color={typeColor()} label={props.task.priority.toString()} />
          </div>
          <div className="text-center space-y-1 md:text-left">
            <h4 className="text-xl">{props.task.title}</h4>
            <p>{props.task.description.substring(0, 20)}...</p>
            <p className="text-gray-500 dark:text-slate-400">
              <b>{new Date(props.task.created_timestamp).toLocaleDateString("nl-NL")}</b>
            </p>
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default CardBoxTask
