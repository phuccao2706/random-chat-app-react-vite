import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import React from "react";
import { shallow } from "zustand/shallow";

import { MUTATION_LOGIN } from "../graphql/gql";

import useAuthStore from "../stores/useAuthStore";
import { setAccessToken } from "../utils";

const Login = () => {
  const { setIsSignedIn, setCurrentUser } = useAuthStore(
    ({ setIsSignedIn, setCurrentUser }) => ({ setIsSignedIn, setCurrentUser }),
    shallow
  );

  const [login, { loading }] = useMutation(MUTATION_LOGIN, {
    onCompleted: ({ login }) => {
      setAccessToken(login.token);
      setIsSignedIn(true);
    },
  });

  const onFinish = ({ username, password }) => {
    login({
      variables: {
        username,
        password,
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <img src="https://cdn.filestackcontent.com/SqdyvbBASqm0XV4hmrg5" />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 32 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          minWidth: "500px",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
