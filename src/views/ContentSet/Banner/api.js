import request from 'utils/request'
import * as mutation from './mutation.gql'
import * as query from './query.gql'

const apiPath = process.env.API_ENV || 'https://api.zanquan.xyz'
const API_URL = `${apiPath}/provider/graphql`


export const banners = params =>
  request(API_URL, query.banners, {
    params
  }).then(
    ({
      banners
    }) => banners
  )

export const banner = id =>
  request(API_URL, query.banner, {
    id
  }).then(
    ({
      banner
    }) => banner
  )

export const createBanner = params =>
  request(API_URL, mutation.createBanner, {
    input: params,
  })

export const updateBanner = params =>
  request(API_URL, mutation.updateBanner, {
    input: params,
  })

export const deleteBanner = id =>
  request(API_URL, mutation.deleteBanner, {
    input: id,
  })