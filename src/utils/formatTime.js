import { format } from 'date-fns'

export const formatDate = (date, fmt = 'yyyy-mm-dd HH:mm:ss') => {
  return format(date, fmt)
}
