import React, { useState } from "react";
import Link from "next/link";
import party from "party-js";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type Result = {
  hasError: boolean;
  message: string;
  username: string;
};
type TProps = {
  setLoggedIn: (arg: boolean) => void;
};
const Login = ({ setLoggedIn }: TProps) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      const data = {
        username: event.target.username.value,
        password: event.target.password.value,
      };
      const JSONdata = JSON.stringify(data);
      const endpoint = "/api/session";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      if (response.status == 200) {
        let result: Result = await response.json();
        localStorage.setItem("username", result.username);
        party.confetti(event.target, {
          shapes: ["star", "roundedSquare"],
          count: party.variation.range(20, 40),
        });
        router.push("/");
      } else if (response.status == 401) {
        setMessage(
          "ایمیل و یا رمز ورود خود را اشتباه وارد کردی کسی چه میدونه! 🎃"
        );
      } else {
        setMessage(
          "سرویس مورد نظر شما در حال حاضر در دسترس نمی باشد \u{1F63C}"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 2) {
      return `Usernames must be at least 2 characters long`;
    }
  }

  function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 5) {
      return `Passwords must be at least 5 characters long`;
    }
  }

  function submitHandler() {}
  return (
    <div
      dir="rtl"
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
    >
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
        }}
        initial={{
          y: "100vh",
          opacity: 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
        }}
        className="absolute h-full w-full p-6 m-auto bg-[#e1e4e8] rounded-3xl  lg:max-w-xl"
        style={{ top: "25%", left: 0, right: 0 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: 70,
          }}
        >
          <h1 className="text-3xl font-semibold text-center">چی گفتی؟! 🤔</h1>
        </div>
        <form
          className="mt-6"
          onSubmit={async (contact: any) => {
            try {
              await handleSubmit(contact);
            } catch (error) {
              console.log(error);
            }
          }}
          method="POST"
        >
          <div className="mb-2">
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-slate-700 focus:bg-slate focus:border-spacing-y-9 "
              style={{
                borderBottom: "1px solid #64666c",
                background: "none",
              }}
              placeholder="نام کاربری"
              name="username"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-slate-700 "
              placeholder="گذرواژه"
              name="password"
              style={{
                borderBottom: "1px solid #64666c",
                background: "none",
              }}
            />
          </div>
          <p className="text-xs hover:underline mt-5">
            <Link href="#">فراموشی رمز عبور؟</Link>
          </p>
          <p className="mt-2 text-xs text-rose-500 font-normal">{message}</p>
          <div className="mt-6">
            <button
              type="submit"
              onClick={() => submitHandler()}
              className="w-full px-4 py-2 tracking-wide text-black border-solid border-2 border-slate-800  transition-colors duration-200 transform rounded-md hover:border-1 hover:text-black focus:outline-none focus:border-1"
              style={{ backgroundColor: "#0E0E10", color: "#E1E4E8" }}
            >
              ورود 👋
            </button>
          </div>
        </form>

        <p
          onClick={() => setLoggedIn(true)}
          className="mt-8 text-xs font-light text-center text-gray-700"
        >
          اکانت برای ورود ندارید؟
          {/* <Link
            href="/signup"
            className="font-medium text-cyan-600 hover:underline"
          > */}
          ساخت اکانت جدید
          {/* </Link> */}
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
