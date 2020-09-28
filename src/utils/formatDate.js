import { format } from 'date-fns'

export default (date, fmt = 'yyyy-mm-dd HH:mm:ss') => {
  return format(date, fmt)
}
