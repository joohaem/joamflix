import React, { useState, useEffect } from "react";
import { tvApi } from "api";
import styled from "styled-components";
import noPoster from "assets/noPosterSmall.png";

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  line-height: 1.5;
`;

const ItemBox = styled.div`
  margin: 0 20px 20px 10px;
`;

const Item = styled.span`
  font-weight: bold;
`;

const Poster = styled.div`
  width: 100px;
  height: 150px;
  margin: 0 auto 10px;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

export default ({
    match: {
      params: { id }
    }
}) => {
    const [seasons, setSeasons] = useState([]);
    
    async function getSeasons() {
        try {
            const request = await tvApi.showDetail(id);
            const tempSeasons = request.data.seasons;
            setSeasons(tempSeasons);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSeasons();
    }, []);

    useEffect(() => {
      console.log(seasons);
    }, [seasons]);

    return <ItemContainer>
      {seasons?.map((season) => 
        <ItemBox key={season.id}>
          <Poster bgImage={season.poster_path ? `https://image.tmdb.org/t/p/w300${season.poster_path}` : noPoster} />
          <Item>#{season.season_number} {season.name} [{season.air_date}]</Item>
        </ItemBox>
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