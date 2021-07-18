import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import TubeIcon from "assets/tubeIcon.png";
import noPoster from "assets/noPosterSmall.png";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Item = styled.span`
  vertical-align: top;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Icon = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const TubeLink = styled.a`
  width: 70%;
  display: block;
  line-height: 1.5;
  margin-bottom: 5px;
  &:hover {
    font-weight: bold;
  }
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : noPoster
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
            {/*Movie일 경우 title, TV일 경우 name*/}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : ""}
              {/*Movie일 경우 release_date, TV일 경우 first_air_date*/}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : "?"} min
              {/*Movie일 경우 runtime, TV일 경우 episode_run_time*/}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <ItemContainer>
           {result.videos.results &&
              result.videos.results.map((video, index) => 
              index < 14 ?
              <TubeLink
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
              >
                <Icon bgImage={TubeIcon} />
                <Item>{video.name}</Item>
              </TubeLink>
              : ""
            )}
          </ItemContainer>
        </Data>
      </Content>
    </Container>

  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
