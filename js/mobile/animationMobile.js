const data = {
    imgBar: ".imgGroup",
    imgBarWidth: "2560",
    man: ".mainLeft",
    manEachWidth: "20",
    manTotalWidth: "600",

    timeLine: ".timeLine",
    timeDots: ".timeDot>li",
    descWraps: ".descWrap",
    showDescClass: "showDesc"
}

class Animation {
    constructor(obj) {
        // background
        this.imgBar = obj.imgBar;
        this.imgBarWidth = obj.imgBarWidth;
        this.imgOffset = obj.imgOffset || 0;
        this.bgTimer = null;
        // skate man
        this.man = obj.man;
        this.manOffset = obj.manOffset || 0;
        this.manEachWidth = obj.manEachWidth;
        this.manTotalWidth = obj.manTotalWidth;
        this.manMs = obj.manMs || 50;
        this.manTimer = null;
        // time line
        this.timeLine = obj.timeLine;
        this.lineHeight = obj.lineHeight || 0;
        this.timeDots = obj.timeDots;
        this.descWraps = obj.descWraps;
        this.timeLineTimer = null;
        this.observer = null;
        this.showDescClass = obj.showDescClass;
    }

    bgAnimation() {
        clearTimeout(this.bgTimer);
        const imgBar = document.querySelector(this.imgBar);
        const screenWidth = document.documentElement.clientWidth;
        const bgMove = () => {
            this.bgTimer = setTimeout(() => {
                this.imgOffset -= 1;
                if (this.imgOffset < -this.imgBarWidth + screenWidth) {
                    clearTimeout(this.bgTimer);
                } else {
                    imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
                    bgMove();
                }
            }, 5)
        }
        bgMove()
    }

    manAnimation() {
        clearTimeout(this.manTimer);
        const man = document.querySelector(this.man);
        const manMove = () => {
            this.manTimer = setTimeout(() => {
                this.manOffset -= this.manEachWidth;
                this.manOffset = this.manOffset <= -this.manTotalWidth ? this.manOffset = 0 : this.manOffset;
                man.style.backgroundPositionX = `${this.manOffset}rem`;
                manMove();
            }, this.manMs)
        }
        manMove()
    }

    timeLineAnimation() {
        const timeLine = document.querySelector(this.timeLine);
        const dots = document.querySelectorAll(this.timeDots);
        const descWraps = document.querySelectorAll(this.descWraps);
        const lineMove = () => {
            clearTimeout(this.timeLineTimer);
            this.timeLineTimer = setTimeout(() => {
                this.lineHeight += 1;
                if (this.lineHeight <= 260) {
                    timeLine.style.height = `${this.lineHeight}px`;
                    lineMove();
                } else {
                    clearTimeout(this.timeLineTimer);
                }
            }, 50)
        }
        lineMove()
        // show descriptions and dots
        const showDescDot = (dot, descWrap) => {
            dot.style.display = "block";
            descWrap.classList.add(this.showDescClass);
        }
        // MutationObserver for watching time line
        const observerOptions = {
            childList: false,
            attributes: true,
            attributeFilter: ["style"]
        }
        const cb = () => {
            switch (this.lineHeight) {
                case 1:
                    showDescDot(dots[0], descWraps[0]);
                    break;
                case 80:
                    showDescDot(dots[1], descWraps[2]);
                    break;
                case 160:
                    showDescDot(dots[2], descWraps[1]);
                    break;
                case 240:
                    showDescDot(dots[3], descWraps[3]);
                    this.observer.disconnect()
                    break;
            }
        }
        this.observer = new MutationObserver(cb);
        this.observer.observe(timeLine, observerOptions);
    }

    initialization() {
        this.clearAllTimer();
        const imgBar = document.querySelector(this.imgBar);
        const timeLine = document.querySelector(this.timeLine);
        const timeDots = document.querySelectorAll(this.timeDots);
        const descWraps = document.querySelectorAll(this.descWraps);
        const init = (() => {
            // reset timeline and background
            this.imgOffset = 0;
            this.lineHeight = 0;
            timeLine.style.height = this.lineHeight;
            imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
            imgBar.style.transition = "all 1s ease 0s";
            // hide dots and description
            timeDots.forEach(item => {
                item.style.display = "none";
            })
            descWraps.forEach(item => {
                item.classList.remove(this.showDescClass);
            })
            const transitionEnd = () => {
                imgBar.style.transition = "all 0s linear 0s";
                imgBar.removeEventListener("transitionend", transitionEnd);
            }
            imgBar.addEventListener("transitionend", transitionEnd, false)
        })()
    }

    clearAllTimer() {
        clearTimeout(this.manTimer);
        clearTimeout(this.bgTimer);
        clearTimeout(this.timeLineTimer);
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

const instance = new Animation(data);
// bind listeners
const Listeners = (() => {
    const getEle = ele => {
        return document.querySelector(ele)
    }
    const setClass = (ele, classToAdd, classToReplace) => {
        classToReplace ? ele.classList.replace(classToReplace, classToAdd) : ele.classList.add(classToAdd)
    }
    const btns = {
        lanBtn: getEle(".btns>li:first-child"),
        startBtn: getEle(".btns>li:nth-child(2)"),
        resetBtn: getEle(".btns>li:nth-child(3)"),
        homeBtn: getEle(".btns>li:last-child")
    }
    const el = {
        imgGroup: getEle(".imgGroup"),
        resumeText: getEle(".resumeText"),
        lan: getEle(".nav .lan")
    }
    let onMove = false;
    let isReset = false;

    return {
        init() {
            btns.lanBtn.addEventListener("click", () => {
                el.lan.classList.contains("showLan") ? setClass(el.lan, "hideLan", "showLan") : setClass(el.lan, "showLan") || setClass(el.lan, "showLan", "hideLan")
            }, false)

            btns.startBtn.addEventListener("click", () => {
                // when initializing return
                if (el.imgGroup.style.transitionDuration === "1s") {
                    return
                }
                // when moving or stopping, go ahead
                if (!onMove) {
                    onMove = true;
                    isReset = false;
                    instance.manAnimation();
                    instance.bgAnimation();
                    instance.timeLineAnimation();
                    setClass(el.resumeText, "toLeft")
                } else {
                    onMove = false;
                    instance.clearAllTimer()
                }
            }, false)

            btns.resetBtn.addEventListener("click", () => {
                if (el.imgGroup.style.transitionDuration !== "1s" && !isReset) {
                    instance.initialization();
                    onMove = false;
                    isReset = true;
                }
            }, false);

            window.onblur = () => {
                onMove = false;
                instance.clearAllTimer();
            };
        }
    }
})();

const initPage = (listener => {
    listener.init();
    console.log("Animation Ready!");
    console.log("Mobile Device.");
})(Listeners);