class Slider {
    constructor(obj) {
        // slide
        this.iniPosition = obj.iniPosition || 0;
        this.barNode = obj.barNode;
        this.totalNum = obj.totalNum;
        this.index = obj.initIndex || 0;
        this.speed = obj.speed || 40;
        this.slideTimer = null;
        // dots
        this.dotParent = obj.dotParent;
        this.dotNodes = obj.dotNodes;
        this.dotAniNodes = obj.dotAniNodes;
        this.activated = obj.activated;
        this.unactivated = obj.unactivated;
        this.eventType = obj.eventType || "click";
    }

    slideAnimation() {
        clearTimeout(this.slideTimer);
        const slideBar = document.querySelector(this.barNode);
        const clientHeight = document.documentElement.clientHeight;
        const iniPosition = this.iniPosition;
        const speed = this.speed;
        let index = this.index;
        const slideMove = () => {
            this.slideTimer = setTimeout(
                () => {
                    let targetPosition = -clientHeight * index + iniPosition;
                    let currentPosition = slideBar.offsetTop;
                    let step = (targetPosition - currentPosition) / speed;
                    if (!step) {
                        clearTimeout(this.slideTimer);
                        return;
                    }
                    step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
                    currentPosition += step;
                    slideBar.style.top = `${currentPosition}px`;
                    slideMove();
                }, 1)
        }
        slideMove();
        this.dotAnimation()
    }

    resetIndex() {
        const slideBar = document.querySelector(this.barNode);
        const clientHeight = document.documentElement.clientHeight;
        if (this.index >= this.totalNum + 1) {
            this.index = 1;
            slideBar.style.top = `${this.iniPosition}px`;
        }
        if (this.index < 0) {
            this.index = this.totalNum - 1;
            slideBar.style.top = `${this.totalNum * -clientHeight + this.iniPosition}px`;
        }
    }

    dotAnimation() {
        const dotAniNodes = document.querySelectorAll(this.dotAniNodes);
        for (let i = 0; i < dotAniNodes.length; i++) {
            if (dotAniNodes[i].className === this.activated) {
                dotAniNodes[i].className = this.unactivated;
            }
            if (this.index === dotAniNodes.length) {
                dotAniNodes[0].className = this.activated;
            } else {
                dotAniNodes[this.index].className = this.activated;
            }
        }
    }

    dotEvent() {
        const dotNodes = document.querySelectorAll(this.dotNodes);
        const dotParent = document.querySelector(this.dotParent);
        dotParent.addEventListener(this.eventType, (event) => {
            const targetNode = event.target;
            if (targetNode.nodeName === dotParent.children[0].nodeName) {
                for (let i = 0; i < dotNodes.length; i++) {
                    if (dotNodes[i] === targetNode)
                        this.index = i;
                }
                this.slideAnimation();
            }
        }, false)
    }
}

const data = {
    barNode: ".slider",
    totalNum: 3,
    dotParent: ".navTitles",
    dotNodes: ".navTitles>li",
    dotAniNodes: ".nav>ul:last-child>li",
    activated: "activated",
    unactivated: "unactivated"
};

var instance = new Slider(data);

const Setting = (() => {
    const getEle = ele => {
        return document.querySelector(ele);
    }
    const getEles = eles => {
        return document.querySelectorAll(eles);
    }
    const setClass = (ele, classToAdd, classToReplace) => {
        classToReplace?ele.classList.replace(classToReplace, classToAdd):ele.classList.add(classToAdd)
    }
    const el = {
        container: getEle(".container"),
        slides: getEles(".slider>div"),
        nav: getEle(".nav"),
        barNode: getEle(".slider"),
        dotParent: getEle(".navTitles"),
        dotAniNode: getEle(".nav>ul:last-child"),
        lanBtn: getEle(".nav>.lan>p"),
        lan: getEle(".nav>.lan>ul")
    }
    return {
        // screen adjust
        autoAdjust() {
            const clientHeight = document.documentElement.clientHeight;
            // set navigation position
            el.dotParent.style.marginTop = el.dotAniNode.style.marginTop = `${(clientHeight - el.dotParent.offsetHeight) / 2}px`;
            // set container and each slide's height
            el.container.style.height = el.nav.style.height = `${clientHeight}px`
            el.slides.forEach(item => item.style.height = `${clientHeight}px`)
        },
        resize() {
            window.addEventListener("resize", () => {
                // Debounce
                if (this.timer) {
                    clearTimeout(this.timer);
                };
                this.timer = setTimeout(() => {
                    this.autoAdjust()
                }, 500)
            }, false);
        },
        // set desktop mouse wheel event
        wheelEvent() {
            let startTime;
            let endTime = new Date().getTime();
            const handler = event => {
                startTime = new Date().getTime();
                if (startTime - endTime < 1000) {
                    return
                }
                // scroll up and down
                event.wheelDelta > 0? instance.index -= 1: instance.index += 1
                instance.resetIndex();
                instance.slideAnimation();
                endTime = new Date().getTime();
            }
            window.onmousewheel = document.onmousewheel = handler
        },
        // set device touch event
        touchEvent() {
            let startX, startY, endX, endY, x, y;
            const handler = event => {
                switch (event.type) {
                    case "touchmove":
                        event.preventDefault();
                        break;
                    case "touchstart":
                        startX = event.touches[0].pageX;
                        startY = event.touches[0].pageY;
                        break;
                    case "touchend":
                        endX = event.changedTouches[0].pageX;
                        endY = event.changedTouches[0].pageY;
                        x = endX - startX;
                        y = endY - startY;
                        if (Math.abs(x) > Math.abs(y)) {
                            //return when is x-axis
                            return;
                        } else if (Math.abs(x) < Math.abs(y) && y > 0) {
                            //flip up
                            instance.index -= 1;
                        } else if (Math.abs(x) < Math.abs(y) && y < 0) {
                            //flip down
                            instance.index += 1;
                        }
                        instance.resetIndex();
                        instance.slideAnimation();
                        break;
                }
            }
            document.addEventListener("touchmove", handler, { passive: false });
            el.container.addEventListener("touchstart", handler, { passive: false });
            el.container.addEventListener("touchend", handler, { passive: false });
        },
        clickLanHanlder() {
            el.lanBtn.addEventListener("click", () => {
                el.lan.classList.contains("showLan") ? setClass(el.lan, "hideLan", "showLan") : setClass(el.lan, "showLan", "hideLan");
            }, false)
        }
    }
})();

const init = ((setting) => {
    setting.autoAdjust();
    setting.clickLanHanlder();
    instance.dotEvent();
    if (window.matchMedia("(max-device-width:425px)").matches) {
        // for mobile device
        setting.touchEvent();
        console.log("Mobile Device.")
    } else {
        // for desk top 
        setting.resize();
        setting.wheelEvent();
        console.log("Desktop or Tablet.")
    };
    console.log("Home Page Ready!")
})(Setting)