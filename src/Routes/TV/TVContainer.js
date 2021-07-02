import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "api";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    // error 넣어줘야 해
    loading: true
  };

  async componentDidMount() {
     //async, await: 끝날 때까지 다음 진행 X
     try {
       const {
         data: { results: topRated }
         //객체 구조 분해 할당(Destructuring)으로 변수명 설정
       } = await tvApi.topRated();
       const {
         data: { results: popular }
       } = await tvApi.popular();
       const {
         data: { results: airingToday }
       } = await tvApi.airingToday();
       this.setState({
         topRated,  //topRated: topRated,
         popular,
         airingToday
       });
       // throw Error();
     } catch {
       this.setState({
         error: "Can't find TV information."
       });
     } finally {
       this.setState({ loading: false });
     }
   }

  render() {
    const { topRated, popular, airingToday, error, loading } = this.state;
    // console.log(this.state);
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        error={error}
        loading={loading}
      />
    );
  }
}
