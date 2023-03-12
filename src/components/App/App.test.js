import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "./App";
import store from "app/store";

test("renders the landing page", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
