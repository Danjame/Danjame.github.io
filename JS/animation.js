const container = getEle("#container");
const bgBox = getEle("#bgBox");
const imgGroup = getEle("#imgGroup");
const eachImg = getEle("#imgGroup>li:first-child img");
const imgNum = getAll("#imgGroup>li").length;
const skateMan = getEle("#mainLeft");
const screenWidth = document.documentElement.clientWidth;
// 时间线和时间点
const timeLine = getEle("#timeLine");
const dots = getAll("#timeDot>li");
// 时间线和文字
const textWraps = [getEle("#text1"),
    getEle("#text2"),
    getEle("#text3"),
    getEle("#text4")
];
//计时器
let bgTimer = null;
let skateTimer = null;
let timeLineTimer = null;
let contentTimer = null;
let textTimer = null;
let i = 0;
let offset = 0;

//适配Ipad
if (window.matchMedia("(width:768px)").matches & window.matchMedia("(height:1024px)").matches) {
    forTablet();
    getEle("#btnBox input:nth-child(2)").addEventListener("click", () => {
        if (imgGroup.style.transition === "all 1s ease 0s") {
            return;
        } else {
            skateAnimation(320, 9600, 50);
            bgAnimationTablet(2, 1);
            timeAnimation(123, 243, 363, 437, 25);
        }
    }, false);
    //适配Ipad Pro
} else if (window.matchMedia("(width:1024px)").matches & window.matchMedia("(height:1366px)").matches) {
    forTablet();
    getEle("#btnBox input:nth-child(2)").addEventListener("click", () => {
        if (imgGroup.style.transition === "all 1s ease 0s") {
            return;
        } else {
            skateAnimation(320, 9600, 50);
            bgAnimationTablet(2, 1);
            timeAnimation(166, 330, 496, 596, 25);
        }
    }, false);
} else { //桌面浏览器
    forDeskTop();
    getEle("#btnBox input:nth-child(2)").addEventListener("click", () => {
        if (imgGroup.style.transition === "all 1s ease 0s") {
            return;
        } else {
            skateAnimation(320, 9600, 50);
            bgAnimation(1, 1);
            if (window.matchMedia("(min-width:1301px)").matches) {
                timeAnimation(180, 357, 532, 650, 25);
            } else if (window.matchMedia("(min-width:1131px)").matches) {
                timeAnimation(143, 278, 413, 495, 27);
            } else if (window.matchMedia("(max-width:1130px)").matches) {
                timeAnimation(113, 218, 323, 385, 30);
            }
        }
    }, false);
};
//监听点击事件, 停止动画
getEle("#btnBox input:nth-child(3)").addEventListener("click", () => {
    clearAllTimer();
}, false);
//绑定重看事件
getEle("#btnBox input:nth-child(4)").addEventListener("click", () => {
    initialization();
}, false);

//桌面浏览器自动适配
function forDeskTop() {
    container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;

    window.addEventListener("resize", () => {
        imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
        container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
    }, false)
}
//平板自动适配
function forTablet() {
    bgBox.style.height = `${eachImg.offsetHeight}px`;
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
    container.style.width = bgBox.style.width = `${screenWidth}px`;
};
//背景动画函数
function bgAnimation(distance, ms) {
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= distance;
        if (offset < -imgGroup.offsetWidth + eachImg.offsetWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
            bgAnimation(distance, ms);
        }
    }, ms);
};
//背景动画函数（平板适配）
function bgAnimationTablet(distance, ms) {
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= distance;
        if (offset < -imgGroup.offsetWidth + screenWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
            bgAnimationTablet(distance, ms);
        }
    }, ms);
};
//滑板动画函数
function skateAnimation(eachWidth, totalWidth, manMs) {
    let manOffset = 0;
    let each = eachWidth;
    let total = totalWidth;
    const ms = manMs;

    (function skateAni() {
        clearTimeout(skateTimer);
        skateTimer = setTimeout(() => {
            manOffset -= each;
            manOffset <= -total ? manOffset = 0 : manOffset;
            skateMan.style.backgroundPositionX = `${manOffset}px`;
            skateAni();
        }, ms);
    })()
}
//时间动画函数
function timeAnimation(firstWidth, secondWidth, thirdWidth, totalWidth, timeLineMS) {
    let lineWidth;
    (function lineAnimation() {
        lineWidth = timeLine.offsetWidth;
        timeLineTimer = setTimeout(() => {
            lineWidth += 1;
            if (lineWidth <= totalWidth) {
                timeLine.style.width = `${lineWidth}px`;
                lineAnimation();
            } else {
                clearTimeout(timeLineTimer);
            }
        }, timeLineMS);
    })();
    //文本框和时间点根据时间轴长度分别淡出和显示
    (function contentAnimation() {
        displayDotTest(dots[0], textWraps[0]);

        contentTimer = setInterval(() => {
            lineWidth = timeLine.offsetWidth;
            switch (lineWidth) {
                case firstWidth:
                    displayDotTest(dots[1], textWraps[1]);
                    break;
                case secondWidth:
                    displayDotTest(dots[2], textWraps[2]);
                    break;
                case thirdWidth:
                    displayDotTest(dots[3], textWraps[3]);
                    break;
                case totalWidth:
                    clearInterval(contentTimer);
                    break;
            }
        }, 10);

        function displayDotTest(dot, textWrap) {
            dot.style.display = "block";
            textWrap.className = "text";
        }
    })();
}
//还原函数
function initialization() {
    clearAllTimer();
    offset = 0;
    imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
    imgGroup.style.transition = "all 1s ease 0s";
    imgGroup.addEventListener("transitionend", () => {
        imgGroup.style.transition = "all 0s linear 0s";
    }, false)

    dots.forEach(item => {
        item.style.display = "none";
    })

    textWraps.forEach(item => {
        item.className = "";
    })

    timeLine.style.height = 0;
}

function clearAllTimer() {
    clearTimeout(skateTimer);
    clearTimeout(bgTimer);
    clearTimeout(timeLineTimer);
    clearInterval(contentTimer);
}