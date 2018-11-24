	//3.通用函数
		function g(selector){
			var method = selector.substr(0,1) == '.'?
			'getElementsByClassName' : 'getElementById';
			return document[method](selector.substr(1));
		}
		
		//随机生成一个值 支持取值范围. random([min,max]);
		function random(range){
			var max = Math.max(range[0],range[1]);
			var min = Math.min(range[0],range[1]);
			
			var diff = max - min; //差值
			var number = Math.ceil((Math.random()*diff+min));  //这里要加上min,是因为可能differ是5的话,就是0-5,加上一个10 ,就是10-15
						
			return number;
			
		}
		
		/* 4.输出所有的海报 */
		var data = data;
		function addPhotos(){
			
			var template = g('#wrap').innerHTML;  /* 直接拿出模板html，然后更改数据，就是一个数组的html，再拼接回去*/
			var html = [];
			var nav=[];  /* 控制按钮，每一个控制按钮，都对应一个海报*/
			
			for(var i = 0; i < data.length; i++){
				var _html = template
							.replace('{{index}}',i)	
							.replace('{{img}}',data[i].img)
							.replace('{{caption}}',data[i].caption)
							.replace('{{desc}}',data[i].desc);
				html.push(_html);
				nav.push('<span id="nav_'+i+'" onclick="turn(g(\'#photo_'+i+'\'))" class="i">&nbsp;</span>');
				
			}
			html.push('<div class="nav">'+nav.join('')+'</div>');
			
			g("#wrap").innerHTML = html.join('');  /* 以空字符连接起来，放回id为warp中*/
			photoMid(random([0,data.length-1]));
		}
		
		addPhotos();
		
		//6.计算左右分区的范围
		
		function range(){
			
			var range = {left:{ x:[],y:[]},right:{x:[],y:[]}};
			
			var wrap={
				w:g('#wrap').clientWidth,
				h:g('#wrap').clientHeight
			}
			
			var photo={
				w:g('.photo')[0].clientWidth,
				h:g('.photo')[0].clientHeight
			}
			
			range.wrap = wrap;
			range.photo = photo;
			
			range.left.x = [0 - photo.w,wrap.w/2-photo.w/2];
			range.left.y = [0 - photo.h,wrap.h];
			
			range.right.x = [wrap.w/2 + photo.w/2, wrap.w + photo.w];
			range.right.y=range.left.y;
			
			return range;
			
		}
		
		/* 5.选中一张海报居中 ， 其他海报左右两边排放*/
		function photoMid( n ){
			
			var _photo = g('.photo');
			var photos=[];           //海报数组
			
			for(i = 0; i <_photo.length; i++){        /* 消除所有的center*/
				
				_photo[i].className = _photo[i].className.replace(/photo_center/,' ');
				 
				 _photo[i].className = _photo[i].className.replace(/photo_back/,' ');
				 
				 _photo[i].className = _photo[i].className.replace(/photo_front/,' ');

				_photo[i].className+=' photo_front';
				
				_photo[i].style.left='';             /* 如果选中一个左分区的图片到中心，它还会携带着上次的坐标，所以必须要去掉，再重新赋值*/
				_photo[i].style.top='';
				 
				 _photo[i].style['-webkit-transform']='rotate(0deg)';
				
				 photos.push(_photo[i]);
			}
			
			var photo_center = g('#photo_'+n);     /* 以Id来获取海报*/
			photo_center.className += ' photo_center';  /* 给当前海报加上photo_center类，使之居中，记得多大一个空格，不然会和前面的黏在一起*/
			photo_center = photos.splice(n,1); /* 删掉photos中居中的那个海报*/
		
			//把海报分为左，右区域两个部分
			
			var photos_left = 	photos.splice(0,Math.ceil(photos.length/2));
			var photos_right = photos;
			
			var ranges = range();  /* 分区的范围*/
			for(var i = 0 ; i < photos_left.length; i++){
				var photo = photos_left[i];
				photo.style.left =	random(ranges.left.x)+'px';   /* 随机位置*/
				photo.style.top = random(ranges.left.y) + 'px';
				
				photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';  /* 随机角度*/
				
			}
			for(var i = 0 ; i < photos_right.length; i++){
				var photo = photos_right[i];
				photo.style.left =	random(ranges.right.x)+'px'; 
				photo.style.top = random(ranges.right.y) + 'px';
				
				photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
			}
			
			/* 控制按钮处理 */
			
			var navs = g('.i');
			for(var i = 0 ;i < navs.length; i++){
				navs[i].className = navs[i].className.replace(/i_current/,' ');
				navs[i].className = navs[i].className.replace(/i_back/,' ');
			}
			
			g('#nav_'+n).className += ' i_current';
			
		}
		
		/* 1.翻转控制 */
		function turn(elem){
			var cls = elem.className;
			var n = elem.id.split('_')[1];
			
			if(! /photo_center/.test(cls)){
				return photoMid(n);
			}
			
			if(/photo_front/.test(cls)){
				 cls = cls.replace(/photo_front/,'photo_back')
			}else{
				cls = cls.replace(/photo_back/,'photo_front')
			}
			return elem.className = cls;
		}