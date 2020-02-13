function SlideImg(obj) { //定义构造函数
    this.container = obj.container;
    this.header = obj.header;
    this.barNode = obj.barNode; //图片组节点
    this.totalNum = obj.totalNum; //图片数
    this.iniPosition = obj.iniPosition || 0; //图片组初始x坐标
    this.dotsFather = obj.dotsFather; //图片点父元素节点
    this.dotNodes = obj.dotNodes; //图片点
    this.dotNodesAni = obj.dotNodesAni; // 图片点动画层
    this.dotActived = obj.dotActived; //图片点出现动画
    this.dotUnactived = obj.dotUnactived; //图片点消失动画

    this.index = obj.initIndex || 0; //初始下标
    this.speed = obj.speed || 40; //轮播速度
    this.interval = obj.timeMs || 4000; //时间间隔
    this.slideTimer = null; //单张滑动定时器
    this.iniTimer = null; //全局定时器

    this.stopEvent = obj.stopEvent || "mouseover"; //停止轮播事件类型
    this.startEvent = obj.startEvent || "mouseout"; //启动轮播事件类型
    this.dotsEventType = obj.dotsEventType || "click"; //图片点事件类型

    this.colorForActivedDot = obj.colorForActivedDot; //图片点激活颜色
    this.colorForUnactivedDot = obj.colorForUnactivedDot; //图片点未激活颜色
};
//单张图片动画
SlideImg.prototype.slideAnimation = function() {
    clearTimeout(this.slideTimer);
    const header = document.querySelector(this.header);
    const slideBar = document.querySelector(this.barNode);
    const clientHeight = document.documentElement.clientHeight;
    const iniPosition = this.iniPosition;
    const speed = this.speed;
    let index = this.index;

    //单张图片动画定时器
    const slideAni = () => {
        this.slideTimer = setTimeout(
            () => {
                let targetPosition = index * (-clientHeight + header.offsetHeight) + iniPosition;
                let currentPosition = slideBar.offsetTop;
                let step = (targetPosition - currentPosition) / speed;
                if (!step) {
                    clearTimeout(this.slideTimer);
                    return;
                }
                step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
                currentPosition += step;
                slideBar.style.top = `${currentPosition}px`;
                slideAni();
            }, 1)
    }
    slideAni();
    //图片点动画
    this.dotsAnimation();
};
//轮播首尾过度
SlideImg.prototype.reStore = function() {
    const slideBar = document.querySelector(this.barNode);
    if (this.index >= this.totalNum + 1) {
        this.index = 1;
        slideBar.style.top = `${this.iniPosition}px`;
    }
};
//动画初始化
SlideImg.prototype.autoSlide = function() {
    const init = () => {
        this.iniTimer = setTimeout(() => {
            this.index += 1;
            this.reStore();
            this.slideAnimation();
            init();
        }, this.interval);
    }
    init();
};

//停止与启动轮播
SlideImg.prototype.startListener = function() {
    const container = document.querySelector(this.container);
    container.addEventListener(this.stopEvent, () => { clearTimeout(this.iniTimer) }, false);
    container.addEventListener(this.startEvent, () => { this.autoSlide() }, false);
};

SlideImg.prototype.stopListener = function() {
    const container = document.querySelector(this.container);
    container.removeEventListener(this.stopEvent, () => { clearTimeout(this.iniTimer) }, false);
    container.removeEventListener(this.startEvent, () => { this.autoSlide() }, false);
};

//图片点控制
SlideImg.prototype.dotsEvent = function() {
    const dotNodes = document.querySelectorAll(this.dotNodes);
    const dotsFather = document.querySelector(this.dotsFather);
    dotsFather.addEventListener(this.dotsEventType, () => {
        const targetNode = event.target;
        if (targetNode.nodeName === dotsFather.children[0].nodeName) {
            for (let i = 0; i < dotNodes.length; i++) {
                if (dotNodes[i] === targetNode)
                    this.index = i;
            }
            this.slideAnimation();
        }
    }, false);
};
//图片点动画
SlideImg.prototype.dotsAnimation = function() {
    const dotNodesAni = document.querySelectorAll(this.dotNodesAni);
    for (let i = 0; i < dotNodesAni.length; i++) {
        if (dotNodesAni[i].className === this.dotActived) {
            dotNodesAni[i].className = this.dotUnactived;
        }
        if (this.index === dotNodesAni.length) {
            dotNodesAni[0].className = this.dotActived;
        } else {
            dotNodesAni[this.index].className = this.dotActived;
        }
    }
}

const slideObj = {
    container: "#slideWrapper",
    header: "#header",
    barNode: "#slideBar",
    totalNum: 3,
    dotsFather: ".contentNav",
    dotNodes: ".contentNav>li",
    dotNodesAni: ".navWrapper>ul:last-child>li",
    dotActived: "actived",
    dotUnactived: "unactived",
    colorForActivedDot: "rgba(222, 222, 222, 0.5)",
    colorForUnactivedDot: "",
};

//实例化对象
var obj = new SlideImg(slideObj);

const Setting = (() => {
    const elements = {
        header: "#header",
        slideWrapper: "#slideWrapper",
        slides: "#slideBar>div",
        navWrapper: ".navWrapper",
        contentNav: ".contentNav",
        contentNavAni: ".navWrapper>ul:last-child",
    }

    return {
        getEle(ele) {
            return document.querySelector(ele);
        },
        getEles(eles) {
            return document.querySelectorAll(eles);
        },
        getClientHeight() {
            return document.documentElement.clientHeight;
        },
        //自适应
        autoAdjust() {
            const header = this.getEle(elements.header);
            const contentNav = this.getEle(elements.contentNav);
            const contentNavAni = this.getEle(elements.contentNavAni);
            const slides = this.getEles(elements.slides);

            const slideWrapper = this.getEle(elements.slideWrapper);
            const navWrapper = this.getEle(elements.navWrapper);
            //轮播导航自适应
            contentNav.style.marginTop =
                `${(this.getClientHeight()-header.offsetHeight-contentNav.offsetHeight)/2}px`;
            //幻灯片与导航高度自适应
            slides.forEach(item => item.style.height =
                slideWrapper.style.height =
                navWrapper.style.height =
                `${this.getClientHeight()-header.offsetHeight}px`)
            //轮播副本导航自适应
            contentNavAni.style.marginTop = `${contentNav.style.marginTop}`;
        },
        //窗口大小适配
        resize() {
            window.addEventListener("resize", () => { this.autoAdjust() }, false);
        },
        //移动端触屏事件
        touchEvent() {
            const handler = (event) => {
                event.preventDefault();
                switch (event.type) {
                    case "touchstart":
                        startX = event.touches[0].pageX;
                        startY = event.touches[0].pageY;
                        break;
                    case "touchend":
                        endX = event.changedTouches[0].pageX;
                        endY = event.changedTouches[0].pageY;
                        x = endX - startX;
                        y = endY - startY;

                        if (Math.abs(x) > Math.abs(y) && x > 0) {
                            //向右
                            return;
                        } else if (Math.abs(x) > Math.abs(y) && x < 0) {
                            //向左
                            return;
                        } else if (Math.abs(x) < Math.abs(y) && y > 0) {
                            //向上
                            obj.index -= 1;
                            if (obj.index < 0) {
                                obj.index = obj.totalNum - 1;
                                slideBar.style.top = `${obj.totalNum * (-clientHeight + header.offsetHeight) + obj.iniPosition}px`;
                            };
                        } else if (Math.abs(x) < Math.abs(y) && y < 0) {
                            //向下
                            obj.index += 1;
                            obj.reStore();
                        }
                        obj.slideAnimation();
                        break;
                }
            }

            let startX, startY, endX, endY, x, y;
            document.addEventListener("touchmove", event => {
                event.preventDefault();
            }, { passive: false });

            this.getEle(elements.slideWrapper).addEventListener("touchstart", handler, { passive: false });
            this.getEle(elements.slideWrapper).addEventListener("touchend", handler, { passive: false });
        },
        init() {
            this.autoAdjust();
            this.resize();
            obj.dotsEvent();
            if (window.matchMedia("(max-device-width:425px)").matches) {
                this.touchEvent();
            } else {
                obj.autoSlide();
                obj.startListener();
                //页面失去焦点停止动画
                window.onblur = () => {
                    clearTimeout(obj.iniTimer);
                    obj.stopListener();
                };
                //页面得到焦点启动动画
                window.onfocus = () => {
                    obj.autoSlide();
                    obj.startListener();
                }
            };
            console.log("Home Page is Ready!")
        }
    }
})();

Setting.init();