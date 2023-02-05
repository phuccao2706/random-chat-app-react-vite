import { Button, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { shallow } from "zustand/shallow";
import reactLogo from "./assets/react.svg";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Root from "./pages/Root";
import useAuthStore from "./stores/useAuthStore";
import { isLoggedIn } from "./utils";

function App() {
  const { setIsSignedIn, isSignedIn } = useAuthStore(
    (state) => ({
      setIsSignedIn: state.setIsSignedIn,
      isSignedIn: state.isSignedIn,
    }),
    shallow
  );

  console.log(isSignedIn);

  useEffect(() => {
    setIsSignedIn(isLoggedIn());
  }, []);

  const router = createBrowserRouter([
    {
      path: "login",
      element: (
        <Protected publicRoute={true} isSignedIn={isSignedIn}>
          <Login />
        </Protected>
      ),
    },
    {
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Protected isSignedIn={isSignedIn}>
              <Dashboard />
            </Protected>
          ),
        },
        {
          path: "contacts/:contactId",
          element: (
            <Protected isSignedIn={isSignedIn}>
              <Contact />
            </Protected>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
