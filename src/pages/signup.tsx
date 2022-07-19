import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  async function handleSubmit(event: any) {
    try {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault();

      // Get data from the form.
      const data = {
        username: event.target.username.value,
        email: event.target.nickname.value,
        avatar: event.target.avatar.value,
        password: event.target.password.value,
      };

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = "/api/signUp";

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      };

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json();
      console.log(`Is this your full name: ${result.data}`);
    } catch (error) {
      console.log(error);
    }
  }

  type Contact = {
    username: string;
    email: string;
    password: string;
  };

  return (
    <div
      dir="rtl"
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
    >
      <div className="w-full p-6 m-auto bg-white rounded-md  lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">چی گفتی؟!</h1>
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
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              pattern="[a-z0-9]{1,15}"
              required
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
              placeholder="نام کاربری"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="nickname"></label>
            <input
              type="text"
              name="nickname"
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
              placeholder="نام مستعار"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="avatar"></label>
            <input
              type="text"
              name="avatar"
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
              placeholder="لینک  آواتار"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40 border-solid border-1 border-slate-600"
              placeholder="گذرواژه"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-black border-solid border-2 border-slate-800  transition-colors duration-200 transform rounded-md hover:border-1 hover:text-black focus:outline-none focus:border-1"
            >
              ثبت نام
            </button>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              <Link
                href="/"
                className="font-medium text-cyan-600 hover:underline"
              >
                برگشت
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
