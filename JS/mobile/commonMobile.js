const MenuEvents = (() => {
    const elements = {
        menu: "#menu",
        menuList: "#header div:last-child div:first-child",
        menuBars: "#menu>span"
    }

    const getEle = ele => {
        return document.querySelector(ele);
    };
    const getEles = eles => {
        return document.querySelectorAll(eles);
    };

    return {
        menuListener() {
            // 头部菜单
            getEle(elements.menu).addEventListener("click", () => {
                const menuList = getEle(elements.menuList);
                const menuBars = getEles(elements.menuBars);
                if (menuList.className === "activedMenu") {
                    menuBars.forEach(item => item.className = "menuBarsOff");
                    menuList.className = "unactivedMenu";
                    menu.className = "unclickMenu";
                } else {
                    menuBars.forEach(item => item.className = "menuBarsOn");
                    menuList.className = "activedMenu";
                    menu.className = "clickMenu";
                }
            }, false)
        }
    }
})();

MenuEvents.menuListener();