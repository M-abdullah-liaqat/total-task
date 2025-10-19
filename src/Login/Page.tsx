import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
interface Props {}
type Inputs = {
  username: string;
  email: string;
  password: string;
};
const LoginPage = (props: Props) => {
  const navigate = useNavigate();

  const [ISAccount, setISAccount] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSignup: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const response = (await fetch("https://total-task-backend.onrender.com/user", {
      method: "POST",
      credentials: "include", // ✅ this is required

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())) as { status: number; message: string };
    if (response.status === 200) {
      setISAccount(true);
      toast.success(response.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const onLogin: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const response = (await fetch("https://total-task-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
      credentials: "include",
    }).then((res) => res.json())) as { status: number; message: string };
    if (response.status === 200) {
      window.location.replace("/dashboard");
    } else {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full grid grid-cols-2 bg-[#F7F5F4]">
        <div className="">
          {!ISAccount && (
            <form
              onSubmit={handleSubmit(onSignup)}
              className={` flex-col gap-1  justify-center items-center h-full  flex`}
            >
              <div className="text-3xl font-semibold py-3">
                Register at <span className="font-bold">Total Task</span>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold">Username</div>
                <input
                  {...register("username", {
                    required: { value: true, message: "Required" },
                  })}
                  className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-lg  px-2 py-1.5 justify-between items-center me-2 mb-2"
                  type="text"
                  placeholder="Enter your Username"
                />{" "}
                {errors.username && (
                  <div className="text-red-800 px-2">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold">Email</div>
                <input
                  {...register("email", {
                    required: { value: true, message: "Required" },
                  })}
                  className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-lg  px-2 py-1.5 justify-between items-center me-2 mb-2"
                  type="text"
                  placeholder="Enter your Email"
                />{" "}
                {errors.email && (
                  <div className="text-red-800 px-2">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold">Password</div>
                <input
                  {...register("password", {
                    required: { value: true, message: "Required" },
                  })}
                  className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-lg  px-2 py-1.5 justify-between items-center me-2 mb-2"
                  type="text"
                  placeholder="Set Password"
                />{" "}
                {errors.password && (
                  <div className="text-red-800 px-2">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center w-[300px]">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-xl text-white rounded-2xl cursor-pointer"
                >
                  Sign up
                </button>
                <div
                  onClick={() => setISAccount(true)}
                  className="cursor-pointer"
                >
                  Sign in
                </div>
              </div>
            </form>
          )}
          {ISAccount && (
            <form
              onSubmit={handleSubmit(onLogin)}
              className={` flex-col gap-1  justify-center items-center h-full flex`}
            >
              <div className="text-3xl font-semibold py-3">
                Login to <span className="font-bold">Total Task</span>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold">Email</div>
                <input
                  {...register("email", {
                    required: { value: true, message: "Required" },
                  })}
                  className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-lg  px-2 py-1.5 justify-between items-center me-2 mb-2"
                  type="text"
                  placeholder="Enter your Email"
                />{" "}
                {errors.email && (
                  <div className="text-red-800 px-2">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold">Password</div>
                <input
                  {...register("password", {
                    required: { value: true, message: "Required" },
                  })}
                  className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-lg  px-2 py-1.5 justify-between items-center me-2 mb-2"
                  type="text"
                  placeholder="Set Password"
                />{" "}
                {errors.password && (
                  <div className="text-red-800 px-2">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center w-[300px]">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-xl text-white rounded-2xl cursor-pointer"
                >
                  Sign in
                </button>
                <div
                  onClick={() => setISAccount(false)}
                  className="cursor-pointer"
                >
                  Don't have an account
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="bg-[#F7F5F4] flex items-center justify-center">
          <img src="LoginImage.webp" alt="" />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />{" "}
    </div>
  );
};

export default LoginPage;
