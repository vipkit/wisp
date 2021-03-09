import request from '@/utils/request'
import * as query from './query.gql'

const apiPath = process.env.API_ENV || 'https://api.vipkit.net'
const API_URL = `${apiPath}/provider/graphql`

export const members = params =>
  request(API_URL, query.members, params).then(({ members }) => members)
