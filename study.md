# Vite

## Vite을 사용하는 이유
* 큰 장점
	- 빌드 속도나 새로운 코드를 적용했을 때의 반영 속도 같은 Feedback 속도의 엄청난 개선


## Vite을 이용해서 속도 개선하는 방법
* 개발 서버를 스타트할 때 번들러 기반 빌드 설정은 서비스를 제공하기 전에 전체 애플리케이션을 열심히 크롤링하고 빌드해야 함.

* 먼저 애플리케이션의 모듈을 `종속성`과 `소스 코드`의 두 가지 범주로 나누어 서버 시작 시간 

* esbuild를 사용하여 종속성을 사전 번들로 제공

* 기본 ESM을 통해 소스 코드 제공
	- 브라우저가 요청 시 요청에 따라 소스 코드 변환 및 제공
	- 조건부 동적 가져오기 뒤에 있는 코드는 현재 화면에서 실제로 사용 시에만 처리


## HMR (Hot Module Replace) 란?
* 파일 편집 시, 전체 번들을 다시 빌드하는 것이 아닌 페이지의 나머지 부분에 영향을 주지 않고, 변경된 모듈 자체를 교체해 빠르게 화면에 반영되는 것

* Vite에서 HMR은 기본 ESM을 통해 수행


## Typescript Transpiling 속도
* 기본적으로 Typescript 사용 지원


# TailWind CSS
## CSS 프레임워크
* 레이아웃 및 여러 컴포넌트 구성, 브라우저 호환성을 보장하는데 소요되는 시간을 최소화하기 위해 여러 웹 개발/디자인 프로젝트에 적용할 수 있는 CSS 파일 모음

### Tailwind 설치
* npm i tailwind
	- 현재(2025.07.12 기준) CSS 4.0이 업데이트 되면서 4.0으로 기준이 변경됐기 때문에
	- `npx tailwindcss init`은 지원하지 않는다.
		- 사용 시, tailwind 3 버전으로 재설치 해야 한다.
	- 만약, 4.0 버전 사용 시, vite.config.js에서 아래와 같이 추가해주면 된다.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
})
```

* 문서 참조
	- https://www.inflearn.com/community/questions/1518289/tailwind-css-%EB%B2%84%EC%A0%BC-%EB%8B%A4%EB%A6%84%EB%AC%B8%EC%A0%9C?srsltid=AfmBOoqarLPH5h_KYMnjaEI9Nb8-4JCwIyfOZ6S6lUn0fG5arBGDuczU


# PostCSS & AutoFixer
## PostCSS & AutoFixer
* Javascript로 CSS를 변환하는 도구
	1. 코드 가독성 향상
		- Autoprefixer는 현재 브라우저 인기도 및 속성 지원을 기반으로 데이터 사용 시, 접두사 적용


# Axios란 ?
* 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
	- 쉽게 말해 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용

## 사용 방법
* axios 모듈 설치
	- `npm i axios --save`


# useEffect
## useEffect 호출 시점
1. 컴포넌트가 먼저 마운트
2. state가 있을 시, state 초기화
3. return 부분 Rendering
4. useEffect 호출
	- 단, state 변경 시, state 변경 후 컴포넌트 Re-Rendering

```js
useEffect(() => {
	API => response => state update => component rerender => state
});
```


# Image Lazy Loading
* `lazy`
	- 게으른, 가능한 길게 일을 미루는 행위

* 페이지 안에 실제 이미지들을 바로 보여주는 게 아닌 `실제로 화면에 보일 필요가 있을 때 로딩을 할 수 있도록 하는 테크닉`

* 이 프로젝트에서는 Image 컴포넌트를 따로 만들어 구현

## 구현 방법
1. javascript 이벤트를 이용해 구현
2. Intersection Observer API 이용해 구현
3. 브라우저 Native Lazy Loading 이용 => loading 속성 이용


# Debounce
* debounce function은 사용자가 미리 결정된 시간 동안 타이핑을 멈출 때까지 keyup 이벤트의 처리 지연
	- UI 코드가 모든 이벤트를 처리할 필요가 없고, 서버로 전송되는 API 호출 수도 크게 줄어 듦.


# Autocomplete 기능 구현
* 해당, 관련 기능에 대해 API가 없기 때문에 프론트에서 모든 데이터를 가지고 있어야 함.


# React Router DOM
* 웹 앱에서 동적 라우팅 구현 가능

* 라우팅이 실행 중인 앱 외부의 구성에서 처리되는 기존 라우팅 아키텍쳐와 달리 앱 및 플랫폼의 요구 사항에 따라 `컴포넌트 기반` 라우팅 용이


## React Router DOM 설정
* src 폴더에서 index.js 파일을 연 후, react-router-dom에서 BrowseRouter를 가져 온 다음 root 구성 요소(App 구성 요소)를 그 안에 wrapping
	- BrowseRouter
		- HTML5 History API(pushState, replaceState 및 popState 이벤트)를 사용하여 UI를 URL과 동기화된 상태로 유지
	- Routes
		- 앱에서 생성될 모든 개별 경로에 대한 컨테이너/상위 역할
		- Route로 생성된 자식 컴포넌트 중에서 매칭되는 첫번쨰 Route 렌더링
	- Route
		- 단일 경로를 만드는 데 사용
		- `path`
			- 원하는 컴포넌트의 URL 경로 지정
		- `element`
			- 경로에 맞게가 렌더링되어야 하는 컴포넌트 지정
	- `<Link />`
		- HTML의 a 태그와 유사
		- 링크 클릭 시, 경로를 살펴보고 해당 경로 이름으로 구성 요소를 렌더링

```js
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
	<BrowseRouter>
		<App />
	</BrowseRouter>
)
```

## 중첩 라우팅 (Nested Routes)
* React Router의 가장 강력한 기능

* 복잡한 레이아웃 코드를 어지럽힐 필요 X

## Outlet
* 자식 경로 요소를 렌더링하려면 부모 경로 요소에 `<Outlet>`을 사용해야 함.
	- 하위 경로가 렌더링될 때 중첩된 UI 표시
	- 부모 Route가 정확히 일치할 시 자식 인덱스 Route를 렌더링 또는 인덱스 Route가 없을 시, 렌더링 X

## useNavigate
* 경로 변경
	- ex) navigate('/home') ===> localhost:3000/home 으로 이동 

## useParams
* :style 문법을 path 경로에 사용했다면 useParams()로 읽기 가능

## useLocation
* 현재 위치 반환
	- 현재 위치 변경될 때마다 일부 side effect를 수행하려는 경우에 유용

## useRoutes
* `<Routes>`와 기능은 동일 단, `<Route>` 요소 대신 Javascript 객체를 사용하여 경로 정의
	- 일반 `<Route>` 요소와 동일한 속성을 갖지만, JSX 불필요



# Single Page Application (SPA)
* 하나의 index.html 템플릿 파일을 가지게 된다.

* 하나의 템플릿에 자바스크립트를 이용해 다른 컴포넌트를 이 index.html 템플릿에 넣으므로 페이지 변경 가능


# useRef()
1. 변수 관리
	- state를 사용해서 state 가 변하면 컴포넌트가 다시 렌더링 되지만, ref 사용 시 렌더링되지 않음.
		(생명주기 동안 ref 값 유지)
	- 변수는 ref와 다르게 컴포넌트가 렌더링 되면 다시 초기화
2. 특정 DOM 선택

```js
const ref = useRef(value);
{ current: value }

const ref = useRef('안녕하세요.');
{ current: '안녕하세요.' }

ref.current === '안녕하세요'

// 종속성 배열이 없으면 어떤 state든 변경되면 useEffect 실행
```


## Forward Ref

```jsx
// react에서 input에 focus를 주려면?
import { useRef } from 'react';

const Test = () => {
	const inputRef = useRef();	// Ref 생성

	const handleClick = () => {
		inputRef.current.focus();	// 버튼 클릭 시, focus 함수 호출
	}

	return (
		<>
			{/* ref 속성에 Ref 등록 (inputRef.current는 이제 input의 DOM 참조) */}
			<input ref={inputRef} type="text" />
			<button onClick={handleClick} type="button">클릭</button>
		</>
	)
}

export default Test

// 만약, 자녀 컴포넌트로 옮길 경우?
// ref는 예약어이기 때문에 forwardRef를 통해 넘겨야 함. (Test2와 ChildComponent 참조)
```


## Modal 창 외부 클릭 시 닫게 하는 Custom Hook 생성
* useRef 사용

* 특정 DOM 접근 시

```jsx
// 강제로 리렌더링 시키기
```


## React Portal로 Modal 생성
### Portals
* Portal은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 최고의 방법 제공

* 첫번째 인자 `child`는 Element, 문자열 혹은 fragement와 같은 어떤 종류이든 렌더링할 수 있는 React 자식

* 두번째 인자 `container`는 DOM Element

* 이벤트 버블링 가능
	- 중첩된 자식 요소에서 이벤트 발생 시, 그 이벤트가 부모로 전달
	- React Tree에 존재하기 때문에

```jsx
ReactDOM.createPortal(child, container);

// container 생성 (index.html)
<div id="root"></div>
<div id="portal"></div>

// createPortal 이용
import ReactDOM from 'react-dom';

const Modal = ({ open, children, onClose }) => {
	if (!open) {
		return null;
	}

	return ReactDOM.createPortal(
		<>
			<div style={overlayStyle}></div>
			<div style={modalStyle}>
				<button onClick={onClose}>모달 닫기</button>
				{children}
			</div>
		</>,
		document.getElementById('portal');
	)
}
```


## 버그
* 다음 화살표 누를 시, 다음 포켓몬으로 바뀌지 않음.
* 로딩 시, 로딩 아이콘이 표출되지 않음.


## 로그인
### firebase
* Google에서 개발한 플랫폼


## Styled Component
* CSS-in-JS라고 하는 Javascript 파일 안에서 CSS를 처리할 수 있게 해주는 대표 라이브러리

* 설치 방법
	- `npm i --save styled-components`


## 데이터 유지하기
* localStorage 에 userData 값을 담아 페이지를 refresh 해도 userData가 남아있을 수 있게 해주기