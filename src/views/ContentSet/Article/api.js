import request from 'utils/request'
import * as mutation from './mutation.gql'
import * as query from './query.gql'

const apiPath = process.env.API_ENV || 'https://api.zanquan.xyz'
const API_URL = `${apiPath}/provider/graphql`


export const article = id =>
  request(API_URL, query.article, {
    id
  }).then(
    ({
      article
    }) => article
  )

export const createArticle = params =>
  request(API_URL, mutation.createArticle, {
    input: params,
  })



export const deleteArticle = params =>
  request(API_URL, mutation.deleteArticle, {
    input: params,
  })



export const updateArticle = params =>
  request(API_URL, mutation.updateArticle, {
    input: params,
  })