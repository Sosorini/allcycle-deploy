import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import QuizList from "@/components/layout/quiz/List";
import THEME from "@/constants/theme";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render contact information", () => {
  const quizList = [
    {
      slug: "paper1",
      question: "깨진 유리병은 잘 감싸 유리로 분리수거한다?!",
      examples: ["그렇다", "아니다"],
      answer: "아니다",
      realAnswer: "아니다",
      description: "재활용품은 2차로 사람이 손수 분리해야하기 때문에, 다칠 위험이 있어 신문지로 감싸 일반쓰레기로 배출해야 합니다.",
      category: "glass",
    },
    {
      slug: "plastic",
      question: "다 쓴 칫솔은 일반쓰레기이다",
      examples: ["그렇다", "아니다"],
      answer: "그렇다",
      realAnswer: "그렇다",
      description: "플라스틱이라 재활용이 될 것 같지만 칫솔모 분리가 어려워서 일반쓰레기로 배출해야 합니다.",
      category: "plastic",
    },
  ];

  act(() => {
    render(
      <ThemeProvider theme={THEME}>
        <QuizList quizList={quizList} />
      </ThemeProvider>,
      container,
    );
  });

  expect(screen.getAllByTestId("slug")).toHaveLength(2);
});
