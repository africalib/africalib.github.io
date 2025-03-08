import{a as p,o as l,e as t,f as o,p as r,F as u}from"./index-BQLmNG6Y.js";const i={},m=`<p>라우터는 URL과 컴포넌트를 연결해주는 역할을 합니다. 예를 들어 사용자가 로그인 URL로 접속하면 로그인 컴포넌트를 연결하고, 장바구니 URL로 접속하면 장바구니 컴포넌트를 연결해주는 것이죠. 마치 영화 감독이 상황에 따라 어떤 장면을 촬영할 건지 결정하는 것과 비슷합니다.</p>
<p><img src="/assets/posts/1/meme1.png" alt="김연경 밈">
<em>장바구니 화면 띄우라고</em></p>
<p>아래 <code>src/router/index.js</code> 파일의 코드를 통해 더 구체적으로 살펴볼까요?</p>
<pre><code class="language-js">import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({ // 라우터 객체 생성
  history: createWebHistory(import.meta.env.BASE_URL), // 히스토리 모드
  routes: [ // 연결 경로
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () =&gt; import('../views/AboutView.vue'),
    },
  ],
});

export default router;
</code></pre>
<p>위 코드는 <code>createRouter()</code> 메서드를 호출해 라우터 객체를 생성한 것입니다. 호출 시 인수로 전달한 객체 부분을 더 살펴보겠습니다.</p>
<ul>
<li>히스토리 모드(history)
<ul>
<li>createWebHistory: HTML5 모드입니다. (예: a.com/user/1)</li>
<li>createWebHashHistory: 해시 모드입니다. (예: a.com/#/user/1)</li>
</ul>
</li>
</ul>
<pre><code class="language-txt">* 해시 모드는 검색 엔진 최적화(SEO)에 좋지 않기 때문에 HTML5 모드를 권장합니다.
</code></pre>
<ul>
<li>연결 경로(routes)
<ul>
<li>path: URL 경로를 입력합니다.</li>
<li>component: URL 경로에 연결할 컴포넌트를 지정합니다. 상단에 컴포넌트를 미리 임포트하는 방식을 &quot;정적 임포트&quot;, 함수로 임포트하는 방식을 &quot;동적 임포트&quot;라고 합니다.</li>
</ul>
</li>
</ul>
<table>
<thead>
<tr>
<th>방식</th>
<th>설명</th>
<th>전환 속도</th>
<th>초기 로드 속도</th>
</tr>
</thead>
<tbody>
<tr>
<td>정적 임포트</td>
<td>컴포넌트 미리 로드</td>
<td>빠름</td>
<td>느림</td>
</tr>
<tr>
<td>동적 임포트</td>
<td>컴포넌트 필요 시 로드</td>
<td>느림</td>
<td>빠름</td>
</tr>
</tbody>
</table>
<p>위에서 생성된 라우터 객체를 Vue 애플리케이션에 적용하려면 어떻게 해야 할까요? 다음과 같이 <code>src/main.js</code> 파일에서 <code>use()</code> 메서드를 호출하여 플러그인으로 등록해야 합니다.</p>
<pre><code class="language-js">const app = createApp(App);
app.use(router); // 플러그인으로 등록
</code></pre>
<p>그러고 나서 <code>src/App.vue</code> 파일을 열고, 다음과 같이 <code>router-view</code> 태그를 입력합니다.</p>
<pre><code class="language-js">&lt;template&gt;
  &lt;main&gt;
    &lt;header&gt;헤더&lt;/header&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;header&gt;푸터&lt;/header&gt;
  &lt;/main&gt;
&lt;/template&gt;

&lt;style scoped&gt;
main {
  display: flex;
  flex-direction: column;
}
&lt;/style&gt;
</code></pre>
<p>다음으로 <code>src/views/HomeView.vue</code> 파일을 열고, 다음과 같이 입력합니다.</p>
<pre><code class="language-js">&lt;template&gt;
  &lt;div&gt;홈 화면&lt;/div&gt;
&lt;/template&gt;
</code></pre>
<p>그러고 나서 애플리케이션 실행 후 루트 경로(<code>/</code>)에 접속하면 다음과 같은 화면이 뜹니다.</p>
<p><img src="/assets/posts/1/screenshot1.png" alt="홈 페이지">
<em>루트 경로 접속 화면</em></p>
<p>다음으로 <code>src/views/AboutView.vue</code> 파일을 열고, 다음과 같이 입력합니다.</p>
<pre><code class="language-js">&lt;template&gt;
  &lt;div&gt;소개 화면&lt;/div&gt;
&lt;/template&gt;
</code></pre>
<p>그러고 나서 소개 화면 경로(<code>/about</code>)에 접속하면 다음과 같은 화면이 뜹니다.</p>
<p><img src="/assets/posts/1/screenshot2.png" alt="소개 페이지">
<em>소개 화면 경로 접속 화면</em></p>
<p>라우터가 루트 경로(<code>/</code>)에는 <code>HomeView.vue</code> 컴포넌트를, 소개 화면 경로(<code>/about</code>)에는 <code>AboutView.vue</code> 컴포넌트를 연결한 것입니다. 아래는 이전에 정의한 연결 경로 배열입니다.</p>
<pre><code class="language-js">routes: [ // 연결 경로
{
  path: '/',
  name: 'home',
  component: HomeView,
},
{
  path: '/about',
  name: 'about',
  component: () =&gt; import('../views/AboutView.vue'),
},
</code></pre>
<p>이렇게 해서 라우터에 대해 알아봤습니다.</p>
`,c=`라우터는 URL과 컴포넌트를 연결해주는 역할을 합니다. 예를 들어 사용자가 로그인 URL로 접속하면 로그인 컴포넌트를 연결하고, 장바구니 URL로 접속하면 장바구니 컴포넌트를 연결해주는 것이죠. 마치 영화 감독이 상황에 따라 어떤 장면을 촬영할 건지 결정하는 것과 비슷합니다.\r
\r
![김연경 밈](/assets/posts/1/meme1.png)\r
*장바구니 화면 띄우라고*\r
\r
아래 \`src/router/index.js\` 파일의 코드를 통해 더 구체적으로 살펴볼까요?\r
\r
\`\`\`js\r
import { createRouter, createWebHistory } from 'vue-router';\r
import HomeView from '../views/HomeView.vue';\r
\r
const router = createRouter({ // 라우터 객체 생성\r
  history: createWebHistory(import.meta.env.BASE_URL), // 히스토리 모드\r
  routes: [ // 연결 경로\r
    {\r
      path: '/',\r
      name: 'home',\r
      component: HomeView,\r
    },\r
    {\r
      path: '/about',\r
      name: 'about',\r
      component: () => import('../views/AboutView.vue'),\r
    },\r
  ],\r
});\r
\r
export default router;\r
\`\`\`\r
\r
위 코드는 \`createRouter()\` 메서드를 호출해 라우터 객체를 생성한 것입니다. 호출 시 인수로 전달한 객체 부분을 더 살펴보겠습니다.\r
\r
- 히스토리 모드(history)\r
  - createWebHistory: HTML5 모드입니다. (예: a.com/user/1)\r
  - createWebHashHistory: 해시 모드입니다. (예: a.com/#/user/1)  \r
\r
\`\`\`txt\r
* 해시 모드는 검색 엔진 최적화(SEO)에 좋지 않기 때문에 HTML5 모드를 권장합니다.\r
\`\`\`\r
\r
- 연결 경로(routes)\r
  - path: URL 경로를 입력합니다.\r
  - component: URL 경로에 연결할 컴포넌트를 지정합니다. 상단에 컴포넌트를 미리 임포트하는 방식을 "정적 임포트", 함수로 임포트하는 방식을 "동적 임포트"라고 합니다.\r
\r
| 방식 | 설명 | 전환 속도 | 초기 로드 속도 |\r
|-|-|-|-|\r
| 정적 임포트 | 컴포넌트 미리 로드 | 빠름 | 느림 |\r
| 동적 임포트 | 컴포넌트 필요 시 로드 | 느림 | 빠름 |\r
\r
위에서 생성된 라우터 객체를 Vue 애플리케이션에 적용하려면 어떻게 해야 할까요? 다음과 같이 \`src/main.js\` 파일에서 \`use()\` 메서드를 호출하여 플러그인으로 등록해야 합니다.\r
\r
\`\`\`js\r
const app = createApp(App);\r
app.use(router); // 플러그인으로 등록\r
\`\`\`\r
\r
그러고 나서 \`src/App.vue\` 파일을 열고, 다음과 같이 \`router-view\` 태그를 입력합니다.\r
\r
\`\`\`js\r
<template>\r
  <main>\r
    <header>헤더</header>\r
    <router-view></router-view>\r
    <header>푸터</header>\r
  </main>\r
</template>\r
\r
<style scoped>\r
main {\r
  display: flex;\r
  flex-direction: column;\r
}\r
</style>\r
\`\`\`\r
\r
다음으로 \`src/views/HomeView.vue\` 파일을 열고, 다음과 같이 입력합니다.\r
\`\`\`js\r
<template>\r
  <div>홈 화면</div>\r
</template>\r
\`\`\`\r
\r
그러고 나서 애플리케이션 실행 후 루트 경로(\`/\`)에 접속하면 다음과 같은 화면이 뜹니다.\r
\r
![홈 페이지](/assets/posts/1/screenshot1.png)\r
*루트 경로 접속 화면*\r
\r
다음으로 \`src/views/AboutView.vue\` 파일을 열고, 다음과 같이 입력합니다.\r
\`\`\`js\r
<template>\r
  <div>소개 화면</div>\r
</template>\r
\`\`\`\r
\r
그러고 나서 소개 화면 경로(\`/about\`)에 접속하면 다음과 같은 화면이 뜹니다.\r
\r
![소개 페이지](/assets/posts/1/screenshot2.png)\r
*소개 화면 경로 접속 화면*\r
\r
라우터가 루트 경로(\`/\`)에는 \`HomeView.vue\` 컴포넌트를, 소개 화면 경로(\`/about\`)에는 \`AboutView.vue\` 컴포넌트를 연결한 것입니다. 아래는 이전에 정의한 연결 경로 배열입니다.\r
\r
\`\`\`js\r
routes: [ // 연결 경로\r
{\r
  path: '/',\r
  name: 'home',\r
  component: HomeView,\r
},\r
{\r
  path: '/about',\r
  name: 'about',\r
  component: () => import('../views/AboutView.vue'),\r
},\r
\`\`\`\r
\r
이렇게 해서 라우터에 대해 알아봤습니다.`;function s(n,e){return l(),p(u,null,[e[0]||(e[0]=t("p",null,"라우터는 URL과 컴포넌트를 연결해주는 역할을 합니다. 예를 들어 사용자가 로그인 URL로 접속하면 로그인 컴포넌트를 연결하고, 장바구니 URL로 접속하면 장바구니 컴포넌트를 연결해주는 것이죠. 마치 영화 감독이 상황에 따라 어떤 장면을 촬영할 건지 결정하는 것과 비슷합니다.",-1)),e[1]||(e[1]=t("p",null,[t("img",{src:"/assets/posts/1/meme1.png",alt:"김연경 밈"}),t("em",null,"장바구니 화면 띄우라고")],-1)),e[2]||(e[2]=t("p",null,[r("아래 "),t("code",null,"src/router/index.js"),r(" 파일의 코드를 통해 더 구체적으로 살펴볼까요?")],-1)),e[3]||(e[3]=t("pre",null,[t("code",{class:"language-js","v-pre":"true"},`import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({ // 라우터 객체 생성
  history: createWebHistory(import.meta.env.BASE_URL), // 히스토리 모드
  routes: [ // 연결 경로
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
`)],-1)),e[4]||(e[4]=t("p",null,[r("위 코드는 "),t("code",null,"createRouter()"),r(" 메서드를 호출해 라우터 객체를 생성한 것입니다. 호출 시 인수로 전달한 객체 부분을 더 살펴보겠습니다.")],-1)),e[5]||(e[5]=t("ul",null,[t("li",null,[r("히스토리 모드(history) "),t("ul",null,[t("li",null,"createWebHistory: HTML5 모드입니다. (예: a.com/user/1)"),t("li",null,"createWebHashHistory: 해시 모드입니다. (예: a.com/#/user/1)")])])],-1)),e[6]||(e[6]=t("pre",null,[t("code",{class:"language-txt","v-pre":"true"},`* 해시 모드는 검색 엔진 최적화(SEO)에 좋지 않기 때문에 HTML5 모드를 권장합니다.
`)],-1)),e[7]||(e[7]=o("<ul><li>연결 경로(routes) <ul><li>path: URL 경로를 입력합니다.</li><li>component: URL 경로에 연결할 컴포넌트를 지정합니다. 상단에 컴포넌트를 미리 임포트하는 방식을 &quot;정적 임포트&quot;, 함수로 임포트하는 방식을 &quot;동적 임포트&quot;라고 합니다.</li></ul></li></ul><table><thead><tr><th>방식</th><th>설명</th><th>전환 속도</th><th>초기 로드 속도</th></tr></thead><tbody><tr><td>정적 임포트</td><td>컴포넌트 미리 로드</td><td>빠름</td><td>느림</td></tr><tr><td>동적 임포트</td><td>컴포넌트 필요 시 로드</td><td>느림</td><td>빠름</td></tr></tbody></table><p>위에서 생성된 라우터 객체를 Vue 애플리케이션에 적용하려면 어떻게 해야 할까요? 다음과 같이 <code>src/main.js</code> 파일에서 <code>use()</code> 메서드를 호출하여 플러그인으로 등록해야 합니다.</p>",3)),e[8]||(e[8]=t("pre",null,[t("code",{class:"language-js","v-pre":"true"},`const app = createApp(App);
app.use(router); // 플러그인으로 등록
`)],-1)),e[9]||(e[9]=t("p",null,[r("그러고 나서 "),t("code",null,"src/App.vue"),r(" 파일을 열고, 다음과 같이 "),t("code",null,"router-view"),r(" 태그를 입력합니다.")],-1)),e[10]||(e[10]=t("pre",null,[t("code",{class:"language-js","v-pre":"true"},`<template>
  <main>
    <header>헤더</header>
    <router-view></router-view>
    <header>푸터</header>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>
`)],-1)),e[11]||(e[11]=t("p",null,[r("다음으로 "),t("code",null,"src/views/HomeView.vue"),r(" 파일을 열고, 다음과 같이 입력합니다.")],-1)),e[12]||(e[12]=t("pre",null,[t("code",{class:"language-js","v-pre":"true"},`<template>
  <div>홈 화면</div>
</template>
`)],-1)),e[13]||(e[13]=t("p",null,[r("그러고 나서 애플리케이션 실행 후 루트 경로("),t("code",null,"/"),r(")에 접속하면 다음과 같은 화면이 뜹니다.")],-1)),e[14]||(e[14]=t("p",null,[t("img",{src:"/assets/posts/1/screenshot1.png",alt:"홈 페이지"}),t("em",null,"루트 경로 접속 화면")],-1)),e[15]||(e[15]=t("p",null,[r("다음으로 "),t("code",null,"src/views/AboutView.vue"),r(" 파일을 열고, 다음과 같이 입력합니다.")],-1)),e[16]||(e[16]=t("pre",null,[t("code",{class:"language-js","v-pre":"true"},`<template>
  <div>소개 화면</div>
</template>
`)],-1)),e[17]||(e[17]=o('<p>그러고 나서 소개 화면 경로(<code>/about</code>)에 접속하면 다음과 같은 화면이 뜹니다.</p><p><img src="/assets/posts/1/screenshot2.png" alt="소개 페이지"><em>소개 화면 경로 접속 화면</em></p><p>라우터가 루트 경로(<code>/</code>)에는 <code>HomeView.vue</code> 컴포넌트를, 소개 화면 경로(<code>/about</code>)에는 <code>AboutView.vue</code> 컴포넌트를 연결한 것입니다. 아래는 이전에 정의한 연결 경로 배열입니다.</p>',3)),e[18]||(e[18]=t("pre",null,[t("code",{class:"language-js","v-pre":"true"},`routes: [ // 연결 경로
{
  path: '/',
  name: 'home',
  component: HomeView,
},
{
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue'),
},
`)],-1)),e[19]||(e[19]=t("p",null,"이렇게 해서 라우터에 대해 알아봤습니다.",-1))],64)}const a={render:s};a.__hmrId="C:/J/repositories/africalib/src/data/posts/1.md";const v=n=>({components:n,render:s});export{a as VueComponent,v as VueComponentWith,i as attributes,m as html,c as markdown};
