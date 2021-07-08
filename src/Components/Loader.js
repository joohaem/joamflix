import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

export default () => (
  <Container>
    <span role="img" aria-label="Loading">
      ⏰
    </span>
    {/*Emoji는 span으로 감싸져야 하고,
      image role이 있어야 하며,
      접근성(스크린리더가 읽을 aria-label 속성)이 있어야 한다*/}
  </Container>
);
