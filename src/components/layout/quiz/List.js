import {
  QuizContainer,
  QuizBox,
  Category,
  Question,
  NextLink,
} from "@/components/layout/quiz/styled/ListStyled";

function List({ quizList }) {
  return (
    <QuizContainer>
      {quizList?.map((quiz) => {
        const { slug, question, category } = quiz;

        return (
          <NextLink key={slug} href={`/_quiz/${slug}`}>
            <QuizBox data-testid="slug">
              <div>
                <Category>CATEGORY: <strong>{category}</strong></Category>
              </div>
              <Question>{question}</Question>
            </QuizBox>
          </NextLink>
        );
      })}
    </QuizContainer>
  );
}

export default List;
