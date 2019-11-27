const MenuEvents = (() => {
    const elements = {
        menu: "#menu",
        menuList: "#header div:last-child div:first-child",
        menuBars: "#menu>span"
    }

    return {
        getEle(ele) {
            return document.querySelector(ele);
        },
        getEles(eles) {
            return document.querySelectorAll(eles);
        },
        menuListener() {
            // 头部菜单
            this.getEle(elements.menu).addEventListener("click", () => {
                const menuList = this.getEle(elements.menuList);
                const menuBars = this.getEles(elements.menuBars);
                if (menuList.className === "activedMenu") {
                    menuBars.forEach(item=>item.className = "menuBarsOff");
                    menuList.className = "unactivedMenu";
                    menu.className = "unclickMenu";
                } else {
                    menuBars.forEach(item=>item.className = "menuBarsOn");
                    menuList.className = "activedMenu";
                    menu.className = "clickMenu";
                }
            }, false)
        }
    }
})();

MenuEvents.menuListener();