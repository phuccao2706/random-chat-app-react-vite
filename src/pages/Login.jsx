import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import React from "react";
import { shallow } from "zustand/shallow";

import { MUTATION_LOGIN } from "../graphql/gql";

import useAuthStore from "../stores/useAuthStore";

const Login = () => {
  const [login, { data, loading, error }] = useMutation(MUTATION_LOGIN);

  const { setIsSignedIn } = useAuthStore(
    (state) => ({ setIsSignedIn: state.setIsSignedIn }),
    shallow
  );

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
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
