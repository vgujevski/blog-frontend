import { format } from 'date-fns'

export const ISOtoDDMMYY = (ISOdate) => {
  const date = new Date(ISOdate)
  return format(date, 'dd LLLL yyyy')
}

// export const sortByDateDesc = () => {

// }