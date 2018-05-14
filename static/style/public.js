// 所有页面公用js

$(document).ready( function() {


	// 头部公用组件
	if( $("#header").length > 0 ){
		headerComponent();
	}


	// 底部公用组件
	if( $("#header").length > 0 ){
		footerComponent();
	}
	

	// 中英文切换
	$(".lang-dropdown").click(function(){
		var languageAnimate = new TimelineMax();
		languageAnimate.clear();

		if( $(".languageMenu").hasClass("show") ){
			$(".languageMenu").removeClass("show");
			languageAnimate.to(".languageMenu",.2,{
				height: 0,
				onComplete: function(){
					$(".languageMenu").css("border-color","transparent");
				}
			});
		}else{
			$(".languageMenu").addClass("show");
			languageAnimate.to(".languageMenu",.2,{height: 70,"border-color":"#c8c5bf"});
		}
		return false;
	})


	$("body").click(function(){
		var bodyLanguageAnimate = new TimelineMax();
		if( $(".languageMenu").hasClass("show") ){
			$(".languageMenu").removeClass("show");
			bodyLanguageAnimate.to(".languageMenu",.2,{
				height: 0,
				onComplete: function(){
					$(".languageMenu").css("border-color","transparent");
				}
			});
		}

		if( $(".modal").length > 0 ){
			$(".modal").remove();
		}
	})


	// 移动端导航
	$("#sidenav-toggle").click(function(){
		var submenuAnimate = new TimelineMax();
		submenuAnimate.clear();

		if( $("#sidenav-toggle i").hasClass("icon-reorder") ){
			$("#sidenav-toggle i").removeClass("icon-reorder").addClass("icon-remove");
			submenuAnimate.to(".header",.3,{height:300})
		}else{
			$("#sidenav-toggle i").removeClass("icon-remove").addClass("icon-reorder");
			submenuAnimate.to(".header",.3,{height:80})
		}
		return false;
	})



	// 返回顶部
	$(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });


    // footer 点击微信图标，出现二维码
    $(".weixin").click(function(){
    	var str = '<div class="modal"><div class="modal-weixin"></div></div>';
    	$("body").append(str);
    	// $(".modal").show();
    	return false;
    })
});



// 头部公用组件
function headerComponent(){

	// 全局注册
	Vue.component("header-menu",{
	    template: '<div class="container headerCon">' +
			'<div class="logo f-left"><a href="index.html"><img src="images/logo.jpg" alt="Adinall" /></a></div>' +
			'<a href="javascript:;" class="toggle" id="sidenav-toggle"><i class="icon-reorder"></i></a>' +
			'<nav class="nav f-left">' +
				'<ul class="sidenav-menu" id="sidenav-menu">' +
					'<li><a href="index.html"><span>首 页</span></a></li>' +
					'<li><a href="advertising.html"><span>广告主</span></a></li>' +
					'<li><a href="publishers.html"><span>开发者</span></a></li>' +
					'<li><a href="about.html"><span>关于聚告</span></a></li>' +
					'<li><a href="join.html"><span>招贤纳士</span></a></li>' +
					'<li><a href="contact.html"><span>联系我们</span></a></li>' +
				'</ul>' +
			'</nav>' +
			'<div class="login f-right">' +
				'<div class="language f-left">' +
					'<span class="lang-dropdown lang cn">中文</span>' +
					'<ul class="languageMenu">' +
						'<li><a href="../en/index.html" class="lang en">English</a></li>' +
						'<li><a href="../zh/index.html" class="lang cn">中文</a></li>' +
					'</ul>' +
				'</div>' +
				'<div class="short-line"></div>' +
				'<div class="login-icon f-right">' +
					'<a href="http://oa.adinall.com/tologin" target="_blank"><i class="icon-user"></i><span>注册/登录</span></a>' +
				'</div>' +
			'</div>' +
		'</div>'
	});


	// Vue实例
	new Vue({
	    el: "#header"
	});
}


// 底部公用组件
function footerComponent(){
	// 全局注册
	Vue.component("footer-menu",{
	    template: '<div class="container">' +
				'<div class="row footerMenu">' +
					'<div class="col-md-2 col-xs-3">' +
						'<h4>快捷入口</h4>' +
						'<p><a href="advertising.html">广告主</a></p>' +
						'<p><a href="publishers.html">开发者</a></p>' +
						'<p><a href="about.html">关于聚告</a></p>' +
						'<p><a href="join.html">招贤纳士</a></p>' +
						'<p><a href="contact.html">联系我们</a></p>' +
						'<div class="social-show-phone">' +
							'<h4>关注我们</h4>' +
							'<div class="social-links">' +
								'<a target="_blank" href="javascript:;"><i class="icon-facebook"></i></a>' +
								'<a target="_blank" href="javascript:;"><i class="icon-linkedin"></i></a>' +
								'<a target="_blank" href="javascript:;"><i class="icon-twitter"></i></a>' +
								'<a target="_blank" href="javascript:;" class="weixin"><i class="icon-weixin"></i></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-8 col-xs-9">' +
						'<div class="row">' +
							'<div class="col-md-6 col-xs-6 max-width-280">' +
								'<h4>联系我们</h4>' +
								'<p class="yellowTitle">上海办公地址</p>' +
								'<p>地址：上海市静安区武定路1088号阳光科技广场14号10楼BC座</p>' +
								'<p>电话：021-6524-9466</p>' +
								'<p class="yellowTitle mt25">广州办公地址</p>' +
								'<p>地址：广州市天河区珠江新城花城大道87号高德置地广场A座2904A</p>' +
								'<p>电话：020-3847-5039</p>' +
							'</div>' +
							'<div class="col-md-6 col-xs-6 max-width-280 mtl">' +
								'<p class="yellowTitle">北京办公地址</p>' +
								'<p>地址：北京市朝阳区阜通东大街1号望京SOHO塔1，C座132211</p>' +
								'<p>电话：010-8471-2066</p>' +
								'<hr>' +
								'<p><span>商务合作：</span><span><a href="mailto:bd@adinall.com">bd@adinall.com</a></span></p>' +
								'<p><span>产品技术支持：</span><span><a href="mailto:support@adinall.com">support@adinall.com</a></span></p>' +
								'<p><span>聚告招聘：</span><span><a href="mailto:recruit@adinall.com">recruit@adinall.com</a></span></p>' +
								'<p><span>资本合作：</span><span><a href="mailto:capital@adinall.com">capital@adinall.com</a></span></p>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2 social-hide-phone">' +
						'<h4>关注我们</h4>' +
						'<div class="social-links">' +
							'<a target="_blank" href="javascript:;"><i class="icon-facebook"></i></a>' +
							'<a target="_blank" href="javascript:;"><i class="icon-linkedin"></i></a>' +
							'<a target="_blank" href="javascript:;"><i class="icon-twitter"></i></a>' +
							'<a target="_blank" href="javascript:;" class="weixin"><i class="icon-weixin"></i></a>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="copyright">' +
					'<p><a href="index.html"><img src="images/logo.png" alt="Adinall" /></a></p>' +
					'<p>沪ICP备13026617号-1</p>' +
					'<p>上海聚告德业广告有限公司   版权所有</p>' +
				'</div>' +
			'</div>'
	});


	// Vue实例
	new Vue({
	    el: "#footer"
	});
}


// 检查是否是移动端（Mobile）、ipad、iphone、微信、QQ等
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


// 获取当前设备的宽高
function view(){
	return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}


// 判断滚动条方向
function scrollDirect(fn) {  
    var beforeScrollTop = document.body.scrollTop;  
    fn = fn || function () {  
    };  
    window.addEventListener("scroll", function (event) {  
        event = event || window.event;  
  
        var afterScrollTop = document.body.scrollTop;  
        delta = afterScrollTop - beforeScrollTop;  
        beforeScrollTop = afterScrollTop;  
  
        var scrollTop = $(this).scrollTop();  
        var scrollHeight = $(document).height();  
        var windowHeight = $(this).height();  
        /*if (scrollTop + windowHeight > scrollHeight - 10) {  //滚动到底部执行事件  
            fn('up');  
            return;  
        } */ 
        if (afterScrollTop < 10 || afterScrollTop > $(document.body).height - 10) {  
            fn('up');  
        } else {  
            if (Math.abs(delta) < 10) {  
                return false;  
            }  
            fn(delta > 0 ? "down" : "up");  
        }  
    }, false);  
}  
