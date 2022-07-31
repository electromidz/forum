import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/router";
import useSWR from "swr";

function CreatePost() {
  const router = useRouter();
  //TODO: implement function for create on post
  const { data, error } = useSWR("/api/categorie");
  useEffect(() => {
    console.log("Data ->", data?.data);
  }, [data]);

  async function handleSubmit(event: any) {
    try {
      // Get data from the form.
      let username = localStorage.getItem("username");
      const data = {
        title: event.target.title.value,
        content: event.target.content.value,
        username,
        category: event.target.category.value,
      };

      const JSONdata = JSON.stringify(data);
      console.log(JSONdata);
      const endpoint = "/api/createPost";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, option);
      // FIXME: fix this status dont redirect page to forum
      console.log("response", response.status);
      response.status ? router.push("/forum") : null;
    } catch (error) {}
  }

  return (
    <div dir="rtl">
      <Navbar />
      <div
        dir="rtl"
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
      >
        <div className="w-full p-6 m-auto bg-white rounded-md  lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center">
            می خوای چی بگی؟
          </h1>
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
              <label htmlFor="category"></label>
              <input
                type="text"
                name="category"
                // pattern="[a-z0-9]{1,15}"
                required
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
                placeholder="ایجاد عنوان جدید"
              />
            </div>
            {data && (
              <select className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600">
                <option className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600">
                  می تونی از اینا هم انتخاب کنی!
                </option>
                {data?.data.map((e: any) => {
                  return (
                    <option
                      key={e.id}
                      className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
                    >
                      {e?.slug.toString()}
                    </option>
                  );
                })}
              </select>
            )}
            <div className="mb-2">
              <label htmlFor="username"></label>
              <input
                type="text"
                name="title"
                // pattern="[a-z0-9]{1,15}"
                required
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
                placeholder="عنوان پست"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="content"></label>
              <textarea
                name="content"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
                placeholder="محتوا"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-black border-solid border-2 border-slate-800  transition-colors duration-200 transform rounded-md hover:border-1 hover:text-black focus:outline-none focus:border-1"
              >
                ارسال پست
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
