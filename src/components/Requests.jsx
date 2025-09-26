/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id))
    } catch (error) {}
  };

  useEffect(() => {
      fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div className="text-white p-4 flex justify-center text-2xl font-bold">
        No requests found
      </div>
    );

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-6">
        Connection Requests
      </h2>

      {/* Requests grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-gray-800 rounded-xl shadow-lg p-4 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src={request.fromUserId.photoUrl}
                alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
              <div className="flex-1 flex flex-col">
                <p className="text-white font-semibold text-lg">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </p>
                {request.fromUserId.about && (
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {request.fromUserId.about}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-gray-400">
                    Status: {request.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    Sent: {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-success btn-sm hover:bg-green-600 transition"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error btn-sm hover:bg-red-600 transition"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
