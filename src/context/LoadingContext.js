import { createContext, useReducer } from "react";

export const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {

  const changeLoading = (isLoading, action) => {
    if (action) {
      document.querySelector("body").classList.remove("loaded");
    } else {
      document.querySelector("body").classList.add("loaded");
    }

    return action;
  };

  const [isLoading, dispatchLoading] = useReducer(changeLoading, true);

  return (
    <LoadingContext.Provider value={{ isLoading, dispatchLoading }}>
        <div className="min-loader-wrapper">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/2560px-Service_mark.svg.png"
                className="img-fluid loader"
                alt=""
            />
            <div className="loader-section ecommerce-color section-left"></div>
            <div className="loader-section ecommerce-color section-right"></div>
        </div>

        {children}
    </LoadingContext.Provider>
  );
};
