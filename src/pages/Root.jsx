import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAuthStore from "../stores/useAuthStore";
import { shallow } from "zustand/shallow";
import { useQuery } from "@apollo/client";
import { QUERY_GET_CURRENT_USER } from "../graphql/gql";
import { logout, removeAccessToken } from "../utils";
import React from "react";
import TheHeader from "../components/TheHeader";
const { Header, Content, Sider } = Layout;

export default function Root() {
  const { setIsSignedIn, setCurrentUser } = useAuthStore(
    ({ setIsSignedIn, setCurrentUser }) => ({ setIsSignedIn, setCurrentUser }),
    shallow
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );

  useQuery(QUERY_GET_CURRENT_USER, {
    onCompleted: ({ findByToken }) => {
      setCurrentUser(findByToken);
      setIsSignedIn(true);
    },
    onError: () => {
      console.log("a");
      logout();
    },
  });

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <TheHeader />

        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
