function Multilan(obj) {
    this.btnVal = obj.btnVal;
    this.textVal = obj.textVal;
    this.menuVal = obj.menuVal
    this.floatText = obj.floatText
};

Multilan.prototype.switchLan = function(doms) {
    setLans.getEles(doms.btns).forEach((item, index) => {
        item.value = this.btnVal[index];
    })
    setLans.getEles(doms.cvWrappers).forEach((item, index) => {
        item.innerHTML = this.textVal[index];
    })
    setLans.getEles(doms.menus).forEach((item, index) => {
        item.innerHTML = this.menuVal[index];
    })
    setLans.getEle(doms.floatText).innerHTML = this.floatText;
};

const toEn = new Multilan({
    btnVal: ["EN", "Start", "Pause", "Review"],
    textVal: [
        "Jilin International Studies University.</br>Bachelor in Spanish Language.",
        "China United Engineering Corporation.</br>Interpretation and translation.",
        "University of Santiago de Compostela.</br>Study Mobility Program.",
        "University of Porto.</br>Master in PLE of FLUP."
    ],
    menuVal: ["ABOUT ME", "NOTES", "MY PROJECTS"],
    floatText: "Becoming</br> Web Programmer."
})

const toEs = new Multilan({
    btnVal: ["ES", "Empezar", "Pausar", "Rever"],
    textVal: [
        "Universidad de Estudios Internacionales Jilin.</br>Lengua y Literatura Españolas.",
        "China United Engineering Corporation.</br>Interpretación y traducción.",
        "Universidad de Santiago de Compostela.</br>Movilidad de estudio.",
        "Universidad de Porto.</br>Master en PLE de FLUP."
    ],
    menuVal: ["SOBRE MI", "NOTAS", "MIS PROJECTOS"],
    floatText: "Haciendome</br> Programador Web."
})

const toPt = new Multilan({
    btnVal: ["PT", "Começar", "Pausar", "Rever"],
    textVal: [
        "Jilin International Studies University.</br>Língua e Literatura Espanholas.",
        "China United Engineering Corporation.</br>Interpretação e Tradução.",
        "Universidade de Santiago de Compostela.</br>Mobilidade de Estudo.",
        "Universidade do Porto.</br>Mestrado em PLE na FLUP."
    ],
    menuVal: ["SOBRE MIM", "NOTAS", "MEUS PROJETOS"],
    floatText: "A tornar-me</br> Programador Web."
})

const toFr = new Multilan({
    btnVal: ["FR", "Commencer", "Pauser", "Revoir"],
    textVal: [
        "Université Jilin International Studies University.</br>Licence Espagnol.",
        "China United Engineering Corporation.</br>Interprétation et Traduction.",
        "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.",
        "Université de Porto.</br>Master en PLE à FLUP."
    ],
    menuVal: ["SUR MOI", "NOTES", "MES PROJETS"],
    floatText: "Deviens</br> Programmeur Web."
})

const setLans = (() => {
    const doms = {
        btns: "#btnWrapper>input",
        cvWrappers: ".cvInfo>p:nth-child(2)",
        menus: ".headNav li div",

        lanWrappers: "#myLanguage>div",
        lanTitleWrapper: "#content>ul:last-child",
        lanTitles: "#content>ul:last-child>li",
        floatText: "#floatText"
    };

    return {
        getEle(ele) {
            return document.querySelector(ele);
        },
        getEles(eles) {
            return document.querySelectorAll(eles);
        },
        setListener() {
            this.getEle(doms.lanTitleWrapper).addEventListener("click", () => {
                const lanTitles = this.getEles(doms.lanTitles);
                const lanWrappers = this.getEles(doms.lanWrappers);
                const target = event.target;
                let index;
                if (target.nodeName.toLowerCase() == "li") {
                    for (let i = 0; i < lanTitles.length; i++) {
                        lanTitles[i].className = ""; //初始化标题
                        floatText.className = ""; //初始化动画文字
                        lanWrappers[i].className = ""; //初始化语言栏
                        if (lanTitles[i] === target) {
                            index = i;
                        }
                    };
                    target.className = "lanTitleStyle"; //语言标题样式
                    lanWrappers[index].className = "lan"; //语言栏动画
                    switch (index) { //动画文字内容变更
                        case 0:
                            toEn.switchLan(doms);
                            break;
                        case 1:
                            toEs.switchLan(doms);
                            break;
                        case 2:
                            toPt.switchLan(doms);
                            break;
                        case 3:
                            toFr.switchLan(doms);
                            break;
                    }
                }
            }, false)
        },
    }
})();

setLans.setListener();