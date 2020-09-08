import request from 'utils/request'
import * as mutation from './mutation.gql'
import * as query from './query.gql'

const apiPath = process.env.API_ENV || 'https://api.zanquan.xyz'
const API_URL = `${apiPath}/provider/graphql`

export const memberBgImage = () =>
  request(API_URL, query.memberBgImage).then(
    ({ viewer: { memberBgImage } }) => memberBgImage
  )

export const setMemberBgImage = params =>
  request(API_URL, mutation.setMemberBgImage, {
    input: params,
  })
