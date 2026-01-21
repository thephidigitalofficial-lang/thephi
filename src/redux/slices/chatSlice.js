import { networkCall } from "@/helper/network";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const sendChatRequest = createAsyncThunk("chat", async (payload) => {
  const response = await networkCall("/chat", payload);
  if (response?.status) return response;
  throw response?.message;
});

const { reducer, actions } = createSlice({
  name: "chat",
  initialState: {
    showChatDialog: false,
    conversationId: "",
    query: "",
    chat: {
      data: {
        messages: [],
      },
      error: null,
      loading: false,
    },
  },
  reducers: {
    showChatBox(state, { payload }) {
      return {
        ...state,
        showChatDialog: payload,
      };
    },
    updateQuery(state, { payload }) {
      return {
        ...state,
        query: payload,
      };
    },
    addUserMessage(state, { payload }) {
      return {
        ...state,
        chat: {
          ...state.chat,
          data: {
            ...state.chat.data,
            messages: state.chat.data.messages.concat([payload]) ?? [],
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatRequest.fulfilled, (state, { payload }) => {
        return {
          ...state,
          conversationId: payload?.data?.conversationId ?? "",
          chat: {
            ...state.chat,
            data: {
              messages: state.chat.data.messages.concat([
                {
                  id: Date.now() + 1,
                  text: payload?.data?.response ?? "",
                  sender: "ai",
                  isNew: true,
                },
              ]),
            },
            loading: false,
          },
        };
      })
      .addCase(sendChatRequest.rejected, (state, { error }) => {
        alert(`${error?.message}`);
        console.log(error?.message);
        return {
          ...state,
          chat: {
            ...state.chat,
            loading: false,
            error: `${error}`,
          },
        };
      })
      .addCase(sendChatRequest.pending, (state) => {
        return {
          ...state,
          chat: {
            ...state.chat,
            loading: true,
          },
        };
      });
  },
});

export const { showChatBox, addUserMessage, updateQuery } = actions;

export default reducer;
