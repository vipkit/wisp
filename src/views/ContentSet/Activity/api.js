import request from 'utils/request'
import * as mutation from './mutation.gql'
import * as query from './query.gql'

const apiPath = process.env.API_ENV || 'https://api.zanquan.xyz'
const API_URL = `${apiPath}/provider/graphql`


export const activities = params =>
  request(API_URL, query.activities, {
    params
  }).then(
    ({
      activities
    }) => activities
  )

export const activity = id =>
  request(API_URL, query.activity, {
    id
  }).then(
    ({
      activity
    }) => activity
  )

export const createActivity = params =>
  request(API_URL, mutation.createActivity, {
    input: params,
  })

export const updateActivity = params =>
  request(API_URL, mutation.updateActivity, {
    input: params,
  })

export const deleteActivity = id =>
  request(API_URL, mutation.deleteActivity, {
    input: id,
  })