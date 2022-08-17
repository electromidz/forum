import React, { useState } from "react";
import Link from "next/link";
import party from "party-js";
import { useRouter } from "next/router";
import Login from "./Login";
import SignUp from "./SignUp";
import { motion, AnimatePresence } from "framer-motion";

type Result = {
  hasError: boolean;
  message: string;
  username: string;
};

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <AnimatePresence>
      <motion.div
        dir="rtl"
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
      >
        {!loggedIn ? (
          <Login setLoggedIn={setLoggedIn} />
        ) : (
          <SignUp setLoggedIn={setLoggedIn} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;
