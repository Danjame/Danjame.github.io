const aboutMe = new Animation({
    imgGroup: "#imgGroup",
    eachImg: "#imgGroup>li:first-child img",
    skateMan: "#mainLeft",
    eachFrame: 320,
    totalFrame: 9600,

    timeLine: "#timeLine",
    timeDots: "#timeDot>li",
    cvWraps: ".cvInfo"
})

function Animation(obj) {
    this.bgTimer = null;
    this.bgOffset = 0;
    this.imgGroup = obj.imgGroup;
    this.eachImg = obj.eachImg;

    this.skateTimer = null;
    this.manOffset = 0;
    this.skateMan = obj.skateMan;
    this.eachFrame = obj.eachFrame;
    this.totalFrame = obj.totalFrame;

    this.timeLineTimer = null;
    this.contentTimer = null;
    this.lineWidth = 0;
    this.timeLine = obj.timeLine;
    this.timeDots = obj.timeDots;
    this.cvWraps = obj.cvWraps;
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

    // 文本框和时间点淡出
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
//初始化动画
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

const Setting = (() => {
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
            aboutMe.skateAnimation();
            aboutMe.bgAnimationTablet();
            aboutMe.timeAnimation(123, 243, 363, 437, 25);
        },
        ipadProSetting() {
            aboutMe.skateAnimation();
            aboutMe.bgAnimationTablet();
            aboutMe.timeAnimation(166, 330, 496, 596, 25);
        },
        deskTopSetting() {
            aboutMe.skateAnimation();
            aboutMe.bgAnimation();
            if (window.matchMedia("(min-width:1301px)").matches) {
                aboutMe.timeAnimation(180, 357, 532, 650, 25);
            } else if (window.matchMedia("(min-width:1131px)").matches) {
                aboutMe.timeAnimation(143, 278, 413, 495, 27);
            } else if (window.matchMedia("(max-width:1130px)").matches) {
                aboutMe.timeAnimation(113, 218, 323, 385, 30);
            }
        }
    }
})();

const SetListner = ((Setting) => {
    return {
        init() {
            console.log("The animation is ready!");
            // 适配Ipad
            Setting.getEle("#btnBox input:nth-child(2)").addEventListener("click", () => {
                if (imgGroup.style.transitionDuration !== "1s") {
                    if (window.matchMedia("(width:768px)").matches && window.matchMedia("(height:1024px)").matches) {
                        Setting.ipadSetting()
                    } else if (window.matchMedia("(width:1024px)").matches && window.matchMedia("(height:1366px)").matches) {
                        Setting.ipadProSetting()
                    } else {
                        Setting.deskTopSetting()
                    }
                }
            }, false);
            //监听点击事件, 停止动画
            Setting.getEle("#btnBox input:nth-child(3)").addEventListener("click", () => {
                aboutMe.clearAllTimer();
            }, false);
            //绑定重看事件
            Setting.getEle("#btnBox input:nth-child(4)").addEventListener("click", () => {
                aboutMe.initialization();
            }, false)
        }
    }
})(Setting);

Setting.screenSetting();
SetListner.init();