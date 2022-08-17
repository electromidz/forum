import { Navbar } from "../Navbar";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Forum = () => {
  const { data, error } = useSWR("/api/posts");
  const [selectedId, setSelectedId] = useState<any>(null);
  useEffect(() => {
    console.log("DATA -> ", data?.data);
  }, [data]);

  const svgVariant = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div dir="rtl" style={{ backgroundColor: "#f3f4f6" }}>
      <Navbar />
      <div style={{ width: 50, height: 50 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: 50,
            height: 50,
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 494.3 490.21"
            variants={svgVariant}
            initial="hidden"
            animate="visible"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <motion.path
                  d="M0,375.32H0A114.89,114.89,0,0,0,114.89,490.21h5.27A114.89,114.89,0,0,0,235.05,375.32V260.43H114.89A114.89,114.89,0,0,0,0,375.32Z"
                  fill="#b4b4c5"
                  variants={pathVariants}
                />
                <motion.path
                  d="M117.53,0h0A117.53,117.53,0,0,0,0,117.53V229.79H235.05V117.53A117.53,117.53,0,0,0,117.53,0Z"
                  fill="#ffd176"
                  variants={pathVariants}
                />
                <motion.rect
                  x="259.24"
                  y="260.43"
                  width="235.05"
                  height="229.79"
                  rx="114.89"
                  fill="#ffb640"
                  variants={pathVariants}
                />
                <motion.path
                  d="M384.59,0H259.24V120.08A109.71,109.71,0,0,0,369,229.79H494.3V109.71A109.71,109.71,0,0,0,384.59,0Z"
                  fill="#e0e0e7"
                  variants={pathVariants}
                />
              </g>
            </g>
          </motion.svg>
        </div>
      </div>
      {!data && !error && <p>Loading...</p>}
      {!data && error && <p>No profile data</p>}
      <div className="flex flex-wrap justify-center">
        {data?.data.map((e: any) => {
          return (
            <React.Fragment key={e.id}>
              <motion.div
                className="w-200 w-80 h-48 overflow-hidden p-6 m-3 border border-gray-100 rounded-xl bg-gray-50  sm:space-x-8 sm:p-8"
                style={{
                  borderRadius: "1.2rem",
                }}
                layoutId={e.id}
                onClick={() => setSelectedId(e.id)}
                animate={{
                  opacity: 1,
                }}
                initial={{
                  opacity: 0.2,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <div className="flex justify-between">
                  <Image
                    src={e?.author?.avatar}
                    alt={e?.author.name}
                    width="25"
                    height="25"
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  <p>{e?.author?.username}</p>
                </div>
                <motion.h5 className="text-red-700 truncate font-bold  text-sm">
                  {e?.title}
                </motion.h5>
                <motion.p className="text-sm mt-1">
                  {e?.content.slice(0, 150) + "..."}
                </motion.p>
                <p>{}</p>
              </motion.div>

              <AnimatePresence>
                <div
                  style={
                    {
                      // backgroundColor: "white",
                      // width: "100%",
                      // height: "100%",
                      // position: "absolute",
                      // opacity: ".6",
                    }
                  }
                >
                  {selectedId && (
                    <motion.div layoutId={selectedId} className="modal">
                      <motion.button onClick={() => setSelectedId(null)}>
                        X
                      </motion.button>
                      <motion.h5 className="text-red-700 truncate font-bold  text-sm">
                        {e.title}
                      </motion.h5>
                      <motion.p className="text-green-900	text-sm mt-1">
                        {e?.content.slice(0, 150) + "..."}
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default Forum;
