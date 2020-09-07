import { qiniuToken } from '@/api'

const TOKEN_NAME = 'zanquan_merchant_qiniu_token'

const qiniu = {
  setToken({ token, domain, expires }) {
    localStorage.setItem(
      TOKEN_NAME,
      JSON.stringify({
        token,
        domain,
        expires: +new Date() + expires * 1000,
      })
    )
  },

  getTokenFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem(TOKEN_NAME))
      // token 一分钟之后过期
      if (data.expires > +new Date() + 60 * 1000) {
        return data
      } else {
        return null
      }
    } catch (_) {
      return null
    }
  },

  getToken() {
    const data = this.getTokenFromStorage()
    if (data) {
      return Promise.resolve(data)
    } else {
      return qiniuToken().then(data => {
        this.setToken(data)
        return data
      })
    }
  },

  upload(file) {
    return this.getToken().then(({ token, domain }) => {
      return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('file', file)
        data.append('token', token)

        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://upload.qiniup.com')
        xhr.send(data)
        xhr.onload = () => {
          if (xhr.status === 200) {
            const { key } = JSON.parse(xhr.responseText)
            resolve(`https://${domain}/${key}`)
          } else {
            reject()
          }
        }
      })
    })
  },
}

export default qiniu
