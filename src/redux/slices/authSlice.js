import { networkCall } from "@/helper/network";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchProfileDetails = createAsyncThunk(
  "auth/fetchProfileDetails",
  async (payload) => {
    const response = await networkCall("/auth/fetchProfileDetails", payload);
    if (response?.status) return response;
    throw response?.message;
  }
);

const { reducer, actions } = createSlice({
  name: "auth",
  initialState: {
    showAuthDialog: false,
    login: {
      data: {},
      error: null,
      loading: false,
    },
    userData: {
      data: {},
      error: null,
      loading: false,
    },
  },
  reducers: {
    showAuthDialog(state, { payload }) {
      return {
        ...state,
        showAuthDialog: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetails.fulfilled, (state, { payload }) => {
        return {
          ...state,
          userData: {
            ...state.userData,
            data: payload?.data ?? {},
            loading: false,
          },
        };
      })
      .addCase(fetchProfileDetails.rejected, (state, { error }) => {
        alert(`${error?.message}`);
        console.log(error?.message);
        return {
          ...state,
          userData: {
            ...state.userData,
            error: `${error}`,
          },
        };
      })
      .addCase(fetchProfileDetails.pending, (state) => {
        return {
          ...state,
          userData: {
            ...state.userData,
            loading: true,
          },
        };
      });
  },
});

export const { showAuthDialog } = actions;

export default reducer;
