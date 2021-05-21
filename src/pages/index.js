import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import styled from "styled-components";

import HeadingLine from "@/components/common/HeadingLine";
import MainCamera from "@/components/layout/MainCamera";
import fetchData from "@/utils/fetchData";
import Loading from "@/components/layout/Loading";
import Slider from "@/components/layout/Slider";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  margin: 0;
  background-color: ${(props) => props.theme.primary.color};
  overflow: hidden;
`;

export default function Main({ topScoreList }) {
  const [session, isLoading] = useSession();

  // useEffect(() => {
  //   const setTimeoutId = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);

  //   return () => clearTimeout(setTimeoutId);
  // }, []);

  if (!session && isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <MainCamera />
      <HeadingLine title="TOP LANK ITEMS" />
      <Slider list={topScoreList} />
    </Container>
  );
}

export async function getServerSideProps() {
  const response = await fetchData("GET", `${process.env.HOMEPAGE_URL}/api/product/topScore`);

  return {
    props: {
      topScoreList: response.data || [],
    },
  };
}
