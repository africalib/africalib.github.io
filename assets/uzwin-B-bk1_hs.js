import{a as e}from"./index-OWtPmFFj.js";const i={},d=`<div class="slide-text" data-slide-text-group="1">
    앞에서 살펴본 것처럼 HTTP(Hypertext Transfer Protocol)는 웹에서 HTML(Hypertext Markup Language) 등 다양한 데이터를 주고받기 위한 통신 규약입니다.
    이때, HTTP를 활용해 클라이언트가 서버에 요청하는 것을 HTTP 요청이라고 하고,
    서버가 클라이언트에게 응답하는 것을 HTTP 응답이라고 합니다.
    즉, 웹 브라우저는 HTTP 포트(80번)를 통해 웹 서버와 연결되고,
    HTTP 요청과 응답을 주고받으며 통신하게 되는 것입니다.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/uzwin/talk.png" alt="HTTP 요청과 HTP 응답" class="w-100" />
    <figcaption>
        <b>HTTP 요청</b><span>과 </span><b>HTP 응답</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="2">
    <p>
        웹 브라우저가 웹 서버로 HTTP 요청을 보낼 때는 여러 방식이 사용되는데,
        이를 HTTP 요청 메서드(request method)라고 합니다.
        자주 쓰이는 HTTP 요청 메서드는 다음과 같습니다.
    </p>
    - GET: 서버의 데이터를 조회할 때 사용. 예) 쇼핑몰의 상품 데이터를 조회<br />
    - POST: 서버에 데이터를 추가할 때 사용. 예) 쇼핑몰에 새로운 상품을 데이터에 추가<br />
    - PUT: 서버의 데이터를 수정할 때 사용. 예) 쇼핑몰의 상품 정보 데이터를 수정<br />
    - DELETE: 서버의 데이터를 삭제할 때 사용. 예) 쇼핑몰의 상품 정보 데이터를 삭제
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/uzwin/methods.png" alt="자주 사용되는 HTTP 요청 메서드" class="w-100 lined" />
    <figcaption>
        <span>자주 사용되는 </span><b>HTTP 요청 메서드</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="3">
    <p>
        반대로, 웹 서버가 웹 브라우저의 요청에 대해 응답할 때는 HTTP 상태 코드(status code)를 사용합니다.
        이 코드는 요청 처리 결과를 간단히 나타내는 목적으로 사용됩니다.
        자주 사용되는 HTTP 상태 코드는 다음과 같습니다.
    </p>
    - 200(OK): 클라이언트의 요청을 서버가 정상적으로 처리<br />
    - 400(Bad Request): 클라이언트가 서버에 요청한 내용에 문제가 있음<br />
    - 401(Unauthorized): 클라이언트가 서버에서 요구하는 인증을 제공하지 않거나 인증되지 않음<br />
    - 404(Not Found): 클라이언트가 서버에 요청한 데이터를 찾을 수 없음
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/uzwin/codes.png" alt="자주 사용되는 HTTP 요청 메서드" class="w-100 lined" />
    <figcaption>
        <span>자주 사용되는 </span><b>HTTP 상태 코드</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="3">
    이외에도 409(Conflict; 충돌 데이터가 있음), 500(Internal Server Error; 서버 내부 오류)이 있습니다.
</div>`,o=`<div class="slide-text" data-slide-text-group="1">\r
    앞에서 살펴본 것처럼 HTTP(Hypertext Transfer Protocol)는 웹에서 HTML(Hypertext Markup Language) 등 다양한 데이터를 주고받기 위한 통신 규약입니다.\r
    이때, HTTP를 활용해 클라이언트가 서버에 요청하는 것을 HTTP 요청이라고 하고,\r
    서버가 클라이언트에게 응답하는 것을 HTTP 응답이라고 합니다.\r
    즉, 웹 브라우저는 HTTP 포트(80번)를 통해 웹 서버와 연결되고,\r
    HTTP 요청과 응답을 주고받으며 통신하게 되는 것입니다.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/uzwin/talk.png" alt="HTTP 요청과 HTP 응답" class="w-100" />\r
    <figcaption>\r
        <b>HTTP 요청</b><span>과 </span><b>HTP 응답</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="2">\r
    <p>\r
        웹 브라우저가 웹 서버로 HTTP 요청을 보낼 때는 여러 방식이 사용되는데,\r
        이를 HTTP 요청 메서드(request method)라고 합니다.\r
        자주 쓰이는 HTTP 요청 메서드는 다음과 같습니다.\r
    </p>\r
    - GET: 서버의 데이터를 조회할 때 사용. 예) 쇼핑몰의 상품 데이터를 조회<br />\r
    - POST: 서버에 데이터를 추가할 때 사용. 예) 쇼핑몰에 새로운 상품을 데이터에 추가<br />\r
    - PUT: 서버의 데이터를 수정할 때 사용. 예) 쇼핑몰의 상품 정보 데이터를 수정<br />\r
    - DELETE: 서버의 데이터를 삭제할 때 사용. 예) 쇼핑몰의 상품 정보 데이터를 삭제\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/uzwin/methods.png" alt="자주 사용되는 HTTP 요청 메서드" class="w-100 lined" />\r
    <figcaption>\r
        <span>자주 사용되는 </span><b>HTTP 요청 메서드</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="3">\r
    <p>\r
        반대로, 웹 서버가 웹 브라우저의 요청에 대해 응답할 때는 HTTP 상태 코드(status code)를 사용합니다.\r
        이 코드는 요청 처리 결과를 간단히 나타내는 목적으로 사용됩니다.\r
        자주 사용되는 HTTP 상태 코드는 다음과 같습니다.\r
    </p>\r
    - 200(OK): 클라이언트의 요청을 서버가 정상적으로 처리<br />\r
    - 400(Bad Request): 클라이언트가 서버에 요청한 내용에 문제가 있음<br />\r
    - 401(Unauthorized): 클라이언트가 서버에서 요구하는 인증을 제공하지 않거나 인증되지 않음<br />\r
    - 404(Not Found): 클라이언트가 서버에 요청한 데이터를 찾을 수 없음\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/uzwin/codes.png" alt="자주 사용되는 HTTP 요청 메서드" class="w-100 lined" />\r
    <figcaption>\r
        <span>자주 사용되는 </span><b>HTTP 상태 코드</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="3">\r
    이외에도 409(Conflict; 충돌 데이터가 있음), 500(Internal Server Error; 서버 내부 오류)이 있습니다.\r
</div>`;function r(n,s){return s[0]||(s[0]=e('<div class="slide-text" data-slide-text-group="1"> 앞에서 살펴본 것처럼 HTTP(Hypertext Transfer Protocol)는 웹에서 HTML(Hypertext Markup Language) 등 다양한 데이터를 주고받기 위한 통신 규약입니다. 이때, HTTP를 활용해 클라이언트가 서버에 요청하는 것을 HTTP 요청이라고 하고, 서버가 클라이언트에게 응답하는 것을 HTTP 응답이라고 합니다. 즉, 웹 브라우저는 HTTP 포트(80번)를 통해 웹 서버와 연결되고, HTTP 요청과 응답을 주고받으며 통신하게 되는 것입니다. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/uzwin/talk.png" alt="HTTP 요청과 HTP 응답" class="w-100"><figcaption><b>HTTP 요청</b><span>과 </span><b>HTP 응답</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="2"><p> 웹 브라우저가 웹 서버로 HTTP 요청을 보낼 때는 여러 방식이 사용되는데, 이를 HTTP 요청 메서드(request method)라고 합니다. 자주 쓰이는 HTTP 요청 메서드는 다음과 같습니다. </p> - GET: 서버의 데이터를 조회할 때 사용. 예) 쇼핑몰의 상품 데이터를 조회<br> - POST: 서버에 데이터를 추가할 때 사용. 예) 쇼핑몰에 새로운 상품을 데이터에 추가<br> - PUT: 서버의 데이터를 수정할 때 사용. 예) 쇼핑몰의 상품 정보 데이터를 수정<br> - DELETE: 서버의 데이터를 삭제할 때 사용. 예) 쇼핑몰의 상품 정보 데이터를 삭제 </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/uzwin/methods.png" alt="자주 사용되는 HTTP 요청 메서드" class="w-100 lined"><figcaption><span>자주 사용되는 </span><b>HTTP 요청 메서드</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="3"><p> 반대로, 웹 서버가 웹 브라우저의 요청에 대해 응답할 때는 HTTP 상태 코드(status code)를 사용합니다. 이 코드는 요청 처리 결과를 간단히 나타내는 목적으로 사용됩니다. 자주 사용되는 HTTP 상태 코드는 다음과 같습니다. </p> - 200(OK): 클라이언트의 요청을 서버가 정상적으로 처리<br> - 400(Bad Request): 클라이언트가 서버에 요청한 내용에 문제가 있음<br> - 401(Unauthorized): 클라이언트가 서버에서 요구하는 인증을 제공하지 않거나 인증되지 않음<br> - 404(Not Found): 클라이언트가 서버에 요청한 데이터를 찾을 수 없음 </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/uzwin/codes.png" alt="자주 사용되는 HTTP 요청 메서드" class="w-100 lined"><figcaption><span>자주 사용되는 </span><b>HTTP 상태 코드</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="3"> 이외에도 409(Conflict; 충돌 데이터가 있음), 500(Internal Server Error; 서버 내부 오류)이 있습니다. </div>',13))}const t={render:r};t.__hmrId="C:/J/repositories/africalib/src/data/courses/qkmqd/koadr/uzwin.md";const T=n=>({components:n,render:r});export{t as VueComponent,T as VueComponentWith,i as attributes,d as html,o as markdown};
