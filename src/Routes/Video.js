import React, { useState, useEffect } from "react";
import { moviesApi, tvApi } from "api";
import styled from "styled-components";
import TubeIcon from "assets/tubeIcon.png";

const ItemContainer = styled.div`
  margin: 20px 0;
  line-height: 1.5;
`;

const Item = styled.span``;

const YIcon = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0 5px -5px 0;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const YLink = styled.a`
  width: 70%;
  display: block;
  margin-bottom: 5px;
  transition: all .25s;
  &:hover {
    font-weight: bold;
  }
`;

export default ({
    match: {
      params: { id }
    },
    location: { pathname }
}) => {
    const [movies, setMovies] = useState([]);
    const [tvs, setTVs] = useState([]);
    const isMovie = pathname.includes("/movie/");
    
    async function getVideos() {
        try {
            if(isMovie) {
                const request = await moviesApi.movieDetail(id);
                const tempMovies = request.data.videos.results;
                setMovies(tempMovies);
            } else {
                const request = await tvApi.showDetail(id);
                const tempTvs = request.data.videos.results;
                setTVs(tempTvs);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    return isMovie ? 
        <ItemContainer>
            {movies?.map((video, index) => 
            index < 2 ?
            <YLink
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
                key={video.id}
            >
                <YIcon bgImage={TubeIcon} />
                <Item>{video.name}</Item>
            </YLink>
            : ""
            )}
        </ItemContainer>
    :
    <ItemContainer>
        {tvs?.map((video, index) => 
            index < 2 ?
            <YLink
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
                key={video.id}
            >
                <YIcon bgImage={TubeIcon} />
                <Item>{video.name}</Item>
            </YLink>
            : ""
        )}
    </ItemContainer>;
};

// 기존 코드에서 찍히지 않았던 것은 setState가 비동기적으로 동작하기 때문입니다. 
// 기존 코드는 콘솔로그가 setState가 완료되길 기다리는 것을 보장하지 않습니다.
// state 업데이트가 완료되기 전에 콘솔로그가 찍히는거져
// setState가 왜 비동기적으로 동작하는지는 리액트 컨셉과 관련이 있어요, 
// 나름 중요한 내용이니 찾아보시길 권합니다.
// 간략하게 이야기하자면 useEffect는 두 번째 인자인 배열안에 들어오는 값의 변화를 관찰하고
// 변화가 일어나면 첫 번째 인자인 콜백을 실행합니다.
// 따라서, state값에 변화가 생긴 후 콘솔로그를 찍게끔 보장해준 것이니 값이 찍혔던거예요