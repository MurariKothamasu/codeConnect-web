import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name : "feed",
  initialState : null,
  reducers : {
    addFeed : (state ,action)=>{
      return action.payload
    },
    removeUserFromFeed : (state , action) =>{
      const newArr = state.filter(e => e._id !== action.payload)
      return newArr
    },
    removeFeed : (state , action) =>{
      return null
    }
  }
})

export const {addFeed , removeUserFromFeed , removeFeed} = feedSlice.actions

export default feedSlice.reducer