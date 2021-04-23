import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function LoginBar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  function handleLogin(e) {
    const loginUrl = "http://localhost:8000/auth/jwt/login";
    e.preventDefault();
    var formData = new FormData();
    formData.set("username", email);
    formData.set("password", password);

    fetch(loginUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          const localUser = fetch("http://localhost:8000/users/me", {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          });
          setUser(localUser);
          console.log(this.state.localUser === user);
          console.log(user);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleRegister(e) {
    const registerUrl = "http://localhost:8000/auth/register";
    e.preventDefault();
    const registerData = JSON.stringify({
      email: email,
      password: password,
    });

    fetch(registerUrl, {
      method: "POST",
      body: registerData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", data);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <form autoComplete="off">
      <div>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} type="button" variant="contained">
          Login
        </Button>
        <Button onClick={handleRegister} type="button" variant="contained">
          Signup
        </Button>
      </div>
    </form>
  );
}
