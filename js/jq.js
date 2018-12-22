$(document).ready(function(){
	
	$('li.menu').hover(function(){
			if($(this).has('div').length){
				$(this).addClass('hover')
			}
		},function(){
			if($(this).has('div').length){
				$(this).removeClass('hover')
			}
		})
		/*购物车*/
		$('.nogoods').hover(function(){
			$('.nogoods').addClass('hover')
		},function(){
			$('.nogoods').removeClass('hover')
	
	})
	
		/*购物导航区域*/		
				$('div.con-nav').hover(function(){
					$(this).addClass('hover')
				},function(){
					$(this).removeClass('hover')
			})			
		/*初始化代码*/
		var size=$('.banner-ad li').size();
		var index=0;
	
		/*JS添加导航按钮*/
		for (var i = 1; i <=size; i++) {
			li='<li>'+i+'</li>'
			$('.banner-nav').append(li);
		}
		$('.banner-nav li').eq(0).addClass('hover');
		$('.banner-ad li').eq(0).addClass('active');
	
		/*手动控制轮播图*/
		$('.banner-nav li').mouseover(function() {
			$(this).addClass('hover').siblings('li').removeClass('hover');
			index=$(this).index();
			$('.banner-ad li').eq(index).stop(true).fadeIn(300).siblings('li').stop(true).fadeOut(300);
			i=index;	
		});
	
})

