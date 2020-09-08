import request from 'utils/request'
import * as mutation from './mutation.gql'
import * as query from './query.gql'

const apiPath = process.env.API_ENV || 'https://api.zanquan.xyz'
const API_URL = `${apiPath}/provider/graphql`

export const articlreEntries = params =>
  request(API_URL, query.articlreEntries, params).then(
    ({ articlreEntries }) => articlreEntries
  )

export const articleEntry = id =>
  request(API_URL, query.articleEntry, {
    id,
  }).then(({ articleEntry }) => articleEntry)

export const createArticleEntry = params =>
  request(API_URL, mutation.createArticleEntry, {
    input: params,
  })

export const editArticleEntry = params =>
  request(API_URL, mutation.editArticleEntry, {
    input: params,
  })

export const deleteArticleEntry = id =>
  request(API_URL, mutation.deleteArticleEntry, {
    input: id,
  })

export const sortArticleEntry = params =>
  request(API_URL, mutation.sortArticleEntry, {
    input: params,
  })
