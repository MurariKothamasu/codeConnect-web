/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlicle";
const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skils, _id } =
    user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, UserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + UserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(UserId));
    } catch (error) {}
  };

  return (
    <div className="card bg-base-300 w-96 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 my-10">
      <figure className="relative h-110 w-full overflow-hidden">
        <img
          src={user.photoUrl}
          alt="photo"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white px-3 py-1 rounded-tr-lg">
          {age && gender && `${age}, ${gender}`}
        </div>
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title justify-center text-xl font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-500 mt-2">{user.about}</p>
        <div className="card-actions justify-center mt-4 gap-4">
          <button
            className="btn btn-outline btn-error"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("intrested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
