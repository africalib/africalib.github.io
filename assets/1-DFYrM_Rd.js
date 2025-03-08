import{a as l,o as i,e as n,p as t,F as s}from"./index-BUwZjxOu.js";const p={},m=`<p>라우터는 현재 URL에 맞는 컴포넌트를 연결해주는 녀석입니다. 예를 들어, 사용자가 로그인 URL로 접속하면 로그인 컴포넌트를 연결하고요, 장바구니 URL로 접속하면 장바구니 컴포넌트를 연결해주는 것이죠. 마치 영화 감독이 상황에 따라 어떤 장면을 촬영할 것인지 결정하는 것과 비슷합니다. 라우터 코드를 통해 더 구체적으로 살펴볼까요?</p>
<pre><code class="language-js">import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(), // 히스토리 모드
  routes:[ // URL과 컴포넌트 연결
    { path: '/', component: Home },
    { path: '/login', component: () =&gt; import('./views/Login.vue') },
    { path: '/cart', component: () =&gt; import('./views/Cart.vue') }
  ]
})
</code></pre>
<ul>
<li>히스토리 모드
<ul>
<li>createWebHistory: HTML5 모드입니다. (예: example.com/user/1)</li>
<li>createWebHashHistory: 해시 모드입니다. (예: example.com/#/user/1)</li>
</ul>
</li>
</ul>
<pre><code class="language-txt">* 해시 모드는 검색 엔진 최적화(SEO)에 좋지 않기 때문에 HTML5 모드를 권장합니다.
</code></pre>
<ul>
<li>URL과 컴포넌트 연결
<ul>
<li>path: URL(경로)을 입력합니다.</li>
<li>component: URL에 연결할 컴포넌트를 지정합니다. 상단에 컴포넌트를 미리 임포트하는 방식을 &quot;정적 임포트&quot;, 함수로 임포트하는 방식을 &quot;동적 임포트&quot;라고 합니다.</li>
</ul>
</li>
</ul>
<pre><code class="language-txt">* 정적 임포트(static import)
- 사용할 컴포넌트를 미리 로드
- 전환 시간 빠름
- 초기 로드 시간 오래 걸림

* 동적 임포트(dynamic import)
- 필요한 컴포넌트를 필요할 때 로드
- 전환 시간 느림
- 초기 로드 시간 빠름

* 일반적으로 동적 임포트는 권장합니다.
</code></pre>
`,c=`라우터는 현재 URL에 맞는 컴포넌트를 연결해주는 녀석입니다. 예를 들어, 사용자가 로그인 URL로 접속하면 로그인 컴포넌트를 연결하고요, 장바구니 URL로 접속하면 장바구니 컴포넌트를 연결해주는 것이죠. 마치 영화 감독이 상황에 따라 어떤 장면을 촬영할 것인지 결정하는 것과 비슷합니다. 라우터 코드를 통해 더 구체적으로 살펴볼까요?\r
\r
\`\`\`js\r
import Home from '../views/Home.vue';\r
\r
const router = createRouter({\r
  history: createWebHistory(), // 히스토리 모드\r
  routes:[ // URL과 컴포넌트 연결\r
    { path: '/', component: Home },\r
    { path: '/login', component: () => import('./views/Login.vue') },\r
    { path: '/cart', component: () => import('./views/Cart.vue') }\r
  ]\r
})\r
\`\`\`\r
\r
- 히스토리 모드\r
  - createWebHistory: HTML5 모드입니다. (예: example.com/user/1)\r
  - createWebHashHistory: 해시 모드입니다. (예: example.com/#/user/1)  \r
\r
\`\`\`txt\r
* 해시 모드는 검색 엔진 최적화(SEO)에 좋지 않기 때문에 HTML5 모드를 권장합니다.\r
\`\`\`\r
\r
- URL과 컴포넌트 연결\r
  - path: URL(경로)을 입력합니다.\r
  - component: URL에 연결할 컴포넌트를 지정합니다. 상단에 컴포넌트를 미리 임포트하는 방식을 "정적 임포트", 함수로 임포트하는 방식을 "동적 임포트"라고 합니다.\r
\r
\`\`\`txt\r
* 정적 임포트(static import)\r
- 사용할 컴포넌트를 미리 로드\r
- 전환 시간 빠름\r
- 초기 로드 시간 오래 걸림\r
\r
* 동적 임포트(dynamic import)\r
- 필요한 컴포넌트를 필요할 때 로드\r
- 전환 시간 느림\r
- 초기 로드 시간 빠름\r
\r
* 일반적으로 동적 임포트는 권장합니다.\r
\`\`\``;function o(r,e){return i(),l(s,null,[e[0]||(e[0]=n("p",null,"라우터는 현재 URL에 맞는 컴포넌트를 연결해주는 녀석입니다. 예를 들어, 사용자가 로그인 URL로 접속하면 로그인 컴포넌트를 연결하고요, 장바구니 URL로 접속하면 장바구니 컴포넌트를 연결해주는 것이죠. 마치 영화 감독이 상황에 따라 어떤 장면을 촬영할 것인지 결정하는 것과 비슷합니다. 라우터 코드를 통해 더 구체적으로 살펴볼까요?",-1)),e[1]||(e[1]=n("pre",null,[n("code",{class:"language-js","v-pre":"true"},`import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(), // 히스토리 모드
  routes:[ // URL과 컴포넌트 연결
    { path: '/', component: Home },
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/cart', component: () => import('./views/Cart.vue') }
  ]
})
`)],-1)),e[2]||(e[2]=n("ul",null,[n("li",null,[t("히스토리 모드 "),n("ul",null,[n("li",null,"createWebHistory: HTML5 모드입니다. (예: example.com/user/1)"),n("li",null,"createWebHashHistory: 해시 모드입니다. (예: example.com/#/user/1)")])])],-1)),e[3]||(e[3]=n("pre",null,[n("code",{class:"language-txt","v-pre":"true"},`* 해시 모드는 검색 엔진 최적화(SEO)에 좋지 않기 때문에 HTML5 모드를 권장합니다.
`)],-1)),e[4]||(e[4]=n("ul",null,[n("li",null,[t("URL과 컴포넌트 연결 "),n("ul",null,[n("li",null,"path: URL(경로)을 입력합니다."),n("li",null,'component: URL에 연결할 컴포넌트를 지정합니다. 상단에 컴포넌트를 미리 임포트하는 방식을 "정적 임포트", 함수로 임포트하는 방식을 "동적 임포트"라고 합니다.')])])],-1)),e[5]||(e[5]=n("pre",null,[n("code",{class:"language-txt","v-pre":"true"},`* 정적 임포트(static import)
- 사용할 컴포넌트를 미리 로드
- 전환 시간 빠름
- 초기 로드 시간 오래 걸림

* 동적 임포트(dynamic import)
- 필요한 컴포넌트를 필요할 때 로드
- 전환 시간 느림
- 초기 로드 시간 빠름

* 일반적으로 동적 임포트는 권장합니다.
`)],-1))],64)}const u={render:o};u.__hmrId="C:/J/repositories/africalib/src/data/posts/1.md";const L=r=>({components:r,render:o});export{u as VueComponent,L as VueComponentWith,p as attributes,m as html,c as markdown};
