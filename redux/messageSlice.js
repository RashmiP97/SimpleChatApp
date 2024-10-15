import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    },
    editMessage: (state, action) => {
      const index = state.messages.findIndex((message) => message.id === action.payload.id);
      if (index !== -1) {
        state.messages[index].text = action.payload.text;
      }
    },
    addReply: (state, action) => {
      const message = state.messages.find((msg) => msg.id === action.payload.messageId);
      if (message) {
        if (!message.replies) {
          message.replies = []; // Initialize replies if not present
        }
        message.replies.push(action.payload.reply);
      }
    },
  },
});

export const { addMessage, deleteMessage, editMessage, addReply } = messageSlice.actions;
export default messageSlice.reducer;
