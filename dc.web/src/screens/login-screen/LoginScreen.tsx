import { useState } from "react";
import { getUserInfo, login } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import { Button, Col, Row, Stack } from "react-bootstrap";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, saveUser, logout } = useAuth();


  if (user) {
    return (
      <div>
        You are already logged in
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login({ username, password });

      if (response.status === 200) {
        let { access_token } = response.data;
        const userInfoResponse = await getUserInfo(access_token);
        const userInfo = { ...userInfoResponse.data, access_token };
        console.log(userInfo);
        saveUser(userInfo);
      } else if (response.status === 401) {
        throw new Error("Invalid username or password");
      } else {
        throw new Error("There was an error logging in");
      }
    } catch (error) {
      console.error(error);
      alert(error)
    }
  };

  return (
    <Row>
      <h1>Login</h1>
      <Col>
        <form onSubmit={onSubmit}>
          <Stack gap={2} className="col-md-5 mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <div className="col-md-2 mx-auto">
            <Button type="submit">Login</Button>
          </div>
          </Stack>
        </form>
      </Col>
    </Row>
  );
};
