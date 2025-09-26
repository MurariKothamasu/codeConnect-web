import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setError("");
    } catch (error) {
      setError(error.response?.data || "Something Went Wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-10 flex-wrap">
        {/* Edit Profile Panel */}
        <div className="bg-base-200 shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full mb-2"
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full mb-2"
          />

          <label className="label">About</label>
          <textarea
            name="about"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered w-full mb-2 resize-none"
            rows="5"
          ></textarea>

          <label className="label">Age</label>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full mb-2"
          />

          <label className="label">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="label">Profile Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            placeholder="Profile Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full mb-4"
          />

          {success && (
            <p className="text-green-400 mb-2 text-center">{success}</p>
          )}
          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={saveProfile}
          >
            Save
          </button>
        </div>

        {/* UserCard Preview */}
        <div className="w-full max-w-sm">
          <UserCard
            user={{ firstName, lastName, age, gender, photoUrl, about }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
