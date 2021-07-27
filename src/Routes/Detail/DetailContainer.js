import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    // 생성자 호출 이후에 props 를 세팅함
    // 생성자 내부에서 super() 가 호출되고
    // 생성자가 끝나기 전까지 this.props 는
    // undefined 가 될 것
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
      // this.로 변수를 선언하여 "함수"가 아닌 "클래스"의 변수로
    };
  }

  async componentDidMount() {
    // id가 숫자가 아닌 경우, /로 return
    const {
      match: {
        params: { id }
      },
      history: { push },
      location: { pathname }
    } = this.props;
    const { isMovie } = this.state;

    const parsedId = Number(id);  //or parseInt()
    if (isNaN(parsedId)) {
      return push("/");
    }

    let result = null;
    try {
      if (isMovie) {
        // const request = await moviesApi.movieDetail(parsedId);
        // result = request.data;
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        // const request = await tvApi.showDetail(parsedId);
        // result = request.data;
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
      // console.log(requset);
      console.log(result);
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
      // result: result로 state에 result 값 반환
    }
  }

  render() {
    const { result, error, loading } = this.state;
    // console.log(result);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
