import { Button, ConfigProvider } from "antd";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Root from "./pages/Root";

function App() {
  const [count, setCount] = useState(0);
  const isSignedIn = false;

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
