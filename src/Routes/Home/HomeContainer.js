import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    // moviesApi에 있는 값들
    error: null,
    // error 넣어 처리해줘야 해
    loading: true
  };

  async componentDidMount() {
    //async, await: 끝날 때까지 다음 진행 X
    try {
      const {
        data: { results: nowPlaying }
        //객체 구조 분해 할당(Destructuring)으로 변수명 설정
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      const {
        data: { results: popular }
      } = await moviesApi.popular();
      this.setState({
        nowPlaying, //nowPlaying: nowPlaying,
        upcoming,
        popular
      });
      // throw Error();
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    // console.log(this.state);
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
