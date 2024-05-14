import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
