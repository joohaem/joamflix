import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  padding: 0px 20px;
`;

const HomePresenter = ({ nowPlaying, popular, upcoming, loading, error }) =>
  loading ? <Loader /> : (
    <Container>
      {error && <Message color="#e74c3c" text={error} />}
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map(movie =>
            <span key={movie.id}>{movie.title}</span>
          )}
          {/*span 태그에 넣어 children props가 grid CSS 얻을 수 있게*/}
        </Section>
      )}
      {/*트리플 체크를 해준다.*/}
      {/*Section 태그 안의 내용 -> Container -> Title -> Grid -> children*/}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map(movie =>
            <span key={movie.id}>{movie.title}</span>
          )}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Movies">
          {popular.map(movie =>
            <span key={movie.id}>{movie.title}</span>
          )}
        </Section>
      )}
    </Container>
  );

export default HomePresenter;
