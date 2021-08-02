import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "api";
import styled from "styled-components";

const ItemContainer = styled.div`
  margin: 20px 0;
  line-height: 2;
`;

const ItemTitle = styled.div`
    font-weight: bold;
`;

const CIcon = styled.div`
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 0 5px -5px 0;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Item = styled.span``;

export default ({
    match: {
      params: { id }
    },
    location: { pathname }
}) => {
    const [companies, setCompanies] = useState([]);
    const [countries, setCountries] = useState([]);
    const isMovie = pathname.includes("/movie/");
    
    async function getVideos() {
        try {
            if(isMovie) {
                const request = await moviesApi.movieDetail(id);
                const tempCompanies = request.data.production_companies;
                const tempCountries = request.data.production_countries;
                setCompanies(tempCompanies);
                setCountries(tempCountries);
                // console.log(companies, countries);
            } else {
                const request = await tvApi.showDetail(id);
                const tempCompanies = request.data.production_companies;
                const tempCountries = request.data.production_countries;
                setCompanies(tempCompanies);
                setCountries(tempCountries);
                // console.log(companies, countries);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    // useEffect(() => {
    //     console.log(companies, countries);
    // },[companies, countries]);

    return isMovie ? 
    <><ItemContainer>
        <ItemTitle>Production Companies</ItemTitle>
            {companies?.map(company => 
                <div key={company.id}>
                    <CIcon bgImage={company.logo_path ? `https://image.tmdb.org/t/p/w300${company.logo_path}` : ""}></CIcon>
                    <Item>{company.name} ({company.origin_country})</Item>
                </div>
            )}
    </ItemContainer>
    <ItemContainer>
        <ItemTitle>Production Country</ItemTitle>
        {countries?.map((country, index) => 
            <div key={index}>
                <Item>{country.iso_3166_1} ({country.name})</Item>
            </div>
        )}
    </ItemContainer></>
    :
    <><ItemContainer>
        <ItemTitle>Production Companies</ItemTitle>
            {companies?.map(company => 
                <div key={company.id}>
                    <CIcon bgImage={company.logo_path ? `https://image.tmdb.org/t/p/w300${company.logo_path}` : ""}></CIcon>
                    <Item>{company.name} ({company.origin_country})</Item>
                </div>
            )}
    </ItemContainer>
    <ItemContainer>
        <ItemTitle>Production Country</ItemTitle>
        {countries?.map((country, index) => 
            <div key={index}>
                <Item>{country.iso_3166_1} ({country.name})</Item>
            </div>
        )}
    </ItemContainer></>;
};

// 기존 코드에서 찍히지 않았던 것은 setState가 비동기적으로 동작하기 때문입니다. 
// 기존 코드는 콘솔로그가 setState가 완료되길 기다리는 것을 보장하지 않습니다.
// state 업데이트가 완료되기 전에 콘솔로그가 찍히는거져
// setState가 왜 비동기적으로 동작하는지는 리액트 컨셉과 관련이 있어요, 
// 나름 중요한 내용이니 찾아보시길 권합니다.
// 간략하게 이야기하자면 useEffect는 두 번째 인자인 배열안에 들어오는 값의 변화를 관찰하고
// 변화가 일어나면 첫 번째 인자인 콜백을 실행합니다.
// 따라서, state값에 변화가 생긴 후 콘솔로그를 찍게끔 보장해준 것이니 값이 찍혔던거예요