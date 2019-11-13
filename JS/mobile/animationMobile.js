// 时间线和时间点
const timeLine = getEle("#timeLine");
const dots = getAll("#timeDot>li");

// 文字
const textWraps = [getEle("#text1"),
    getEle("#text2"),
    getEle("#text3"),
    getEle("#text4")
];
//时间线计时器
let timeLineTimer = null;
let contentTimer = null;

//实例化对象
const animationObj = {
    imgBar: "#imgGroup",
    imgBarWidth: "2560",
    man: "#mainLeft",
    manEachWidth: "20",
    manTotalWidth: "600",
};
var aboutMeObj = new Animation(animationObj);

window.onblur = () => {
    clearAllTimer();
}

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
        timeLineAnimationMobile();
        for (let i = 0; i < lanDivs.length; i++) {
            lanDivs[i].style.left = "5%";
            lanDivs[i].style.textAlign = "left";
        };
        floatTitle.className = "floatTitleMin";
        btn0.style.display = "block";
    }
}, false);
//监听点击事件, 停止动画
getEle("#btnBox input:nth-child(3)").addEventListener("click", () => {
    clearAllTimer();
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
}
//背景动画方法
Animation.prototype.bgAnimation = function() {
    clearTimeout(this.bgTimer);
    const self = this;
    const imgBar = document.querySelector(this.imgBar);
    const screenWidth = document.documentElement.clientWidth;

    (function bgAni() {
        self.bgTimer = setTimeout(() => {
            self.imgOffset -= 1;
            if (self.imgOffset < -self.imgBarWidth + screenWidth) {
                clearTimeout(self.bgTimer);
            } else {
                imgBar.style.transform = `translate3d(${self.imgOffset}px, 0, 0)`;
                bgAni();
            }
        }, 5);
    })()
}
//人物动画方法
Animation.prototype.manAnimation = function() {
    clearTimeout(this.manTimer);
    const self = this;
    const man = document.querySelector(this.man);

    (function manAni() {
        self.manTimer = setTimeout(() => {
            self.manOffset -= self.manEachWidth;
            self.manOffset <= -self.manTotalWidth ? self.manOffset = 0 : self.manOffset;
            man.style.backgroundPositionX = `${self.manOffset}rem`;
            manAni();
        }, self.manMs);
    })();
}
//动画还原方法
Animation.prototype.initialization = function() {
    clearAllTimer();
    const imgBar = document.querySelector(this.imgBar);
    this.imgOffset = 0;

    imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
    imgBar.style.transition = "all 1s ease 0s";
    imgBar.addEventListener("transitionend", () => {
        imgBar.style.transition = "all 0s linear 0s";
    }, false)

    dots.forEach(item => {
        item.style.display = "none";
    })

    textWraps.forEach(item => {
        item.className = "";
    })

    timeLine.style.height = 0;
}
//时间线动画函数
function timeLineAnimationMobile() {
    let lineHeight = timeLine.offsetHeight;
    //时间轴动画函数
    (function timeLineAni() {
        clearTimeout(timeLineTimer);
        timeLineTimer = setTimeout(() => {
            lineHeight += 1;
            if (lineHeight <= 239) {
                timeLine.style.height = `${lineHeight}px`;
                timeLineAni();
            } else {
                clearTimeout(timeLineTimer);
            }
        }, 50);
    })();

    //文本框和时间点根据时间轴长度分别淡出和显示
    (function contentAni(firPoint, secPoint, thirPoint, fourtPoint) {
        cancelAnimationFrame(contentTimer);
        contentTimer = requestAnimationFrame(() => {
            switch (true) {
                case lineHeight < firPoint:
                    displayDotTest(dots[0], textWraps[0]);
                    break;
                case lineHeight >= firPoint && lineHeight < secPoint:
                    displayDotTest(dots[1], textWraps[1]);
                    break;
                case lineHeight >= secPoint && lineHeight < thirPoint:
                    displayDotTest(dots[2], textWraps[2]);
                    break;
                case lineHeight >= thirPoint && lineHeight < fourtPoint:
                    displayDotTest(dots[3], textWraps[3]);
                    break;
                case lineHeight >= fourtPoint:
                    cancelAnimationFrame(contentTimer);
                    break;
            }
        })

        function displayDotTest(dot, textWrap) {
            dot.style.display = "block";
            textWrap.className = "text";
            contentAni(70, 139, 209, 239);
        }
    })(70, 139, 209, 239)
}

function clearAllTimer() {
    clearTimeout(aboutMeObj.manTimer);
    clearTimeout(aboutMeObj.bgTimer);
    clearTimeout(timeLineTimer);
    cancelAnimationFrame(contentTimer);
}