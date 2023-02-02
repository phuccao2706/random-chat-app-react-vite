import { Button, ConfigProvider } from "antd";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <div>
        <Button type="primary">a</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;
