// JavaScript Document

$(document).ready( function() {

	// 首页合作伙伴无缝滚动
	if( $(".partnerLists").length > 0 ){
		partnerCarousel();
	}
	

	// 首页广告形式切换
	$('.Tab2 a').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.ad-list').hide();
		$('.ad-list').eq( $(this).index() ).show();
		$('.con-group').hide();
		$('.con-group').eq( $(this).index() ).show();
	})
	
	$('.Tab1 a').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().siblings('p').removeClass('show');
		$(this).parent().siblings('p').eq( $(this).index() ).addClass('show');
		
		var _this = $(this);
		
		$('.con-group').each(function(){
			if( $(this).css('display') == 'block'){
				$(this).find('img').removeClass('show');
				$(this).find('img').eq( _this.index() ).addClass('show');
			}
		})
	})
	
	
	// 加入我们 折叠导航效果中的 + - 按钮切换
	$('.panel-heading').on('click',function(){
		if( $(this).siblings('.panel-collapse').hasClass('in') ){
			$(this).find('i').addClass('icon-plus').removeClass('icon-minus');
		}else{
			$('.panel-heading').find('i').addClass('icon-plus').removeClass('icon-minus');
			$(this).find('i').addClass('icon-minus').removeClass('icon-plus');
			
		}
	});
	
	// 联系我们  内容切换效果
	$('.list-tab li').on('click',function(){
		$('.list-tab li').removeClass('active');
		$(this).addClass('active');
		$('.area-group').css('display','none');
		$('.area-group').eq( $(this).index() ).css('display','block');
	})


	// 上海、北京、广州四个办公地址的坐标点
	if( $(".area-right").length > 0 ){
		areaMap();
	}
	

});


// 首页合作伙伴无缝滚动
function partnerCarousel(){
	var len = $(".partnerLists li").length;
	var oTimer = null; 
	var iNow = 0;
	var iX = 0;
	
	$(".partnerLists").append( $(".partnerLists").html() ); // 把所有图片复制一份
	var iWidth = $(".partnerLists li").length *  $(".partnerLists li").width();
	$(".partnerLists").width( iWidth );

	auto(); // 定时器滚动

	function auto(){
		oTimer = setInterval(function(){
	 		if( iNow == len ){ 
	 			iNow = -1;
	 		}
			iNow++;
			iX = -iNow * $(".partnerLists li").width();	
			$(".partnerLists").css("WebkitTransform","translateX("+iX+"px)").css("MozTransform","translateX("+iX+"px)").css("MsTransform","translateX("+iX+"px)").css("OTransform","translateX("+iX+"px)").css("transform","translateX("+iX+"px)");
		},2000);
	}

	// 鼠标经过时停止滚动
	$(".partnerLists li").hover(function(){
		clearInterval( oTimer ); 
	},function(){
		auto();
	})
}




// 上海、北京、广州四个办公地址的坐标点
function areaMap(){
	var map1 = new AMap.Map("emap1", { 
		resizeEnable: true,
		center: [121.442002,31.230073],//地图中心点
		zoom: 14, //地图显示的缩放级别
		isHotspot: true
	});
	
	//添加点标记，并使用自己的icon
	new AMap.Marker({
		map: map1,
		position: [121.442002,31.230073]
	});
	
	
	
	var map2 = new AMap.Map("emap2", { 
		resizeEnable: true,
		center: [116.480493,39.995746],//地图中心点
		zoom: 14, //地图显示的缩放级别
		isHotspot: true
	});
	
	//添加点标记，并使用自己的icon
	new AMap.Marker({
		map: map2,
		position: [116.480493,39.995746]
	});
	
	var map3 = new AMap.Map("emap3", { 
		resizeEnable: true,
		center: [113.321629,23.119834],//地图中心点
		zoom: 16, //地图显示的缩放级别
		isHotspot: true
	});
	
	//添加点标记，并使用自己的icon
	new AMap.Marker({
		map: map3,
		position: [113.321629,23.119834]
	});
}

