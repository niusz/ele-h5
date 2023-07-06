import axios from './base'
import type { ISearchResultList } from '@/types'
export function fetchSearchData(key = '') {
    return axios.get<ISearchResultList, ISearchResultList>('home_search', {
        params: { _label_like: key },
    })
}