/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlicle";
import UserCard from "./UserCard";
const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed" ,{withCredentials : true});
      dispatch(addFeed(res.data));
    } catch (error) {}
  };


  useEffect(()=>{
      getFeed()
  } ,[])

  if(!feed) return 
  if(feed.length <=  0){
    return <h2 className="flex justify-center mt-10 font-bold text-2xl">No More Users Are available</h2>
  }

  return feed && <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
  </div>;
};

export default Feed;
