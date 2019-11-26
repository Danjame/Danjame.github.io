window.onblur = () => {
    aboutMeObj.clearAllTimer();
}

//实例化对象
const animationObj = {
    imgBar: "#imgGroup",
    imgBarWidth: "2560",
    man: "#mainLeft",
    manEachWidth: "20",
    manTotalWidth: "600",

    timeLine: "#timeLine",
    timeDots: "#timeDot>li",
    cvWraps: ".cvInfo",
};

const aboutMeObj = new Animation(animationObj);

const setEventListener = (() => {
    const btns = {
        lanBtn: "#btnBox input:first-child",
        startBtn: "#btnBox input:nth-child(2)",
        stopBtn: "#btnBox input:nth-child(3)",
        reviewBtn: "#btnBox input:nth-child(4)"
    };

    const elements = {
        floatTitle: ".floatTitle",
        lanWrappers: "#myLanguage>div"
    };

    return {
        getEle(ele) {
            return document.querySelector(ele);
        },
        getEles(eles) {
            return document.querySelectorAll(eles);
        },
        //语言选择框事件
        setLan() {
            this.getEle(btns.lanBtn).addEventListener("click", () => {
                const floatTitle = this.getEle(elements.floatTitle);
                if(!floatTitle.classList.contains("ftDisplay") && !floatTitle.classList.contains("ftHidden")){
                    floatTitle.classList.add("ftDisplay");
                }else if (floatTitle.classList.contains("ftDisplay")) {
                    floatTitle.classList.replace("ftDisplay", "ftHidden")
                } else {
                    floatTitle.classList.replace("ftHidden", "ftDisplay")
                }
            }, false);
        },
        //监听点击事件, 开启动画
        setStart() {
            this.getEle(btns.startBtn).addEventListener("click", () => {
                const lanWrappers = this.getEles(elements.lanWrappers);
                const floatTitle = this.getEle(elements.floatTitle);
                
                if (imgGroup.style.transitionDuration !== "1s") {
                    aboutMeObj.manAnimation();
                    aboutMeObj.bgAnimation();
                    aboutMeObj.timeLineAnimation();

                    lanWrappers.forEach(item=>{
                        item.style.left = "5%";
                        item.style.textAlign = "left";
                    })

                    floatTitle.classList.add("floatTitleMin");
                    getEle("#btnBox input:first-child").style.display = "block";
                }
            }, false);
        },
        //监听点击事件, 停止动画
        setStop() {
            this.getEle(btns.stopBtn).addEventListener("click", ()=>{aboutMeObj.clearAllTimer()}, false);
        },
        //还原事件
        setReview() {
            this.getEle(btns.reviewBtn).addEventListener("click", ()=>{aboutMeObj.initialization()}, false);
        }
    }
})();

setEventListener.setLan();
setEventListener.setStart();
setEventListener.setStop();
setEventListener.setReview();

//背景人物动画构造函数
function Animation(obj) {
    this.imgBar = obj.imgBar;
    this.imgBarWidth = obj.imgBarWidth;
    this.imgOffset = obj.imgOffset || 0;
    this.man = obj.man;
    this.manOffset = obj.manOffset || 0;
    this.manEachWidth = obj.manEachWidth;
    this.manTotalWidth = obj.manTotalWidth;
    this.manMs = obj.manMs || 50;
    this.manTimer = null;
    this.bgTimer = null;

    this.timeLine = obj.timeLine;
    this.lineHeight = obj.lineHeight || 0;
    this.timeDots = obj.timeDots;
    this.cvWraps = obj.cvWraps;
    this.timeLineTimer = null;
    this.contentTimer = null;
}
//背景动画方法
Animation.prototype.bgAnimation = function() {
    clearTimeout(this.bgTimer);
    const imgBar = document.querySelector(this.imgBar);
    const screenWidth = document.documentElement.clientWidth;

    const bgAni = () => {
        this.bgTimer = setTimeout(() => {
            this.imgOffset -= 1;
            if (this.imgOffset < -this.imgBarWidth + screenWidth) {
                clearTimeout(this.bgTimer);
            } else {
                imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
                bgAni();
            }
        }, 5);
    };
    bgAni();
}
//人物动画方法
Animation.prototype.manAnimation = function() {
    clearTimeout(this.manTimer);
    const man = document.querySelector(this.man);

    const manAni = () => {
        this.manTimer = setTimeout(() => {
            this.manOffset -= this.manEachWidth;
            this.manOffset <= -this.manTotalWidth ? this.manOffset = 0 : this.manOffset;
            man.style.backgroundPositionX = `${this.manOffset}rem`;
            manAni();
        }, this.manMs);
    }
    manAni();
}
//动画还原方法
Animation.prototype.initialization = function() {
    this.clearAllTimer();
    const imgBar = document.querySelector(this.imgBar);
    const timeLine = document.querySelector(this.timeLine);
    const timeDots = document.querySelectorAll(this.timeDots);
    const cvWraps = document.querySelectorAll(this.cvWraps);

    const init = (() => {
        this.imgOffset = 0;
        this.lineHeight = 0;
        timeLine.style.height = this.lineHeight;
        imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
        imgBar.style.transition = "all 1s ease 0s";

        timeDots.forEach(item => {
            item.style.display = "none";
        })

        cvWraps.forEach(item => {
            item.classList.remove("cvWrapFrames");
        })

        const transitionEnd = () => {
            imgBar.style.transition = "all 0s linear 0s";
            imgBar.removeEventListener("transitionend", transitionEnd);
        }

        imgBar.addEventListener("transitionend", transitionEnd, false);


    })()
}
//时间线动画函数
Animation.prototype.timeLineAnimation = function() {
    const timeLine = document.querySelector(this.timeLine);
    const dots = document.querySelectorAll(this.timeDots);
    const cvWraps = document.querySelectorAll(this.cvWraps);
    //时间轴动画函数
    const timeLineAni = () => {
        clearTimeout(this.timeLineTimer);
        this.timeLineTimer = setTimeout(() => {
            this.lineHeight += 1;
            if (this.lineHeight <= 239) {
                timeLine.style.height = `${this.lineHeight}px`;
                timeLineAni();
            } else {
                clearTimeout(this.timeLineTimer);
            }
        }, 50);
    };
    timeLineAni();

    //文本框和时间点根据时间轴长度分别淡出和显示
    const contentAni = (point1 = 70, point2 = 139, point3 = 209, point4 = 239) => {
        cancelAnimationFrame(this.contentTimer);
        this.contentTimer = requestAnimationFrame(() => {
            switch (true) {
                case this.lineHeight < point1:
                    displayDotText(dots[0], cvWraps[0]);
                    break;
                case this.lineHeight >= point1 && this.lineHeight < point2:
                    displayDotText(dots[1], cvWraps[2]);
                    break;
                case this.lineHeight >= point2 && this.lineHeight < point3:
                    displayDotText(dots[2], cvWraps[1]);
                    break;
                case this.lineHeight >= point3 && this.lineHeight < point4:
                    displayDotText(dots[3], cvWraps[3]);
                    break;
                case this.lineHeight >= point4:
                    cancelAnimationFrame(this.contentTimer);
                    break;
            }
        })

    }

    const displayDotText = (dot, cvWrap) => {
        dot.style.display = "block";
        cvWrap.classList.add("cvWrapFrames");
        contentAni();
    }

    contentAni();
}

Animation.prototype.clearAllTimer = function() {
    clearTimeout(this.manTimer);
    clearTimeout(this.bgTimer);
    clearTimeout(this.timeLineTimer);
    cancelAnimationFrame(this.contentTimer);
}