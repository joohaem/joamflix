# Nomflix

Learning React and ES6 by building a Movie Discovery App.

Link :

- https://xenodochial-wright-ed3962.netlify.app/#/
- https://joohaem.github.io/joamflix/#/

[기초개념: movie_app_react - README](https://github.com/joohaem/movie_app_react2021)

## Screens

- [x] Home
- [x] TV Shows
- [x] Search
- [x] Detail

(Show the rendered HTML markdown to the right of the current editor using Ctrl-Shift-M)

## API Verbs

- [x] Now playing (Movie)
- [x] Upcoming (Movie)
- [x] Popular (TV, Movie)
- [x] Top Rated (TV)
- [x] Airing Today (TV)
- [x] TV Show Detail
- [x] Movie Detail
- [x] Search (Movie, TV)

## Code Challenges

- [x] IMDB Link
- [x] Tabs inside of Movie / Show Details (YT Videos, Production Company & Countries)
- [ ] Collections Link
- [ ] /collections Route
- [x] On TV Show, show seasons and creators

<hr/>
<hr/>
<hr/>
<hr/>
<hr/>

## yarn, npm, npx
yarn ~ npm: https://velog.io/@blackb0x/npm%EA%B3%BC-yarn
npm ~ npx: https://webruden.tistory.com/275
yarn add ~ === npm install ~

## .env 파일
NODE_PATH=src 을 설정함으로써
import App from 'Components/App'; 와 같이 ‘./’ 생략 가능
+
root에 jsconfig.json 파일을 만들어 다음 내용 추가
```+javascript
{
  "rootDir": "src",
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "*": ["*"]
    }
  }
}
```

## react-router-dom
네비게이션을 만드는 패키지
> npm install react-router-dom
Router는 url을 확인하고 그에 맞는 Component(페이지)를 불러오게 된다
각 Component로 Application의 부분을 캡슐화한다.
또한 Router 태그는 한 자식 태그만 갖는다.
```javascript
return (
  <HashRouter>
    <Route path="/" exact={true} component={Home} />
    <Route path="/about" component={About} />
  </HashRouter>
);
```
HashRouter(#)가 아닌 BrowserRouter는 github pages에 업로드하기 번거롭다
HashRouter는 웹이 아닌 앱에 있다는 느낌을 줌, 페이지의 Hash를 사용한다
-> a 태그 대신 Link 태그를 이용한다 (새로고침을 막아줌)
BrowserRouter는 HTML history API를 사용한다

ex) 다음과 같이 Link 태그와 Route 태그를 한 component에 작성할 수 있다

```javascript
<InsideMenu>
  <List>
    <Item active={pathname === `/coins/${coin.id}/markets`}>
      <Link to={`/coins/${coin.id}/markets`}>Markets</Link>
    </Item>
    <Item active={pathname === `/coins/${coin.id}/exchanges`}>
      <Link to={`/coins/${coin.id}/exchanges`}>Exchanges</Link>
    </Item>
  </List>
</InsideMenu>
<Route path="/coins/:id/markets" component={Markets} />
<Route path="/coins/:id/exchanges" component={Exchanges} />
```

## Router Composition (render)
Composition은 두 개 이상의 Route를 Rendering한다
```javascript
<Route path="/tv" component={TV} />
<Route path="/tv/popular" render={() => <h1>Popular</h1>} />
```
-> /tv도 rendering 되고 /tv/popular도 rendering 되며 두 개의 Route Render

## Redirect
```javascript
<Redirect from=“*” to=”/” />
```
-> 일치하는 Route가 하나도 없으면, 어느 페이지든지 받아서 ‘/’로 보낸다
-> from=”*” 이므로 일치하는 Route와 함께 Render 되므로 Switch 사용
<Switch> </Switch>는 한 번에 한 Route씩 Render 되게 해준다

## Link

a 태그는 페이지가 새로고침 되면서 리액트가 죽게 된다

따라서 a 태그와 href 속성은 Link 태그와 to를 사용하여 표현 가능

Link 태그는 Router 밖에서 작동할 수 없으므로 App.js 파일이 아닌 Router.js 파일에 Header 컴포넌트를 넣는다

단, 외부 사이트를 이용할 경우, Link to는 ```.../#/https://...```  로 지정되므로 a 태그를 사용한다 (DetailPresent)

다음은 각각 Link를 사용한 Header와 Router의 예시이다

```javascript
import React from "react";
import { Link } from "react-router-dom";
const Header = () => (
  <header>
    <ul>
      <li>
        <Link to="/prices">Prices</Link>
      </li>
      <li>
        <Link to="/exchanges">Exchanges</Link>
      </li>
      <li>
        <Link to="/coins">Coins</Link>
      </li>
    </ul>
  </header>
);
export default Header;
```

```javascript
import React from "react";
import {
  HashRouter as Router, Route
} from "react-router-dom";
import Header from "./Header";
import Coins from "../Screens/Coins";
import Exchanges from "../Screens/Exchanges";
import Prices from "../Screens/Prices";

export default () => {
  return (
    <Router>
      <Header />
      <Route path="/coins" exact component={Coins} />
      <Route path="/exchanges" component={Exchanges} />
      <Route path="/prices" component={Prices} />
    </Router>
  );
};
```

## CSS
(+ flex 공부 필요)
태그 내 class로 쓰면 JS의 "class"와 혼동하므로 “className”으로 이용
각 Component로 Application의 부분을 캡슐화했으므로,

css를 추가할 때는 Header 폴더 (Header.js, Header.css, index.js)로 생성한다.

index.js는

```javascript
import Header from "./Header";
export default Header;
```

#### CSS 모듈

-> className을 Randomize(임의화)화여 css가 local이 되도록

Header.js에서 js 모듈을 선언하는 것과 같이 import, className을 설정한다.

```javascript
import styles from "./Header.module.css";
/
<header>
<ul className={styles.navList}>
```

#### Styled-Components (SC; Randomized, Local)
> npm install styled-components

js 파일 안에서 css와 js를 통합하여 작성할 수 있다.

기본적으로 css 문법을 따라가고, & 문자를 사용하여 Sass처럼 자기 자신 선택이 가능하다.

```javascript
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  &:hover {
    background-color: blue;
  }
`;

<List>
~
</List>
```

위와 같이 css 문법을 선언하고 ul 태그를 List 태그로 변경하여 작성한다.

그리고,

다음과 같이 a 태그와 href 속성을 Link 태그와 to를 사용하여 표현한다

```javascript
import { Link } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)``;

<SLink to="/">Movies</SLink>
```

#### Styled-Reset (Global)
> npm install styled-reset

SC를 이용해 css를 초기화해서 0의 상태에서 시작한다

다음과 같이 Globalstyles.js 파일에 Global css를 설정한다

```javascript
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
`;

export default globalStyles;
```

후에 App.js 파일에 ```<Router />```와 같이 ```<GlobalStyles />``` Component를 추가한다

```import { something } from ~```은 파일에서 export를 const로 받았을 때 사용된다

## Location Aware Header
props를 넘겨줄 태그에
```javascript
<Item current={false}>
```
속성을 주고, styled에 props를 넘겨준다
```javascript
border-bottom: 5px solid ${props => props.current ? "3498db" : "transparent"};
```

withRouter는 다른 Component를 감싸는 Component다

```javascript
import { withRouter } from “react-router-dom;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
```
HeaderComponent가 withRouter라는 Component를 감싼 형태이므로 props를 가질 수 있다

- Passing props to a component wrapped in withRouter() : ```= withRouter(({history, ...props}) => ();```

router의 location-pathname 속성을 가져와 "/~" 문자열과 비교하여 styled css를 제어한다

(Router의 match, location, history 속성)

위 export 코드는 다음과 같다

```javascript
const HeaderComponent = ({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
);

export default withRouter(HeaderComponent);
```

## API Networking with Axios
(If you really need to hide the key then you might need to use a backend.)

https://www.themoviedb.org/

에서 로그인하여 Setting-API -> API key를 생성한다

https://developers.themoviedb.org/3

try it out -> API key로 SEND REQUEST하여 url 가져오기

api.js 에 네트워킹과 API(url의 같은 부분)를 다룸으로써 효율적으로 Router 호출, fetch를 수행한다.

>npm install axios

Axois의 인스턴스의 baseURL, headers, timeout 같은 것들을 반복해서 작성하지 않게 해준다.

params 객체는 api 주소 뒤 ```?api_key=~&language?=~``` 를 가리킨다

```javascript
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "10923b261ba94d897ac6b81148314a3f",
    language: "en-US"
  }
});

api.get("tv/popular");

export default api;
```

위와 같이 API의 “tv/popular”를 ‘상대경로’로 지정하여 가져온다.

index.js에 import “api”; 해주면 검사-네트워크에 Request가 된 것을 볼 수 있다.

Axios document : https://github.com/axios/axios

```javascript
export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};
```
search에서 term을 검색할 때, 공백 및 기호(!,? 등)를 URL에서 인코딩 (%20, %21 등으로) 해야 한다

-> encodeURIComponent() 이용

위와 같은 API를 Container의 componentDidMount()에서 async, await로 불러오면 ```console.log()```로 확인이 가능하다
```javascript
{
  data: Array(706), 
  status: 200, 
  statusText: "", 
  headers: Object, 
  config: Object…
}
```

## Loading Emoji
Emoji는 span으로 감싸져야 하고, image role이 있어야 하며, 접근성(스크린리더가 읽을 aria-label 속성)이 있어야 한다

따라서 다음과 같이 export 한다

```javascript
export default () => (
  <Container>
    <span role="img" aria-label="Loading">
      ⏰
    </span>
  </Container>
);
```

## Container Presenter Pattern
클래스 component와 state로 DidMount에 API 데이터를 불러오고 렌더링 하는 방법은 애플리케이션이 작을 때나 사용한다

여기서는, Container로 데이터, state를 가지고 API를 불러와 처리하고/

Presenter가 데이터를 보여주는 역할을 하게 된다.

-> Routes에 각 Container와 Presenter의 폴더를 만든다 (+ index.js)

### Container
- Home, TV )

componentDidMount()에서 async, await로 API 불러와 setState() 하여 render() 한다

(혹여나 크기가 커질 경우 함수로 빼내고 componentDidMount() 에서 this.로 호출한다)

-> async, await: API가 리턴될 때까지, 데이터를 기다려주는 역할을 한다.

-> state: object + component의 data를 넣을 공간 + 동적 데이터

-> setState: react는 새로운 state로 render 함수를 다시 실행해 변화 있는 부분만 업데이트 (virtual DOM)

- Search )

handleSubmit 함수로 Term을 적고 Enter하면 searchByTerm 함수를 실행한다

- Detail )

Router에

```javascript
<Route path="/movie/:id" component={Detail} />
<Route path="/show/:id" component={Detail} />
```

추가한다. “:id”로 패턴이 매칭되어 url을 설정한다. (/movie/1, /movie/a 등)

-> 이는 DetailComponent에서 **props.match의 params.id**로 전달된다

### Presenter
prop-types로 자료형 지정

styled-components로 CSS 지정

API로 받은 객체를 props로 받아 ```?.map((obj, idx) => <~ key={idx}></~>)``` 으로 펼쳐 나타낼 수 있다 (map() 할 때는 각 컴포넌트에 key 속성을 가져야 한다)

+

Components/Section.js 파일에 title과 mapping할 children을 props로 만든다

기본적으로 React Component는 children이라고 하는 optional prop을 가진다

```javascript
const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);
```
-> Presenter에서 불러와 나타내고 children은 Secntion 태그 사이 내용을 불러온다

Container 태그는 div 태그를 styled한 네이밍이다

## SearchPresenter

## Error Message

## 영화 이미지 API에서 불러오기
API의 값으로 Container의 state를 설정한다

-> 이를 Presenter의 props로 넣어 보여준다

-> Presenter 중간의 Poster 컴포넌트의 props로 imageUrl을 넣어준다

```javascript
imageUrl = {show.poster_path}
```

-> poster_path 혹은 backdrop_path 등은 검사창에서 확인한다

-> Poster에서 API에서 제공한 url 앞과 ${imageUrl}을 합쳐 Image (div)태그의 props로 넣어준다

```javascript
bgUrl = `https://image.tmdb.org/t/p/w300${imageUrl}`
```

-> 이를 Image (div)태그의 css 속성으로 넣어준다

```css
background-image: url(${props => props.bgUrl});
```

## React Helmet
>npm install react-helmet

Helmet은 웹 사이트의 head를 수정하기 쉽다

예를 들어 Joamflix의 head title을 Detail 페이지로 들어가면 영화 제목을 덧붙인 head title로 변경할 수 있다

-> Presenter에서 최상위 Fragment를 만들고, 자식으로 Helmet 태그를 생성한다

```javascript
(<>
<Helmet>
  <title>Movies | Joamflix</title>
</Helmet>
{ }
</>);
```

## 배포하기
gh-pages 설치 사용 [movie-app-react2021](https://github.com/joohaem/movie_app_react2021)

or

**Netlify** 서비스 이용하기 (package.json의 homepage 주소 바꾸기)

1. BrowserRouter 사용할 때는
basename 속성을 다음과 같이 추가해주시면 됩니다.
조건: package.json의 homepage 속성에 주소를 추가해 줘야 함.

2. Netilify 빌드 중, treating warnings as errors because process.env.ci = true.
와 같은 에러때문에 컴파일이 실패한다면,
Netilify 메뉴 중에 Site setting 메뉴에 들어가셔서
Build & Deploy -> Edit Setting -> Build Command에서
CI=false yarn build 혹은 CI=false npm run build로 업데이트 해주시면 됩니다.

3. 만약 Deploy를 성공했는데도, 사이트 화면이 아예 뜨지않는 경우,
package.json 파일에 들어가서 homepage 속성에
netilify가 준 주소를 입력하고 push하면 됩니다.