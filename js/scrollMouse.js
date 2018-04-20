function fullPage(page, navBar) {
	var r = false; //判断点击后全屏方向
	var c = 0; //定义当前停留页
	var complete = true; //判断translateY是否完成
	var pre = "prePage";
	var current = "currentPage";
	var next = "nextPage";
	var active = "active";
	scrollMouse(up, down); //执行滚动事件
	//各个全屏位置初始化
	for(var i = 1; i < page.length; i++) {
		addClass(page[i], next);
	}
	addClass(page[0], current);
	//点击全屏事件
	for(var i = 0; i < page.length; i++) {
		(function(i) {
			page[i].onclick = function() {

				for(var j = 0; j < page.length; j++) {
					navBar[j].className = '';
				}

				if(i == page.length - 1) {
					r = true;
				}
				if(i == 0) {
					r = false;
				}
				//向上滚动
				if(!r) {
					removeClass(page[i], current);
					removeClass(page[i + 1], next);
					addClass(page[i], pre);
					addClass(page[i + 1], current);
					addClass(navBar[i + 1], active);
					c = i + 1;

					//向下滚动
				} else {
					removeClass(page[i], current);
					removeClass(page[i - 1], pre);
					addClass(page[i], next);
					addClass(page[i - 1], current);
					addClass(navBar[i - 1], active);
					c = i - 1;

				}

			}
		})(i);
	}
	//点击导航栏事件
	for(var j = 0; j < page.length; j++) {
		(function(j) {
			navBar[j].onclick = function() {

				for(var x = 0; x < page.length; x++) {
					removeClass(navBar[x], active);
				}

				if(j > c) {
					for(var y = c + 1; y < j + 1; y++) {
						removeClass(page[y], next);
						addClass(page[y], pre);
					}
					removeClass(page[j], pre);
					removeClass(page[c], current);
					addClass(page[c], pre);
					r = false;

				} else if(j < c) {
					for(var n = j + 1; n < c + 1; n++) {
						removeClass(page[n], pre);
						addClass(page[n], next);
					}
					removeClass(page[j], pre);
					removeClass(page[c], current);
					r = true;
				}
				addClass(page[j], current);
				addClass(navBar[j], active);
				c = j;
			}
		})(j);
	}

	//向上滚动
	function up() {
		if(c > 0) {
			r = true;

			removeClass(page[c], current);
			addClass(page[c], next);
			removeClass(page[c - 1], pre);
			addClass(page[c - 1], current);

			removeClass(navBar[c], active);
			addClass(navBar[c - 1], active);
			page[c].addEventListener("transitionend", function() {
				complete = true;
			}, true);
			c--;
		} else if(c == 0) {
			complete = true;
			r = false;
		}
	}
	//向下滚动
	function down() {
		if(c < page.length - 1) {
			r = false;

			removeClass(page[c], current);
			addClass(page[c], pre);
			removeClass(page[c + 1], next);
			addClass(page[c + 1], current);

			removeClass(navBar[c], active);
			addClass(navBar[c + 1], active);
			page[c].addEventListener("transitionend", function() {
				complete = true;
			}, true);
			c++;
		} else if(c == page.length - 1) {
			complete = true;
			r = true;
		}

	}
	//滚动监听事件
	function scrollMouse(up, down) {
		mouseWheel(pageTurn);

		function mouseWheel(pageTurn) {
			if(document.addEventListener) {
				document.addEventListener('DOMMouseScroll', pageTurn, false);
			}
			window.onmousewheel = document.onmousewheel = pageTurn;
		}

		function pageTurn(e) {

			var e = e || window.event;
			if(e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件             
				if(e.wheelDelta > 0 && complete) {
					complete = false;
					up();
				}
				if(e.wheelDelta < 0 && complete) {
					complete = false;
					down();
				}
			} else if(e.detail) { //Firefox滑轮事件
				if(e.detail > 0 && complete) {
					complete = false;
					down();
				}
				if(e.detail < 0 && complete) {
					complete = false;
					up();
				}
			}
		}
	}

	function addClass(obj, cls) {
		var obj_class = obj.className, //获取 class 内容.
			blank = (obj_class != '') ? ' ' : ''; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
		added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
		obj.className = added; //替换原来的 class.
	}

	function removeClass(obj, cls) {
		var obj_class = ' ' + obj.className + ' '; //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
		obj_class = obj_class.replace(/(\s+)/gi, ' '), //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
			removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
		removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格. ex) 'bcd ' -> 'bcd'
		obj.className = removed; //替换原来的 class.
	}

	function hasClass(obj, cls) {
		var obj_class = obj.className, //获取 class 内容.
			obj_class_lst = obj_class.split(/\s+/); //通过split空字符将cls转换成数组.
		x = 0;
		for(x in obj_class_lst) {
			if(obj_class_lst[x] == cls) { //循环数组, 判断是否包含cls
				return true;
			}
		}
		return false;
	}
}