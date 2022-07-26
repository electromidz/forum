import { Navbar } from "../Navbar";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

const Forum = () => {
  const { data, error } = useSWR("/api/posts");
  const [selectedId, setSelectedId] = useState<any>(null);

  return (
    <div dir="rtl">
      <Navbar />
      {!data && !error && <p>Loading...</p>}
      {!data && error && <p>No profile data</p>}
      <div className="flex flex-wrap">
        {data?.data.map((e: any) => {
          return (
            <>
              <motion.div
                className="w-200 shadow-md w-80 h-44 overflow-hidden p-4 m-4 rounded"
                layoutId={e.id}
                onClick={() => setSelectedId(e.id)}
                key={e.id}
              >
                <motion.h5 className="text-red-700 truncate font-bold  text-sm">
                  {e?.title}
                </motion.h5>
                <motion.p className="text-sm mt-1">
                  {e?.content.slice(0, 150) + "..."}
                </motion.p>
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
                        {e.content}
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Forum;
