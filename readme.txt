Just Test
Add a paragraph
Add another paragraph
Change Again

查看版本差异

$('document').ready(function(){
	var productArr = new Array();
	
	//加载最近浏览历史
	var el=$('.viewedPdts-el');
	var tpl="viewedPdts-tpl";
	$.eh.shopDisplay.getViewedProducts(tpl,el,function(o){
		productArr = o.results;
	})
	
	//页码、页数取值
	var pageNumber = productArr.length;
	var pageIndex = 1;
	var pageCount = Math.ceil(pageNumber / 4);

	//鼠标经过，出现"加入购物车"动画
	$("body").on('mouseover mouseout','.shopcart',function(e){
		if(e.type == 'mouseover'){
			$(this).stop().animate({ width: '97px' },300);
		}
		else if(e.type == 'mouseout'){
	                $(this).stop().animate({ width: '28px' });
		}
	})
	
	//切换商品列表类型（浏览历史，收藏商品，购买历史）
	$('.cartTitle li').each(function(){
		$(this).click(function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
	})
	
	//初始化右上角圆点页码数
	function addPage() {
		for (var i = 0; i < pageCount; i++) {
			$('.pageSlides').append('<li></li>');
		}
	}
	
	//圆点页码切换动画
	function changPage(idx) {			
		var nthLi = '.pageSlides li:nth-child(' + idx + ')';
		$(nthLi).addClass('active').siblings().removeClass('active');
	}
	
	//载入商品列表
	function addProduct(idx) {
		var first = (idx - 1) * 4;
		var num = pageNumber - first > 4 ? 4 : pageNumber - first;
		
		$('.slides').fadeOut(50);
		$('.slides').html('');
		changPage(idx);

		//添加元素
		for (var i = 1; i <= num; i++) {
			$('.slides').append('<li>' + (first + i) + '</li>');
		}

		$('.slides').fadeIn(100);
	}
	addProduct(pageIndex);
	
	
	//如果页数大于1，则显示圆点页数和左右翻页
	if (pageCount > 1) {
		addPage()
		$('.pageSlides li:first').addClass('active')

		$('.pageContent').hover(function () {
			$('.arr').fadeIn()
		}, function () {
			$('.arr').fadeOut()
		})
	}
	
	//圆点页码的切换
	$('.pageSlides li').each(function (idx, ele) {
		$(ele).click(function () {
			changPage(idx);
			addLi(idx + 1);
		})
	})
	
	//左右翻页的实现
	$('.left').click(function () {
		pageIndex = pageIndex - 1
		if (pageIndex < 1) {
			pageIndex = pageCount
		}
		addProduct(pageIndex)
	})
	$('.right').click(function () {
		pageIndex = pageIndex + 1
		if (pageIndex > pageCount) {
			pageIndex = 1
		}
		addProduct(pageIndex)
	})
})