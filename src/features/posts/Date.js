import React from 'react'
import { ISOtoDDMMYY } from '../../utility/util'

export const DateComponent = ({ date }) => {
  return (
    <div>
      {ISOtoDDMMYY(date)}
    </div>
  )
}