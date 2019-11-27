const controller = (() => {
    const elements = {
        imgGroup: "#imgGroup",
        eachImg: "#imgGroup>li:first-child img",
        container: "#container",
        bgBox: "#bgBox",
        imgNum: "#imgGroup>li",
    };

    return {
        getEle(ele) {
            return document.querySelector(ele);
        },
        getEles(eles) {
            return document.querySelectorAll(eles);
        },
        //桌面浏览器自动适配
        forDeskTop() {
            const container = this.getEle("#container");
            const bgBox = this.getEle("#bgBox");
            const imgGroup = this.getEle("#imgGroup");
            const eachImg = this.getEle("#imgGroup>li:first-child img");
            const imgNum = this.getEles("#imgGroup>li").length;

            container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
            imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;

            window.addEventListener("resize", () => {
                imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
                container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
            }, false)
        },
        //平板自动适配
        forTablet() {
            const container = this.getEle("#container");
            const bgBox = this.getEle("#bgBox");
            const imgGroup = this.getEle("#imgGroup");
            const eachImg = this.getEle("#imgGroup>li:first-child img");
            const imgNum = this.getEles("#imgGroup>li").length;
            const screenWidth = document.documentElement.clientWidth;

            bgBox.style.height = `${eachImg.offsetHeight}px`;
            imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
            container.style.width = bgBox.style.width = `${screenWidth}px`;
        },
        screenSetting() {
            if ((window.matchMedia("(width:768px)").matches && window.matchMedia("(height:1024px)").matches) ||
                (window.matchMedia("(width:1024px)").matches && window.matchMedia("(height:1366px)").matches)) {
                this.forTablet();
            } else {
                this.forDeskTop();
            };
        },
        ipadSetting() {
            obj.skateAnimation();
            obj.bgAnimationTablet();
            obj.timeAnimation(123, 243, 363, 437, 25);
        },
        ipadProSetting() {
            obj.skateAnimation();
            obj.bgAnimationTablet();
            obj.timeAnimation(166, 330, 496, 596, 25);
        },
        deskTopSetting() {
            obj.skateAnimation();
            obj.bgAnimation();
            if (window.matchMedia("(min-width:1301px)").matches) {
                obj.timeAnimation(180, 357, 532, 650, 25);
            } else if (window.matchMedia("(min-width:1131px)").matches) {
                obj.timeAnimation(143, 278, 413, 495, 27);
            } else if (window.matchMedia("(max-width:1130px)").matches) {
                obj.timeAnimation(113, 218, 323, 385, 30);
            }
        }

    }
})();

controller.screenSetting();

// // const skateMan = getEle("#mainLeft");
// const screenWidth = document.documentElement.clientWidth;
// //时间线和时间点
// const timeLine = getEle("#timeLine");
// const dots = getAll("#timeDot>li");
// //文字
// const cvWraps = getAll(".cvInfo");
// //计时器
// let bgTimer = null;
// let skateTimer = null;
// let timeLineTimer = null;
// let contentTimer = null;
// let textTimer = null;
// let i = 0;
// let offset = 0;

// 适配Ipad
getEle("#btnBox input:nth-child(2)").addEventListener("click", () => {
    if (imgGroup.style.transitionDuration !== "1s") {
        if (window.matchMedia("(width:768px)").matches && window.matchMedia("(height:1024px)").matches) {
            controller.ipadSetting()
        } else if (window.matchMedia("(width:1024px)").matches && window.matchMedia("(height:1366px)").matches) {
            controller.ipadProSetting()
        } else {
            controller.deskTopSetting()
        }
    }
}, false);


//监听点击事件, 停止动画
getEle("#btnBox input:nth-child(3)").addEventListener("click", () => {
    obj.clearAllTimer();
}, false);
//绑定重看事件
getEle("#btnBox input:nth-child(4)").addEventListener("click", () => {
    obj.initialization();
}, false);

const obj = new Animation({
    imgGroup: "#imgGroup",
    eachImg: "#imgGroup>li:first-child img",
})

function Animation(obj) {
    // this.imgBar = obj.imgBar;
    // this.imgBarWidth = obj.imgBarWidth;
    // this.imgOffset = obj.imgOffset || 0;
    // this.man = obj.man;
    // this.manOffset = obj.manOffset || 0;
    // this.manEachWidth = obj.manEachWidth;
    // this.manTotalWidth = obj.manTotalWidth;
    // this.manMs = obj.manMs || 50;
    // this.manTimer = null;

    this.bgTimer = null;
    this.bgOffset = 0;
    this.imgGroup = obj.imgGroup;
    this.eachImg = obj.eachImg;

    this.manOffset = 0;
    this.eachFrame = 320;
    this.totalFrame = 9600;
    this.skateMan = "#mainLeft";
    this.skateTimer = null;

    this.lineWidth = 0;
    this.timeLine = "#timeLine" || obj.timeLine;
    // this.lineHeight = obj.lineHeight || 0;
    this.timeDots = "#timeDot>li";
    this.cvWraps = ".cvInfo";
    this.timeLineTimer = null;
    this.contentTimer = null;
}

//背景动画函数
Animation.prototype.bgAnimation = function() {
    clearTimeout(this.bgTimer);
    const imgGroup = document.querySelector(this.imgGroup);
    const eachImg = document.querySelector(this.eachImg);

    const bgAni = () => {
        this.bgTimer = setTimeout(() => {
            this.bgOffset -= 1;
            if (this.bgOffset < -imgGroup.offsetWidth + eachImg.offsetWidth) {
                clearTimeout(this.bgTimer);
            } else {
                imgGroup.style.transform = `translate3d(${this.bgOffset}px, 0, 0)`;
                bgAni();
            }
        }, 1);
    };
    bgAni();
};

// 背景动画函数（平板适配）
Animation.prototype.bgAnimationTablet = function() {
    clearTimeout(this.bgTimer);
    const imgGroup = document.querySelector(this.imgGroup);
    const screenWidth = document.documentElement.clientWidth;

    const bgAni = () => {
        this.bgTimer = setTimeout(() => {
            this.bgOffset -= 2;
            if (this.bgOffset < -imgGroup.offsetWidth + screenWidth) {
                clearTimeout(this.bgTimer);
            } else {
                imgGroup.style.transform = `translate3d(${this.bgOffset}px, 0, 0)`;
                bgAni();
            }
        }, 1)
    };
    bgAni();
};

//滑板动画
Animation.prototype.skateAnimation = function() {
    const skateMan = document.querySelector(this.skateMan);
    const skateAni = () => {
        clearTimeout(this.skateTimer);
        this.skateTimer = setTimeout(() => {
            this.manOffset -= this.eachFrame;
            this.manOffset <= -this.totalFrame ? this.manOffset = 0 : this.manOffset;
            skateMan.style.backgroundPositionX = `${this.manOffset}px`;
            skateAni();
        }, 50);
    };
    skateAni();
}


//时间动画
Animation.prototype.timeAnimation = function(firstWidth, secondWidth, thirdWidth, totalWidth, timeLineMS) {
    const timeLine = document.querySelector(this.timeLine);
    const lineAnimation = () => {
        this.timeLineTimer = setTimeout(() => {
            this.lineWidth += 1;
            if (this.lineWidth <= totalWidth) {
                timeLine.style.width = `${this.lineWidth}px`;
                lineAnimation();
            } else {
                clearTimeout(this.timeLineTimer);
            }
        }, timeLineMS);
    };
    lineAnimation();

    // 文本框和时间点根据时间轴长度分别淡出和显示
    const dots = document.querySelectorAll(this.timeDots);
    const cvWraps = document.querySelectorAll(this.cvWraps);
    const displayDotText = (dot, textWrap) => {
        dot.style.display = "block";
        textWrap.classList.add("cvWrapFrames");
    }

    const self = this;

    (function contentAnimation() {
        displayDotText(dots[0], cvWraps[0]);
        self.contentTimer = setInterval(() => {

            switch (self.lineWidth) {
                case firstWidth:
                    displayDotText(dots[2], cvWraps[2]);
                    break;
                case secondWidth:
                    displayDotText(dots[1], cvWraps[1]);
                    break;
                case thirdWidth:
                    displayDotText(dots[3], cvWraps[3]);
                    break;
                case totalWidth:
                    clearInterval(self.contentTimer);
                    break;
            }
        }, 10);
    })();
}
//初始化
Animation.prototype.initialization = function() {
    const imgGroup = document.querySelector(this.imgGroup);
    const dots = document.querySelectorAll(this.timeDots);
    const cvWraps = document.querySelectorAll(this.cvWraps);
    const timeLine = document.querySelector(this.timeLine);

    this.clearAllTimer();
    this.bgOffset = 0;
    imgGroup.style.transform = `translate3d(${this.bgOffset}px, 0, 0)`;
    imgGroup.style.transition = "all 1s ease 0s";

    dots.forEach(item => {
        item.style.display = "none";
    })

    cvWraps.forEach(item => {
        item.classList.remove("cvWrapFrames");
    })

    this.lineWidth = 0;
    timeLine.style.width = this.lineWidth;

    const transitionEnd = () => {
        imgGroup.style.transition = "all 0s linear 0s";
        imgGroup.removeEventListener("transitionend", transitionEnd);
    }

    imgGroup.addEventListener("transitionend", transitionEnd, false)
}

Animation.prototype.clearAllTimer = function() {
    clearTimeout(this.skateTimer);
    clearTimeout(this.bgTimer);
    clearTimeout(this.timeLineTimer);
    clearInterval(this.contentTimer);
}