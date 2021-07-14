import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "styled-components";

import Quiz from "@/pages/quiz";
import THEME from "@/constants/theme";

it("should render contact information", () => {
  const allQuizList = [
    {
      slug: "paper1",
      question: "깨진 유리병은 잘 감싸 유리로 분리수거한다?!",
      examples: ["그렇다", "아니다"],
      answer: "아니다",
      realAnswer: "아니다",
      description: "재활용품은 2차로 사람이 손수 분리해야하기 때문에, 다칠 위험이 있어 신문지로 감싸 일반쓰레기로 배출해야 합니다.",
      category: "glass",
    },
  ];

  act(() => {
    render(
      <ThemeProvider theme={THEME}>
        <Quiz allQuizList={allQuizList} />
      </ThemeProvider>,
    );
  });

  expect(
    screen.getByTestId("title").textContent,
  ).toEqual("재활용 상식퀴즈");
});
