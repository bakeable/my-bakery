import React from 'react'

type Props = {
  value: number | string
  duration?: number
  prefix?: string
  suffix?: string
}

const NumberDynamic = ({ prefix = '', suffix = '', value }: Props) => {
  return (
    <div>
      {prefix}
      {value}
      {suffix}
    </div>
  )
}

export default NumberDynamic
