import { createContext, useReducer } from "react";

export const ChatBoxContext = createContext();

export const ChatBoxContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const ChatBoxReducer = (state, action) => {
    switch (action.type) {
      case "SET_DEFAULT_USER":
        return {
          user: action.payload.user,
          chatId: action.payload.chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ChatBoxReducer, INITIAL_STATE);

  return (
    <ChatBoxContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatBoxContext.Provider>
  );
};
