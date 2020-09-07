import {
  TOKEN_KEY
} from '@/consts'
import {
  print
} from 'graphql/language/printer'

import {
  store
} from '../store'

class ClientError extends Error {
  constructor(response, request) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request,
    })}`
    super(message)
    this.response = response
    this.request = request
  }

  static extractMessage(response) {
    return response.errors[0].message
  }
}

export class GraphQLClient {
  constructor(url, options) {
    this.url = url
    this.options = options || {}
  }

  request(query, variables) {
    if (typeof query === 'object') {
      query = print(query)
    }
    const {
      headers,
      ...others
    } = this.options

    const body = JSON.stringify({
      query,
      variables,
    })

    const token = localStorage.getItem(TOKEN_KEY)

    return new Promise((resolve, reject) => {
      fetch(this.url, {
          body,
          method: 'POST',
          headers: Object.assign({
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            headers
          ),
          ...others,
        })
        .then(response => response.json())
        .then(result => {
          if (!result.errors) {
            resolve(result.data)
          } else {
            if (result.errors.some(error => error.code === 3005)) {
              store.dispatch('signout')
              return
            }
            reject(new ClientError(result, {
              query,
              variables
            }))
          }
        })
    })
  }

  setHeaders(headers) {
    this.options.headers = headers

    return this
  }

  setHeader(key, value) {
    const {
      headers
    } = this.options

    if (headers) {
      headers[key] = value
    } else {
      this.options.headers = {
        [key]: value
      }
    }
    return this
  }
}

export function request(url, query, variables) {
  let qs = '_n='
  let q = query.definitions[0].name.value
  if (q.includes('Mutation')) {
    qs = '_m='
  }
  if (q.includes('Query')) {
    qs = '_q='
  }
  q = q.replace('Query', '')
  q = q
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()
  const client = new GraphQLClient(`${url}?${qs}${q}`)
  return client.request(query, variables)
}

export default request