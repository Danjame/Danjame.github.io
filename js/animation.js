const data = {
    imgGroup: ".imgGroup",
    eachImg: ".imgGroup>li:first-child img",
    skateMan: ".mainLeft",
    eachFrame: 320,
    totalFrame: 9600,

    timeLine: ".timeLine",
    timeDots: ".timeDot>li",
    descWraps: ".descWrap",
    showDescClass: "showDesc"
}

class Animation {
    constructor(obj) {
        // background
        this.imgGroup = obj.imgGroup;
        this.eachImg = obj.eachImg;
        this.bgOffset = 0;
        this.bgTimer = null;
        // skate man
        this.skateMan = obj.skateMan;
        this.eachFrame = obj.eachFrame;
        this.totalFrame = obj.totalFrame;
        this.manOffset = 0;
        this.skateTimer = null;
        // time line
        this.lineWidth = 0;
        this.timeLine = obj.timeLine;
        this.timeDots = obj.timeDots;
        this.descWraps = obj.descWraps;
        this.timeLineTimer = null;
        this.descTimer = null;
        this.showDescClass = obj.showDescClass;
    }

    bgAnimation() {
        clearTimeout(this.bgTimer);
        const imgGroup = document.querySelector(this.imgGroup);
        const eachImg = document.querySelector(this.eachImg);
        const bgMove = () => {
            this.bgTimer = setTimeout(() => {
                this.bgOffset -= 1;
                if (this.bgOffset < -imgGroup.offsetWidth + eachImg.offsetWidth) {
                    clearTimeout(this.bgTimer);
                } else {
                    imgGroup.style.transform = `translate3d(${this.bgOffset}px, 0, 0)`;
                    bgMove();
                }
            }, 1)
        }
        bgMove()
    }

    bgAnimation_Tablet() {
        clearTimeout(this.bgTimer);
        const imgGroup = document.querySelector(this.imgGroup);
        const screenWidth = document.documentElement.clientWidth;
        const bgMove = () => {
            this.bgTimer = setTimeout(() => {
                this.bgOffset -= 2;
                if (this.bgOffset < -imgGroup.offsetWidth + screenWidth) {
                    clearTimeout(this.bgTimer);
                } else {
                    imgGroup.style.transform = `translate3d(${this.bgOffset}px, 0, 0)`;
                    bgMove();
                }
            }, 1)
        };
        bgMove();
    }

    skateAnimation() {
        const skateMan = document.querySelector(this.skateMan);
        const skateMove = () => {
            clearTimeout(this.skateTimer);
            this.skateTimer = setTimeout(() => {
                this.manOffset -= this.eachFrame;
                this.manOffset <= -this.totalFrame ? this.manOffset = 0 : this.manOffset;
                skateMan.style.backgroundPositionX = `${this.manOffset}px`;
                skateMove();
            }, 50);
        };
        skateMove();
    }

    timeAnimation(firstWidth, secondWidth, thirdWidth, totalWidth, timeLineMS) {
        const timeLine = document.querySelector(this.timeLine);
        const dots = document.querySelectorAll(this.timeDots);
        const descWraps = document.querySelectorAll(this.descWraps);
        const lineMove = () => {
            clearTimeout(this.timeLineTimer);
            this.timeLineTimer = setTimeout(() => {
                this.lineWidth += 1;
                if (this.lineWidth <= totalWidth) {
                    timeLine.style.width = `${this.lineWidth}px`;
                    lineMove();
                } else {
                    clearTimeout(this.timeLineTimer);
                }
            }, timeLineMS);
        };
        lineMove();

        const showDescDot = (dot, descWrap) => {
            dot.style.display = "block";
            descWrap.classList.add(this.showDescClass);
            descMove();
        }
        const descMove = () => {
            cancelAnimationFrame(this.descTimer);
            this.descTimer = requestAnimationFrame(() => {
                switch (true) {
                    case this.lineWidth < firstWidth:
                        showDescDot(dots[0], descWraps[0]);
                        break;
                    case this.lineWidth >= firstWidth && this.lineWidth < secondWidth:
                        showDescDot(dots[1], descWraps[2]);
                        break;
                    case this.lineWidth >= secondWidth && this.lineWidth < thirdWidth:
                        showDescDot(dots[2], descWraps[1]);
                        break;
                    case this.lineWidth >= thirdWidth && this.lineWidth < totalWidth:
                        showDescDot(dots[3], descWraps[3]);
                        break;
                    case this.lineWidth >= totalWidth:
                        cancelAnimationFrame(this.descTimer);
                        break;
                }
            })
        }
        descMove()
    }

    initialization() {
        this.clearAllTimer();
        const imgGroup = document.querySelector(this.imgGroup);
        const dots = document.querySelectorAll(this.timeDots);
        const descWraps = document.querySelectorAll(this.descWraps);
        const timeLine = document.querySelector(this.timeLine);

        const init = (() => {
            // reset timeline and background
            this.bgOffset = 0;
            this.lineWidth = 0;
            timeLine.style.width = this.lineWidth;
            imgGroup.style.transform = `translate3d(${this.bgOffset}px, 0, 0)`;
            imgGroup.style.transition = "all 1s ease 0s";
            // hide dots and description
            console.log(dots)
            dots.forEach(item => {
                item.style.display = "none";
            })
            console.log(descWraps)
            descWraps.forEach(item => {
                item.classList.remove(this.showDescClass);
            })
            const transitionEnd = () => {
                imgGroup.style.transition = "all 0s linear 0s";
                imgGroup.removeEventListener("transitionend", transitionEnd);
            }
            imgGroup.addEventListener("transitionend", transitionEnd, false)
        })()
    }

    clearAllTimer() {
        clearTimeout(this.skateTimer);
        clearTimeout(this.bgTimer);
        clearTimeout(this.timeLineTimer);
        cancelAnimationFrame(this.descTimer);
    }
}

const instance = new Animation(data)

const Setting = (() => {
    const getEle = ele => {
        return document.querySelector(ele);
    };
    const getEles = eles => {
        return document.querySelectorAll(eles);
    };

    const elements = {
        imgGroup: ".imgGroup",
        eachImg: ".imgGroup>li:first-child img",
        main: ".main",
        slider: ".slider",
        imgNum: ".imgGroup>li",
    };

    const main = getEle(elements.main);
    const slider = getEle(elements.slider);
    const imgGroup = getEle(elements.imgGroup);
    const eachImg = getEle(elements.eachImg);
    const imgNum = getEles(elements.imgNum).length;

    // adjust background width
    const forDeskTop = () => {
        slider.style.width = main.style.width = `${eachImg.offsetWidth}px`;
        imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
        window.addEventListener("resize", () => {
            imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
            slider.style.width = main.style.width = `${eachImg.offsetWidth}px`;
        }, false)
    };
    const forTablet = () => {
        const screenWidth = document.documentElement.clientWidth;
        slider.style.height = `${eachImg.offsetHeight}px`;
        imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
        slider.style.width = main.style.width = `${screenWidth}px`;
    };
    return {
        screenSetting() {
            if ((window.matchMedia("(width:768px)").matches && window.matchMedia("(height:1024px)").matches) ||
                (window.matchMedia("(width:1024px)").matches && window.matchMedia("(height:1366px)").matches)) {
                forTablet();
            } else {
                forDeskTop();
            };
        },
        ipadSetting() {
            instance.skateAnimation();
            instance.bgAnimation_Tablet();
            instance.timeAnimation(123, 243, 363, 437, 25);
        },
        ipadProSetting() {
            instance.skateAnimation();
            instance.bgAnimation_Tablet();
            instance.timeAnimation(166, 330, 496, 596, 25);
        },
        deskTopSetting() {
            instance.skateAnimation();
            instance.bgAnimation();
            if (window.matchMedia("(min-width:1301px)").matches) {
                instance.timeAnimation(180, 357, 532, 650, 25);
            } else if (window.matchMedia("(min-width:1131px)").matches) {
                instance.timeAnimation(143, 278, 413, 495, 27);
            } else if (window.matchMedia("(max-width:1130px)").matches) {
                instance.timeAnimation(113, 218, 323, 385, 30);
            }
        }
    }
})();

const Listeners = ((Setting) => {
    const getEle = ele => {
        return document.querySelector(ele)
    }
    const setClass = (ele, classToAdd, classToReplace) => {
        if (classToReplace) {
            ele.classList.replace(classToReplace, classToAdd)
        } else {
            ele.classList.add(classToAdd)
        }
    }
    const btns = {
        lanBtn: getEle(".btns>li:first-child"),
        startBtn: getEle(".btns>li:nth-child(2)"),
        resetBtn: getEle(".btns>li:nth-child(3)"),
        homeBtn: getEle(".btns>li:last-child")
    }
    const eles = {
        imgGroup: getEle(".imgGroup"),
        resumeText: getEle(".resumeText"),
        lan: getEle(".nav .lan")
    }
    let onMove = false;

    return {
        init() {
            btns.lanBtn.addEventListener("click", () => {
                if (eles.lan.classList.contains("showLan")) {
                    setClass(eles.lan, "hideLan", "showLan");
                } else {
                    setClass(eles.lan, "showLan") || setClass(eles.lan, "showLan", "hideLan");
                }
            }, false);

            btns.startBtn.addEventListener("click", () => {
                // when initializing return
                if (eles.imgGroup.style.transitionDuration === "1s") {
                    onMove = false;
                    return
                }
                // when moving or stopping, go ahead
                if (!onMove) {
                    onMove = true;
                    if (window.matchMedia("(width:768px)").matches && window.matchMedia("(height:1024px)").matches) {
                        Setting.ipadSetting()
                    } else if (window.matchMedia("(width:1024px)").matches && window.matchMedia("(height:1366px)").matches) {
                        Setting.ipadProSetting()
                    } else {
                        Setting.deskTopSetting()
                    }
                } else {
                    onMove = false;
                    instance.clearAllTimer()
                }
            }, false);

            btns.resetBtn.addEventListener("click", () => { instance.initialization() }, false)
        },
    }
})(Setting);

Setting.screenSetting();

const initPage = (listener => {
    window.onblur = () => {
        instance.clearAllTimer();
    };
    listener.init();
    // listener.setStart();
    // listener.setReset();
    console.log("The animation is ready!")
})(Listeners);