import { Form, Link, useLoaderData } from "@remix-run/react";
import React from "react";
import Login from "./Login";

function Header() {
  const { user } = useLoaderData();

  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="title">Pecha Tools</h1>
      </Link>
      <nav className="nav">
        {user?.picture && (
          <img
            src={user.picture}
            title={user.email}
            className="user-picture"
          ></img>
        )}
        {user ? (
          <Link to={"/logout"} className="logoutButton">
            Logout
          </Link>
        ) : (
          <Login />
        )}
      </nav>
    </header>
  );
}

export default Header;
