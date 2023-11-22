// import ky from 'ky'
import ExpiryMap from 'expiry-map'
import fetch from 'isomorphic-unfetch'
import pMemoize from 'p-memoize'

import * as types from './types'
import { api } from './config'

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0]?.query,
  cache: new ExpiryMap(10000)
})

async function searchNotionImpl(
  params: types.SearchParams
): Promise<types.SearchResults> {
  return fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res
      }
      try {
        // convert non-2xx HTTP responses into errors
        // console.log(
        //   '🚀 ~ file: search-notion.ts:31 ~ .then ~ res.statusText:',
        //   res.statusText
        // )
        const error: any = new Error(res.statusText)
        error.response = res
        return Promise.reject(error)
      } catch (e) {
        // console.log('search error', e)
        return Promise.reject(e)
      }
    })
    .then((res) => res.json())
    .catch((error) => {
      // console.log('🚀 ~ file: search-notion.ts:46 ~ error:', error)
      return Promise.reject(error)
    })

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
  //   .json()
}
