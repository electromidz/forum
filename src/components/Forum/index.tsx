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
                className="w-200 shadow-md bg-green-400	 w-80 h-44 overflow-hidden p-4 m-4 rounded"
                layoutId={e.id}
                onClick={() => setSelectedId(e.id)}
                key={e.id}
              >
                <motion.h5 className="text-red-700 truncate font-bold  text-sm">
                  {e?.title}
                </motion.h5>
                <motion.p className="text-green-900	text-sm mt-1">
                  {e?.content.slice(0, 150) + "..."}
                </motion.p>
              </motion.div>

              <AnimatePresence>
                {selectedId && (
                  <motion.div
                    layoutId={selectedId}
                    className="bg-green-50"
                    style={{
                      position: "absolute",
                      top: "50%",
                      width: "40%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <motion.h5 className="text-red-700 truncate font-bold  text-sm">
                      {e.title}
                    </motion.h5>
                    <motion.p className="text-green-900	text-sm mt-1">
                      {e.content}
                    </motion.p>
                    <motion.button onClick={() => setSelectedId(null)}>
                      exit
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Forum;
