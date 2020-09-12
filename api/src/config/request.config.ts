import { SortType } from "../constant/sort.constant";

export interface RequestConfig {
    paging: PagingConfig,
    sorting: SortingConfig,
    Filters: { [key: string]: any }
}

export interface PagingConfig {
    page: number,
    perPage: number
}

export interface SortingConfig {
    sortBy: string,
    sortOrder: SortType
}

export enum ParmTypes {
    Body = 'body',
    Request = 'request',
    Response = 'response',
    Query = 'query'
}

export interface ParmValues {
    Body?: Function,
    Request?: Function,
    Response?: Function,
    Query?: Function
}