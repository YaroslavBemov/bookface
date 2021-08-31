import { createSlice } from '@reduxjs/toolkit'
import ChatService from '../services/ChatService'

export const initialState = {
  loading: false,
  hasErrors: false,
  chats: []
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChats: state => {
      state.loading = true
    },
    getChatsSuccess: (state, { payload }) => {
      state.chats = payload
      state.loading = false
      state.hasErrors = false
    },
    getChatsFailure: state => {
      state.loading = false
      state.hasErrors = true
    }
  }
})

export const { getChats, getChatsSuccess, getChatsFailure } = chatsSlice.actions
export const chatsSelector = state => state.chats
export default chatsSlice.reducer

export function fetchChats (userId) {
  return async dispatch => {
    dispatch(getChats())

    try {
      const response = await ChatService.getChats(userId)
      const chats = await response.data.chats
      console.log(chats)

      dispatch(getChatsSuccess(chats))
    } catch (error) {
      dispatch(getChatsFailure())
    }
  }
}
