import {
  render,
  fireEvent,
  waitFor,
  screen,
  findByTestId,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Manager from "@/pages/manager";
import THEME from "@/constants/theme";

jest.mock("@/hooks/useManager", () => ({
  useManager: () => ({
    count: 0,
    message: "",
    crawlData: () => ({ result: true, data: 2 }),
    updateData: jest.fn(),
    handleChange: jest.fn(),
  }),
}));

test("manager page", async () => {
  render(
    <ThemeProvider theme={THEME}>
      <Manager list={[]} />
    </ThemeProvider>,
  );

  const button = screen.getByRole("button", { name: "NEW 크롤링" });

  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText("제품", { exact: false })).toBeInTheDocument();
  });
});
