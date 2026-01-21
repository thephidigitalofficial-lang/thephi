import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    window.localStorage.setItem("token", searchParams.get("token") ?? "");
    window.close();
  }, [dispatch]);

  return <div></div>;
}

export default Index;
