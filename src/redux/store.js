const { configureStore } = require("@reduxjs/toolkit");
import AuthSlice from "./slices/authSlice";
import ChatSlice from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    chatSlice: ChatSlice,
  },
});

export default store;
