import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
let timer;
function Main({ tools }) {
  const { user } = useLoaderData();
  const [showMessage, setShowMessage] = useState(false);
  function checkAuth() {
    if (timer) clearTimeout(timer);
    if (!user) {
      setShowMessage(true);
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }
  return (
    <main>
      <h1 className="text-xl font-bold">Annotation Tools </h1>
      {/* {!user && showMessage && ( */}
      <div
        className="toast toast-start capitalize"
        style={{
          position: "fixed",
          bottom: 0,
          justifyContent: "center",
          transition: "all 0.3s ease-in-out",
          alignItems: "center",
          height: "50px",
          zIndex: 1000,
          transform: !showMessage ? "translateY(110%)" : "translateY(0)",
        }}
      >
        <div className="alert alert-info">
          Login by
          <Form
            action="/auth/auth0"
            className="px-6 sm:px-0 max-w-sm"
            method="post"
          >
            <button
              type="submit"
              className="link text-red-700 hover:text-black animate-pulse"
            >
              clicking here !!
            </button>
          </Form>
        </div>
      </div>
      {/* )} */}
      <section>
        <div className="mx-auto grid lg:grid-cols-4 md:grid-cols-3 gap-5 px-[20px]">
          {tools.map((list) => {
            return (
              <div onClick={checkAuth} className=" rounded-lg" key={list.name}>
                <Tool list={list} key={list.name} />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Tool({ list }) {
  let { user } = useLoaderData();
  let navigate = useNavigate();
  let handleClick = () => {
    if (list.url) {
      if (user) navigate("/tool/" + list.name.replace(" ", "_"));
    }
    if (!list.url) {
      alert("you are not assigned to this tool");
    }
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={`${user && "cursor-pointer"} text-center w-full `}
      >
        <div className="  w-full bg-white shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="hidden md:block">
            <div
              className="p-2 rounded bg-transparent bg-no-repeat bg-center bg-contain mb-2 mx-auto grid place-items-center h-[110px] w-[110px]"
              style={{ backgroundImage: `url("${list?.ICON}")` }}
            ></div>
          </div>
          <div className="px-[2vw] py-4 uppercase text-center">
            {list.name.replaceAll("_", " ")}
          </div>
        </div>
      </div>
      {list.demo && (
        <Link
          to={"/demo/" + list.name}
          className="uppercase text-sm text-gray-400 font-light hover:text-black bg-white px-2 "
        >
          demo
        </Link>
      )}
    </>
  );
}

export default Main;
