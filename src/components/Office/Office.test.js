import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "app/store";
import { Office } from "./Office";

describe("Office", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Office onStartClick={mockOnClick} />
      </Provider>
    );
  });

  test("renders the component", () => {
    expect(screen).toBeDefined();
  });

  test("dismisses the intro and shows the second screen", () => {
    const gotitBtn = screen.queryByTestId("gotitBtn");
    fireEvent.click(gotitBtn);
    expect(screen.queryByText(/gold/i)).toBeInTheDocument();
  });

  test("fires the onStartClick method when start button is clicked", () => {
    const startBtn = screen.queryByTestId("startBtn");
    fireEvent.click(startBtn);
    expect(mockOnClick).toBeCalled();
  });
});
