var doms = {
	carouselList: document.querySelector('.carousel'),
	left: document.querySelector('.left'),
	right: document.querySelector('.right'),
	indicators: document.querySelectorAll('.indicator span')
};
var curindex = 0;

function moveTo(index) {
	doms.carouselList.style.transform = `translateX(-${index}00%)`;
	doms.carouselList.style.transition = '.5s';
	var active = document.querySelector('.active');
	active.classList.remove('active');
	doms.indicators[index].classList.add('active');
	curindex = index;
}
doms.indicators.forEach(function(item, index) {
	item.onclick = function() {
		moveTo(index);
	};
});

function init() {
	var first = doms.carouselList.firstElementChild.cloneNode(true);
	var last = doms.carouselList.lastElementChild.cloneNode(true);
	doms.carouselList.appendChild(first);
	doms.carouselList.insertBefore(last, doms.carouselList.firstElementChild);
	last.style.position = 'absolute';
	last.style.transform = 'translateX(-100%)';
}
init();

function left() {
	if (curindex === 0) {
		doms.carouselList.style.transform = `translateX(-${count* 100}%)`
		doms.carouselList.style.transition = 'none';
		//强制渲染
		doms.carouselList.clientHeight;
		moveTo(count - 1);
	} else {
		moveTo(curindex - 1);
	}
}
var count = doms.indicators.length;

function right() {
	if (curindex === count - 1) {
		doms.carouselList.style.transform = 'translateX(100%)';
		doms.carouselList.style.transition = 'none';
		//强制渲染
		doms.carouselList.clientHeight;
		moveTo(0);
	} else {
		moveTo(curindex + 1);
	}
}

function pollingInt() {
	interObj = setInterval(() => {
		right()
	}, 1000)
}
doms.left.onclick = left
doms.right.onclick = right

pollingInt()
// 鼠标移出，打开定时器
function outClick() {
	pollingInt()
}
// 鼠标移入，清楚定时器
function οnmοuseοver() {
	clearInterval(interObj)
}
