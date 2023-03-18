import { fireEvent, render, screen } from "@testing-library/react";
import { StartMenu } from "./StartMenu";

test("renders the start menu", () => {
  render(<StartMenu />);
});

const storage = require("app/storage");

test("renders the Continue Game button when there is a saved game", () => {
  const mockLoad = jest
    .spyOn(storage, "loadState")
    .mockReturnValue({ game: true });
  render(<StartMenu />);
  const continueButton = screen.queryByText(/Continue Game/i);
  expect(continueButton).toBeInTheDocument();
});

test("fires the onStartClick method when New Game button is clicked", () => {
  const mockOnClick = jest.fn();
  render(<StartMenu onStartClick={mockOnClick} />);
  const startBtn = screen.queryByTestId("startBtn");
  fireEvent.click(startBtn);
  expect(mockOnClick).toBeCalled();
});

test("fires the onLoadClick method when Continue Game button is clicked", () => {
  const mockLoad = jest
    .spyOn(storage, "loadState")
    .mockReturnValue({ game: true });
  const mockOnClick = jest.fn();
  render(<StartMenu onLoadClick={mockOnClick} />);
  const loadBtn = screen.queryByTestId("loadBtn");
  fireEvent.click(loadBtn);
  expect(mockOnClick).toBeCalled();
});
