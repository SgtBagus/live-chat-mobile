import { createContext, useReducer } from "react";

export const ChatBotContext = createContext();

export const ChatBotContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const ChatBoxReducer = (state, action) => {
    switch (action.type) {
      case "SET_DEFAULT_USER":
        return {
          chatId: action.payload.chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ChatBoxReducer, INITIAL_STATE);

  return (
    <ChatBotContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatBotContext.Provider>
  );
};
