import {musicXhr as xhr} from '@/utils/xhr'

export const getSearch = (QQKeywords) => xhr.get(`/qq-api/api/search_by_key?key=${QQKeywords}`)