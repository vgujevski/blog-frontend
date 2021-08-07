import React from 'react'
import { ISOtoDDMMYY } from '../../utility/util'

export const Date = ({ date }) => {
  return (
    <div>
      {ISOtoDDMMYY(date)}
    </div>
  )
}