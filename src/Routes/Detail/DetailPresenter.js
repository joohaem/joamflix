import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import ImdbIcon from "assets/imdbIcon.png";
import noPoster from "assets/noPosterSmall.png";
import Video from "../Video";
import Info from "../Info";
import Season from "../Season";

import TubeIcon from "assets/tubeIcon.png";

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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  line-height: 1.5;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const ILink = styled.a``;

const IIcon = styled.div`
  display: inline-block;
  width: 32px;
  height: 18px;
  margin: 0 5px -5px 0;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  width: 50%;
`;

const TabContainer = styled.div``;

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  margin-right: 10px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #ffd54f;
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all .25s;
  &:hover {
    background-color: #c8a415;
    letter-spacing: 3px;
    font-weight: bold;
  }
`;

const TabSeason = styled.li`
  display: ${props => props.activate};
  margin-right: 10px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #ffd54f;
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all .25s;
  &:hover {
    background-color: #c8a415;
    letter-spacing: 3px;
    font-weight: bold;
  }
`;

const TLink = styled(Link)`
  display: block;
  padding: 5px;
`;

const DetailPresenter = ({ result, loading, error, isMovie, id }) =>
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
              {result.genres?.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <ILink
              href={`https://www.imdb.com/title/${result.imdb_id}`}
              target="_blank"
            >
              <IIcon bgImage={ImdbIcon} />
            </ILink>
          </ItemContainer>
          <ItemContainer>
            <Overview>{result.overview}</Overview>
          </ItemContainer>
          <TabContainer>
            <Tabs>
              <Tab>
                <TLink to={isMovie ? `/movie/${id}/video` : `/show/${id}/video`}>Video</TLink>
              </Tab>
              <Tab>
                <TLink to={isMovie ? `/movie/${id}/info` : `/show/${id}/info`}>Information</TLink>
              </Tab>
              <TabSeason activate={isMovie ? "none" : "block"}>
                <TLink to={`/show/${id}/season`}>Season</TLink>
              </TabSeason>
            </Tabs>
          </TabContainer>
          <Route path="/movie/:id/video" component={Video} />
          <Route path="/show/:id/video" component={Video} />
          <Route path="/movie/:id/info" component={Info} />
          <Route path="/show/:id/info" component={Info} />
          <Route path="/show/:id/season" component={Season} />
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
