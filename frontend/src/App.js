import React from "react";
import Drawer from "./Drawer";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "center",
        justifyContent: "center",
      }}
    >
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      />
    </div>
  );
};

export default App;
