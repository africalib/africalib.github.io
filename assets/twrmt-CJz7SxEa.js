import{a as r}from"./index-OWtPmFFj.js";const i={},p=`<div class="slide-text" data-slide-text-group="1">
    앞서 인터넷을 통해 친구의 컴퓨터에 접속할 수 있다고 이야기했죠. 하지만 실제로 친구의 컴퓨터에 직접 접속하는 일은 거의 없습니다. 대부분은 인터넷을 통해 친구가 파일을 올려놓은 별도의 컴퓨터에 접속하게
    됩니다. 이때 친구가 파일을 올려놓은 컴퓨터를 서버(server)라고 부릅니다.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/twrmt/hw_server.png" alt="하드웨어 관점으로 보는 서버" class="w-100 lined" />
    <figcaption>
        <span>하드웨어 관점으로 보는 </span>
        <b>서버</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="1">
    친구는 자신의 컴퓨터로 인터넷을 통해 서버에 파일을 올리고, 나는 내 컴퓨터로 서버에 접속해 파일을 받았습니다. 이때 친구와 나의 컴퓨터를 클라이언트(client)라고 합니다.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/twrmt/hw_client.png" alt="하드웨어 관점으로 보는 클라이언트" class="w-100 lined" />
    <figcaption>
        <span>하드웨어 관점으로 보는 </span>
        <b>클라이언트</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="1">
    정리하면, 데이터를 저장하고 제공하는 컴퓨터를 서버, 데이터를 올리거나 내려받는 컴퓨터를 클라이언트라고 합니다. 하드웨어 관점에서 서버에는 타워 서버, 랙 서버 등이 있고, 클라이언트에는 데스크톱,
    랩톱(노트북), 스마트폰 등이 있습니다. 그리고 클라이언트와 서버는 인터넷을 통해 데이터를 주고받습니다. 이렇게 데이터를 주고받는 과정을 통신이라고 합니다.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/twrmt/hw_client_server.png" alt="하드웨어 관점으로 보는 클라이언트" class="w-100 lined" />
    <figcaption>
        <span>하드웨어 관점으로 보는 </span>
        <b>클라이언트</b><span>와</span><b>서버</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="1">
    그럼 소프트웨어 관점에서 서버와 클라이언트는 무엇일까요? 쉽게 이해하기 위해 일상에 비유해보겠습니다.
    <br />
    여러분이 식당에 가서 음식을 주문하고, 식사를 마친 뒤 카페에 가서 커피를 주문한다고 가정해봅시다. 잠시 후에 주문한 커피를 받습니다. 여기서 반복되는 행위는 바로 주문입니다. 주문을 하는 사람은 고객,
    주문을 받는 사람은 직원이죠.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/twrmt/order.png" alt="고객과 직원" class="w-100 lined" />
    <figcaption>
        <b>고객</b><span>과 </span><b>직원</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="1">
    이 관계를 클라이언트와 서버에 적용하면, 중요한 단어는 요청입니다. 요청을 하는 주체를 기준으로 구분하면 됩니다.
    사용자에게 입력을 받아 요청하고, 요청에 대한 결과를 사용자에게 보여주는 프로그램은 클라이언트입니다. 그리고 클라이언트로부터 요청을 받아 처리하고 결과를 응답하는 프로그램은 서버입니다.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/twrmt/sw_client_server.png" alt="소프트웨어 관점으로 보는 클라이언트와 서버"
        class="w-100 lined" />
    <figcaption>
        <span>소프트웨어 관점으로 보는 </span>
        <b>클라이언트</b><span>와 </span><b>서버</b>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>
<br />
<div class="slide-text" data-slide-text-group="1">
    이처럼 각자의 역할에 따라 클라이언트와 서버를 구분할 수 있습니다. 특히 웹 개발에서는 클라이언트가 주로 웹 브라우저를 의미합니다. 대표적인 웹 브라우저로는 구글 크롬, 파이어폭스, 사파리 등이 있습니다.
    그리고 웹 브라우저의 요청을 받아 처리하는 서버는 일반적으로 웹 서버라고 부릅니다. 대표적인 웹 서버로는 NGINX, Apache가 있습니다.
</div>
<br />
<figure class="slide-item">
    <img src="/assets/courses/qkmqd/koadr/twrmt/sw_client_server_programs.png" alt="클라이언트와 서버의 대표적인 소프트웨어"
        class="w-100 lined" />
    <figcaption>
        <b>클라이언트</b><span>와 </span><b>서버</b><span>의 </span>
        <span>대표적인 소프트웨어</span>
        <span data-bs-toggle="popover"></span>
    </figcaption>
</figure>`,d=`<div class="slide-text" data-slide-text-group="1">\r
    앞서 인터넷을 통해 친구의 컴퓨터에 접속할 수 있다고 이야기했죠. 하지만 실제로 친구의 컴퓨터에 직접 접속하는 일은 거의 없습니다. 대부분은 인터넷을 통해 친구가 파일을 올려놓은 별도의 컴퓨터에 접속하게\r
    됩니다. 이때 친구가 파일을 올려놓은 컴퓨터를 서버(server)라고 부릅니다.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/twrmt/hw_server.png" alt="하드웨어 관점으로 보는 서버" class="w-100 lined" />\r
    <figcaption>\r
        <span>하드웨어 관점으로 보는 </span>\r
        <b>서버</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="1">\r
    친구는 자신의 컴퓨터로 인터넷을 통해 서버에 파일을 올리고, 나는 내 컴퓨터로 서버에 접속해 파일을 받았습니다. 이때 친구와 나의 컴퓨터를 클라이언트(client)라고 합니다.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/twrmt/hw_client.png" alt="하드웨어 관점으로 보는 클라이언트" class="w-100 lined" />\r
    <figcaption>\r
        <span>하드웨어 관점으로 보는 </span>\r
        <b>클라이언트</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="1">\r
    정리하면, 데이터를 저장하고 제공하는 컴퓨터를 서버, 데이터를 올리거나 내려받는 컴퓨터를 클라이언트라고 합니다. 하드웨어 관점에서 서버에는 타워 서버, 랙 서버 등이 있고, 클라이언트에는 데스크톱,\r
    랩톱(노트북), 스마트폰 등이 있습니다. 그리고 클라이언트와 서버는 인터넷을 통해 데이터를 주고받습니다. 이렇게 데이터를 주고받는 과정을 통신이라고 합니다.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/twrmt/hw_client_server.png" alt="하드웨어 관점으로 보는 클라이언트" class="w-100 lined" />\r
    <figcaption>\r
        <span>하드웨어 관점으로 보는 </span>\r
        <b>클라이언트</b><span>와</span><b>서버</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="1">\r
    그럼 소프트웨어 관점에서 서버와 클라이언트는 무엇일까요? 쉽게 이해하기 위해 일상에 비유해보겠습니다.\r
    <br />\r
    여러분이 식당에 가서 음식을 주문하고, 식사를 마친 뒤 카페에 가서 커피를 주문한다고 가정해봅시다. 잠시 후에 주문한 커피를 받습니다. 여기서 반복되는 행위는 바로 주문입니다. 주문을 하는 사람은 고객,\r
    주문을 받는 사람은 직원이죠.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/twrmt/order.png" alt="고객과 직원" class="w-100 lined" />\r
    <figcaption>\r
        <b>고객</b><span>과 </span><b>직원</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="1">\r
    이 관계를 클라이언트와 서버에 적용하면, 중요한 단어는 요청입니다. 요청을 하는 주체를 기준으로 구분하면 됩니다.\r
    사용자에게 입력을 받아 요청하고, 요청에 대한 결과를 사용자에게 보여주는 프로그램은 클라이언트입니다. 그리고 클라이언트로부터 요청을 받아 처리하고 결과를 응답하는 프로그램은 서버입니다.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/twrmt/sw_client_server.png" alt="소프트웨어 관점으로 보는 클라이언트와 서버"\r
        class="w-100 lined" />\r
    <figcaption>\r
        <span>소프트웨어 관점으로 보는 </span>\r
        <b>클라이언트</b><span>와 </span><b>서버</b>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>\r
<br />\r
<div class="slide-text" data-slide-text-group="1">\r
    이처럼 각자의 역할에 따라 클라이언트와 서버를 구분할 수 있습니다. 특히 웹 개발에서는 클라이언트가 주로 웹 브라우저를 의미합니다. 대표적인 웹 브라우저로는 구글 크롬, 파이어폭스, 사파리 등이 있습니다.\r
    그리고 웹 브라우저의 요청을 받아 처리하는 서버는 일반적으로 웹 서버라고 부릅니다. 대표적인 웹 서버로는 NGINX, Apache가 있습니다.\r
</div>\r
<br />\r
<figure class="slide-item">\r
    <img src="/assets/courses/qkmqd/koadr/twrmt/sw_client_server_programs.png" alt="클라이언트와 서버의 대표적인 소프트웨어"\r
        class="w-100 lined" />\r
    <figcaption>\r
        <b>클라이언트</b><span>와 </span><b>서버</b><span>의 </span>\r
        <span>대표적인 소프트웨어</span>\r
        <span data-bs-toggle="popover"></span>\r
    </figcaption>\r
</figure>`;function a(s,n){return n[0]||(n[0]=r('<div class="slide-text" data-slide-text-group="1"> 앞서 인터넷을 통해 친구의 컴퓨터에 접속할 수 있다고 이야기했죠. 하지만 실제로 친구의 컴퓨터에 직접 접속하는 일은 거의 없습니다. 대부분은 인터넷을 통해 친구가 파일을 올려놓은 별도의 컴퓨터에 접속하게 됩니다. 이때 친구가 파일을 올려놓은 컴퓨터를 서버(server)라고 부릅니다. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/twrmt/hw_server.png" alt="하드웨어 관점으로 보는 서버" class="w-100 lined"><figcaption><span>하드웨어 관점으로 보는 </span><b>서버</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="1"> 친구는 자신의 컴퓨터로 인터넷을 통해 서버에 파일을 올리고, 나는 내 컴퓨터로 서버에 접속해 파일을 받았습니다. 이때 친구와 나의 컴퓨터를 클라이언트(client)라고 합니다. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/twrmt/hw_client.png" alt="하드웨어 관점으로 보는 클라이언트" class="w-100 lined"><figcaption><span>하드웨어 관점으로 보는 </span><b>클라이언트</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="1"> 정리하면, 데이터를 저장하고 제공하는 컴퓨터를 서버, 데이터를 올리거나 내려받는 컴퓨터를 클라이언트라고 합니다. 하드웨어 관점에서 서버에는 타워 서버, 랙 서버 등이 있고, 클라이언트에는 데스크톱, 랩톱(노트북), 스마트폰 등이 있습니다. 그리고 클라이언트와 서버는 인터넷을 통해 데이터를 주고받습니다. 이렇게 데이터를 주고받는 과정을 통신이라고 합니다. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/twrmt/hw_client_server.png" alt="하드웨어 관점으로 보는 클라이언트" class="w-100 lined"><figcaption><span>하드웨어 관점으로 보는 </span><b>클라이언트</b><span>와</span><b>서버</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="1"> 그럼 소프트웨어 관점에서 서버와 클라이언트는 무엇일까요? 쉽게 이해하기 위해 일상에 비유해보겠습니다. <br> 여러분이 식당에 가서 음식을 주문하고, 식사를 마친 뒤 카페에 가서 커피를 주문한다고 가정해봅시다. 잠시 후에 주문한 커피를 받습니다. 여기서 반복되는 행위는 바로 주문입니다. 주문을 하는 사람은 고객, 주문을 받는 사람은 직원이죠. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/twrmt/order.png" alt="고객과 직원" class="w-100 lined"><figcaption><b>고객</b><span>과 </span><b>직원</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="1"> 이 관계를 클라이언트와 서버에 적용하면, 중요한 단어는 요청입니다. 요청을 하는 주체를 기준으로 구분하면 됩니다. 사용자에게 입력을 받아 요청하고, 요청에 대한 결과를 사용자에게 보여주는 프로그램은 클라이언트입니다. 그리고 클라이언트로부터 요청을 받아 처리하고 결과를 응답하는 프로그램은 서버입니다. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/twrmt/sw_client_server.png" alt="소프트웨어 관점으로 보는 클라이언트와 서버" class="w-100 lined"><figcaption><span>소프트웨어 관점으로 보는 </span><b>클라이언트</b><span>와 </span><b>서버</b><span data-bs-toggle="popover"></span></figcaption></figure><br><div class="slide-text" data-slide-text-group="1"> 이처럼 각자의 역할에 따라 클라이언트와 서버를 구분할 수 있습니다. 특히 웹 개발에서는 클라이언트가 주로 웹 브라우저를 의미합니다. 대표적인 웹 브라우저로는 구글 크롬, 파이어폭스, 사파리 등이 있습니다. 그리고 웹 브라우저의 요청을 받아 처리하는 서버는 일반적으로 웹 서버라고 부릅니다. 대표적인 웹 서버로는 NGINX, Apache가 있습니다. </div><br><figure class="slide-item"><img src="/assets/courses/qkmqd/koadr/twrmt/sw_client_server_programs.png" alt="클라이언트와 서버의 대표적인 소프트웨어" class="w-100 lined"><figcaption><b>클라이언트</b><span>와 </span><b>서버</b><span>의 </span><span>대표적인 소프트웨어</span><span data-bs-toggle="popover"></span></figcaption></figure>',23))}const e={render:a};e.__hmrId="C:/J/repositories/africalib/src/data/courses/qkmqd/koadr/twrmt.md";const l=s=>({components:s,render:a});export{e as VueComponent,l as VueComponentWith,i as attributes,p as html,d as markdown};
