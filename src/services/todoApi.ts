import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

type RootState = any

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
type TodoResponse = Todo[]
const baseUrl = "https://jsonplaceholder.typicode.com/";

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const todoApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (build) => ({
    getTodos: build.query({
      query: (params): any => params.start !== undefined && params.limit !== undefined ? `todos?_start=${params.start}&_limit=${params.limit}`:'todos',
      
    }),
    addTodo: build.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `todos`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  util: { getRunningQueriesThunk },
} = todoApi;

export const { getTodos,addTodo } = todoApi.endpoints;
