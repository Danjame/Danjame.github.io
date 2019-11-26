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

//语言选择框事件
getEle("#btnBox input:first-child").addEventListener("click", () => {
    if (floatTitle.className == "floatTitleMin" || floatTitle.className == "floatTitleMin ftHidden") {
        floatTitle.className = "floatTitleMin ftDisplay";
    } else {
        floatTitle.className = "floatTitleMin ftHidden";
    }
}, false);
//监听点击事件, 开启动画
getEle("#btnBox input:nth-child(2)").addEventListener("click", () => {
    if (imgGroup.style.transition === "all 1s ease 0s") {
        return;
    } else {
        aboutMeObj.manAnimation();
        aboutMeObj.bgAnimation();
        aboutMeObj.timeLineAnimation();
        for (let i = 0; i < lanDivs.length; i++) {
            lanDivs[i].style.left = "5%";
            lanDivs[i].style.textAlign = "left";
        };
        floatTitle.className = "floatTitleMin";
        getEle("#btnBox input:first-child").style.display = "block";
    }
}, false);
//监听点击事件, 停止动画
getEle("#btnBox input:nth-child(3)").addEventListener("click", () => {
    aboutMeObj.clearAllTimer();
}, false);
//还原事件
getEle("#btnBox input:nth-child(4)").addEventListener("click", () => {
    aboutMeObj.initialization();
}, false);

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
    const timeDots = document.querySelectorAll(this.timeDots);
    const cvWraps = document.querySelectorAll(this.cvWraps);

    const init = (() => {
        this.imgOffset = 0;
        this.lineHeight = 0;
        imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
        imgBar.style.transition = "all 1s ease 0s";
        imgBar.addEventListener("transitionend", () => {
            imgBar.style.transition = "all 0s linear 0s";
        }, false);

        timeDots.forEach(item => {
            item.style.display = "none";
        })

        cvWraps.forEach(item => {
            item.className = "";
        })
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
    const contentAni = (firPoint = 70, secPoint = 139, thirPoint = 209, fourtPoint = 239) => {
        cancelAnimationFrame(this.contentTimer);
        this.contentTimer = requestAnimationFrame(() => {
            console.log(this.lineHeight)
            switch (true) {
                case this.lineHeight < firPoint:
                    displayDotText(dots[0], cvWraps[0]);
                    break;
                case this.lineHeight >= firPoint && this.lineHeight < secPoint:
                    displayDotText(dots[1], cvWraps[2]);
                    break;
                case this.lineHeight >= secPoint && this.lineHeight < thirPoint:
                    displayDotText(dots[2], cvWraps[1]);
                    break;
                case this.lineHeight >= thirPoint && this.lineHeight < fourtPoint:
                    displayDotText(dots[3], cvWraps[3]);
                    break;
                case this.lineHeight >= fourtPoint:
                    cancelAnimationFrame(this.contentTimer);
                    break;
            }
        })

    }

    contentAni();

    function displayDotText(dot, cvWrap) {
        dot.style.display = "block";
        cvWrap.className = "cvWrapFrames";
        contentAni(70,139,209,239);
    }
}

Animation.prototype.clearAllTimer = function() {
    clearTimeout(this.manTimer);
    clearTimeout(this.bgTimer);
    clearTimeout(this.timeLineTimer);
    cancelAnimationFrame(this.contentTimer);
}