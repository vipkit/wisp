import request from './utils/request'
import * as query from './graphql/query.gql'
import * as mutation from './graphql/mutation.gql'

const apiPath = process.env.API_ENV || 'https://api.zanquan.xyz'

const API_URL = `${apiPath}/provider/graphql`

// export const fetchItemsFromGraphql = (qry, params) =>
//   request(API_URL, qry, params).then(resp => {
//     let viewer = resp.viewer
//     return viewer[Object.keys(viewer)[0]]
//   })

// export const fetchItemFromGraphql = (qry, params) =>
//   request(API_URL, qry, params).then(resp => {
//     let viewer = resp.viewer
//     return viewer[Object.keys(viewer)[0]]
//   })

// export const initMerchant = () =>
//   request(API_URL, query.initMerchant).then(({
//     viewer
//   }) => viewer)

// export const sendCode = mobile =>
//   request(API_URL, mutation.SendCode, {
//     mobile,
//   }).then(({
//     sendCode: {
//       code
//     }
//   }) => code)


export const login = ({
        mobile,
        code,
        password
    }) =>
    request(API_URL, mutation.login, {
        input: {
            mobile,
            code,
            password,
        },
    }).then(
        ({
            login: {
                payload: {
                    token
                },
            },
        }) => token
    )
export const qiniuToken = () =>
    request(API_URL, query.qiniuToken).then(({
        qiniuToken
    }) => qiniuToken)

export const merchants = (params) =>
    request(API_URL, query.merchants, {
        params
    }).then(
        ({
            viewer: {
                merchants
            }
        }) => merchants)

export const merchantGoods = (params) =>
    request(API_URL, query.merchantGoods, {
        params
    }).then(({
        merchantGoods
    }) => merchantGoods)

export const merchantCoupons = (params) =>
    request(API_URL, query.merchantCoupons, {
        params
    }).then(({
        merchantCoupons
    }) => merchantCoupons)

export const articles = (params) =>
    request(API_URL, query.articles, {
        params
    }).then(
        ({
            articles
        }) => articles
    )