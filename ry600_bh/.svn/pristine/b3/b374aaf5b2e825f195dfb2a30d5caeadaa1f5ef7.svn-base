// pages/shopcart/shopcart.js
const http = require('../../../utils/httpUtil.js')

Page({
	data: {
		edit: false,
		isTouchMove: false,
		crrPdtIdx: '',
		startX: 0, //开始坐标
		startY: 0,
		storeName: '样板展示平台',
		blocks: [],
		selCount: 0,
		count: 0,
		loading: false,
		countInputTemp: 1,
		countFocusTemp: 1,
		giftEditIdx: ''
	},
	onLoad: function(){this.loadShopcart()},
	onShow: function(){this.loadShopcart()},
	onPullDownRefresh: function(){
		this.loadShopcart(function(){
			wx.stopPullDownRefresh();
		});
	},
	loadShopcart: function(callback){
		const _this = this;
		const _data = this.data;
		http.getHttp({
			action: 'VSShop.getShopCart',
			widthReward: true,
			orgId: '',
			bizCenterId: '',
			onlyAmount: false
		}, function(res, success){
			if(success && res.success){
				let blocksTemp = [];
				for(let i = 0; i < res.results[0].blocks.length; i++){
					blocksTemp.push(res.results[0].blocks[i]);
				}
				_this.setData({
					blocks: blocksTemp,
					selCount: res.results[0].selCount,
					count: res.results[0].count
				});
				console.log(_data.blocks[1])
				if(callback){
					callback();
				}
			}
		});
	},
  	touchStart: function(e){
      	this.setData({
			startX: e.changedTouches[0].clientX,
			startY: e.changedTouches[0].clientY,
			isTouchMove: false,
			crrPdtIdx: ''
		});
  	},
 	touchMove: function (e) {
    	var _this = this,
			startX = _this.data.startX,//起始X
			startY = _this.data.startY,//起始Y
     		touchMoveX = e.changedTouches[0].clientX,//滑動變化坐標
			touchMoveY = e.changedTouches[0].clientY,//滑動變化坐標
      	//滑動角度
		angle = _this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
		if (Math.abs(angle) > 30) return;
		if (touchMoveX > startX) { //右滑
			this.setData({
				isTouchMove: false
			});
		} else { //左滑
			this.setData({
				isTouchMove: true,
				crrPdtIdx: e.currentTarget.dataset.pdtidx
			});
		}
	},
	/**
	 * 计算滑动角度
	 * @param {Object} start 起点坐标
	 * @param {Object} end 终点坐标
   	*/
	angle: function (start, end) {
		var _X = end.X - start.X,
			_Y = end.Y - start.Y;
		return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	},
	fixShopcart: function (e, params, callback) {
		this.setData({
			crrPdtIdx: '',
			loading: true
		});
		var _this = this,
			pdtidx = e.currentTarget.dataset.pdtidx,
			blockidx = e.currentTarget.dataset.blockidx,
			cartItem = {},
			blockId,
			cartItemId;
		if(pdtidx){
			blockId = _this.data.blocks[pdtidx.split(',')[0]].blockId;
			cartItemId = _this.data.blocks[pdtidx.split(',')[0]].items[pdtidx.split(',')[1]].cartItemId;
		}else if(typeof(blockidx) == 'number'){
			blockId = _this.data.blocks[blockidx].blockId;
			cartItemId = 'All';
		}else if(typeof(blockidx) == 'string'){
			blockId = blockidx;
		}
		if(cartItemId){
			cartItem = {
				cartItemId: cartItemId
			}
		}
		var postData = Object.assign({
			widthReward: true,
			blockId: blockId
		}, params, cartItem);
		http.postHttp(postData, function(res, success){
			if(success){
				if(res.success){
					console.log(res)
					_this.setData({
						loading: false,
						blocks: res.results[0].blocks
					});
					if(callback){
						callback();
					}
				}
			}
		});
	},
	selPdt: function(e){
		this.fixShopcart(e, {
			action: 'VSShop.selectProduct',
			selected: !e.currentTarget.dataset.selected
		});
	},
	delPdt: function(e){
		this.fixShopcart(e, {
			action: 'VSShop.delProduct',
			selected: !e.currentTarget.dataset.selected
		});
  	},
	collectPdt: function(e){
		var _this = this,
			pdtidx = e.currentTarget.dataset.pdtidx,
			shopProductId = _this.data.blocks[pdtidx.split(',')[0]].items[pdtidx.split(',')[1]].sku.shopProductId,
			pdtTitle = _this.data.blocks[pdtidx.split(',')[0]].items[pdtidx.split(',')[1]].sku.productCaption;
		this.setData({
			crrPdtIdx: '',
			loading: true
		});
		http.postHttp({
			action: 'VSCommon.addFavorite',
			resType: 'ProductOfShop',
			resId: shopProductId,
			resName: pdtTitle,
			url: '/_shop/product-' + shopProductId + '.shtml'
		}, function(res, success){
			if(success){
				if(res.success){
					_this.setData({
						loading: false
					});
					wx.showToast({
						title: '已收藏',
						icon: 'success',
						duration: 800
					});
				}
			}
		});
	},
	countFocus: function(e){
		var _this = this;
		this.setData({
			countFocusTemp: e.detail.value
		});
	},
	countInput: function (e) {
		var idxArr = e.currentTarget.dataset.pdtidx.split(',');
		var inputTemp = 'blocks[' + idxArr[0] + '].items[' + idxArr[1] + '].amount';
		this.setData({
			[inputTemp]: e.detail.value
		});
	},
	changeCount: function (e, method) {
		var _this = this,
			idxArr = e.currentTarget.dataset.pdtidx.split(','),
			method = e.currentTarget.dataset.changemethod,
			blockId = this.data.blocks[idxArr[0]].blockId,
			cartItemId = this.data.blocks[idxArr[0]].items[idxArr[1]].cartItemId,
			addUp, amount;
		switch(method){
			case 'input': addUp = false; amount = e.detail.value; break;
			case 'sub': addUp = true; amount = -1; break;
			case 'add': addUp = true; amount = 1; break;
		}
		if (!addUp && (amount == this.data.countFocusTemp)){
			return;
		}else{
			_this.setData({
				loading: true
			});
			http.postHttp({
				action: 'VSShop.updateAmount',
				widthReward: true,
				blockId: blockId,
				cartItemId: cartItemId,
				addUp: addUp,
				amount: amount
			}, function(res, success){
				if(success){
					if(res.success){
						_this.setData({
							loading: false,
							blocks: res.results[0].blocks
						});
					}
				}
			});
		}
	},
	clearShopcart: function(){
		var _this = this;
		wx.showModal({
			title: '提示',
			content: '你确定要清空购物车吗？（此操作不可逆）',
			success: function(res){
				if(res.confirm){
					_this.setData({
						loading: true
					});
					http.postHttp({
						action: 'VSShop.removeAll',
						widthReward: false,
						orgId: '',
						bizCenterId: ''
					}, function(res, success){
						if(success){
							if(res.success){
								_this.setData({
									loading: false,
									blocks: res.results[0].blocks,
									edit: false
								});
								console.log(res);
							}
						}
					});
				}else{
					return;
				}
			}
		});
	},
	doEdit: function(){
		this.setData({
			edit: !this.data.edit
		});
	},
	editGift: function(e){
		this.setData({
			giftEditIdx: e.currentTarget.dataset.pdtidx
		});
	}
})