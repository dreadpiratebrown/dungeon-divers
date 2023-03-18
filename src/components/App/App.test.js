import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "./App";
import store from "app/store";

describe("App", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("renders the landing page", () => {
    expect(screen).toBeDefined();
  });

  test("renders the start menu", () => {
    const startMenu = screen.queryByTestId("startMenu");
    expect(startMenu).toBeInTheDocument();
  });

  test("renders the office screen", () => {
    const startBtn = screen.queryByTestId("startBtn");
    fireEvent.click(startBtn);
    const office = screen.queryByTestId("office");
    expect(office).toBeInTheDocument();
  });
});
