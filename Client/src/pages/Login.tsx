import { useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import InputType from "../components/shared/InputType";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login]=useLoginMutation()
  const navigate=useNavigate()

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const{user}= await signInWithPopup(auth, provider);
      const res= await login({
        name:user.displayName!,
        email:user.email!,
        photo:user.photoURL!,
        gender,
        role:"user",
        dob:date,
        _id:user.uid,
        
      })

      if ("data" in res) {
        navigate("/")
        window.location.reload();
        toast.success(res.data.message)
        
      } else {
        const error=res.error as FetchBaseQueryError
        const errRes=error.data as MessageResponse
        toast.error(errRes.message)
      }
      
    } catch (error) {
      toast.error("Sign in Fail");
    }
  };
  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome Back
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <InputType
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            name="date"
            label="Date of Birth"
            labelFor="date"
          />

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Sign in Once
          </p>
          <div>
            <button
              onClick={loginHandler}
              className="flex w-full justify-center items-center space-x-3 rounded-md bg-white p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 border border-gray-300"
            >
              <FcGoogle className="h-6 w-6" />
              <span className="text-black">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
