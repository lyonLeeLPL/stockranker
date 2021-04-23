// import React from "react";
// import LoginBar from "./components/LoginBar";
// import Stocks from "./components/Stocks";

// function App() {
//   return (
//     <div>
//       <LoginBar />
//       <h1><a href='/'>StockRanker</a></h1>
//       <h1>S&P 500</h1>
//       <Stocks />
//     </div>
//   );
// }

// export default App;
////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  // logout the user
  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };

  // login the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.set("username", username);
    formData.set("password", password);
    //const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "http://localhost:8000/auth/jwt/login",
      formData
    ).catch((error)=>console.log(error));
    // set the state of the user
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem("user", response.data);
    // get user profile using token

    const profile = await axios
      .get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.user}`,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  // if there's a user show the message below
  if (user) {
    return (
      <div>
        {user.name} is loggged in
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  // if there's no user, show the login form
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
