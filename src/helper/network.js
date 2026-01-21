export const networkCall = async (endPoint, body, { method = "POST" } = {}) => {
  const response = await fetch(
    `https://nodejs-app-754042928988.asia-south1.run.app${endPoint}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: method == "GET" ? null : JSON.stringify(body),
    }
  );
  const unAuthorized = 401;
  if (response.status == unAuthorized) {
    window.localStorage.setItem("token", "");
  }
  const json = await response.json();
  return json;
};
