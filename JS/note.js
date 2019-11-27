const Navigation = (() => {
    const elements = {
        titleUp: ".titleWrapper>ul>li:first-child",
        titleMid: ".titleWrapper>ul>li:nth-child(2)",
        titleDown: ".titleWrapper>ul>li:last-child",
        artiSelection: "#artiSelection",

        arrowUp: ".titleWrapper>ul>li:first-child div:last-child",
        arrowDown: ".titleWrapper>ul>li:last-child div:last-child",
        titleWrapper: ".titleWrapper",
        arrowDownWrapper: ".titleWrapper>ul>li:last-child"
    }

    return {
        getEle(ele) {
            return document.querySelector(ele);
        },
        displayTitles() {
            const artiSelection = this.getEle(elements.artiSelection);

            this.getEle(elements.titleMid).addEventListener("click", () => {
                artiSelection.style.visibility === "visible" ?
                    artiSelection.style.visibility = "hidden" :
                    artiSelection.style.visibility = "visible";
            }, false);

            artiSelection.addEventListener("click", () => {
                let target = event.target;
                if (target.nodeName.toLowerCase() === "li") {
                    artiSelection.style.visibility = "hidden";
                }
            }, false);
        },
        //移动端浮动导航定位
        autoPositionForMobile() {
            const clientHeight = document.documentElement.clientHeight;
            const titleWrapper = this.getEle(elements.titleWrapper);
            const arrowDownWrapper = this.getEle(elements.arrowDownWrapper);

            titleWrapper.style.top = `${clientHeight-titleWrapper.offsetHeight}px`;
            artiSelection.style.top = `${clientHeight-artiSelection.offsetHeight-arrowDownWrapper.offsetHeight}px`;
            artiSelection.style.right = `${titleWrapper.offsetWidth}px`;
        },
        //桌面导航颜色
        arrowColorForDesktop() {
            const arrowUp = this.getEle(elements.arrowUp);
            const arrowDown = this.getEle(elements.arrowDown);
            this.getEle(elements.titleUp).addEventListener("mouseover", () => {
                arrowUp.style.borderBottomColor = "#eeeeee";
            }, false);

            this.getEle(elements.titleDown).addEventListener("mouseover", () => {
                arrowDown.style.borderTopColor = "#eeeeee";
            }, false);

            this.getEle(elements.titleUp).addEventListener("mouseout", () => {
                arrowUp.style.borderBottomColor = "white";
            }, false);

            this.getEle(elements.titleDown).addEventListener("mouseout", () => {
                arrowDown.style.borderTopColor = "white";
            }, false);
        },
        init() {
            this.displayTitles();
            if (window.matchMedia("(max-device-width:425px)").matches) {
                this.autoPositionForMobile();
            } else {
                this.arrowColorForDesktop();
            }
        }
    }
})();

Navigation.init();