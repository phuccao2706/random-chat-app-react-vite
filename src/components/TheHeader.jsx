import { Button, Col, Layout, Menu, Row, theme } from "antd";
import React from "react";
import { shallow } from "zustand/shallow";
import useAuthStore from "../stores/useAuthStore";
import { logout, removeAccessToken } from "../utils";
const { Header } = Layout;
const TheHeader = () => {
  const { currentUser, setCurrentUser, setIsSignedIn } = useAuthStore(
    ({ currentUser, setCurrentUser, setIsSignedIn }) => ({
      currentUser,
      setCurrentUser,
      setIsSignedIn,
    }),
    shallow
  );

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Header className="header" style={{ background: colorPrimary }}>
      <Row justify={"space-between"}>
        <Col>
          <div className="logo" />
        </Col>

        {currentUser && (
          <Col>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{currentUser?.username}</span>
              <Button
                onClick={logout}
                size="small"
                danger
                style={{ marginLeft: 8 }}
              >
                Logout
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default TheHeader;
