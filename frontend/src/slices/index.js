import { combineReducers } from 'redux'

// import postsReducer from './posts'
// import postReducer from './post'
// import commentsReducer from './comments'
import chatsReducer from './chats'

const rootReducer = combineReducers({
  // posts: postsReducer,
  // comments: commentsReducer,
  // post: postReducer,
  chats: chatsReducer
})

export default rootReducer
