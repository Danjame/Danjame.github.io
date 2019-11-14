const btns = getAll("#btnBox>input");
const cvWrappers = getAll(".cvInfo>p:nth-child(2)");
const menus = getAll(".headNav li div");

const lanDivs = getAll("#myLanguage>div");
const floatTitle = getEle("#content>ul:last-child");
const floatTitles = getAll("#content>ul:last-child>li");
const floatText = getEle("#floatText");

//选择语言
floatTitle.addEventListener("click", () => {
    let target = event.target;
    let index
    if (target.nodeName.toLowerCase() == "li") {
        for (let i = 0; i < floatTitles.length; i++) {
            floatTitles[i].className = ""; //初始化标题
            floatText.className = ""; //初始化动画文字
            lanDivs[i].className = ""; //初始化语言栏
            if (floatTitles[i] === target) {
                index = i;
            }
        }
        target.className = "floatTitleAni"; //标题动画
        floatText.className = "floatTextAni"; //文字动画
        lanDivs[index].className = "lan"; //语言栏动画
        switch (index) { //动画文字内容变更
            case 0:
                toEn.switchLan();
                break;
            case 1:
                toEs.switchLan();
                break;
            case 2:
                toPt.switchLan();
                break;
            case 3:
                toFr.switchLan();
                break;
        }
    }
}, false)

function Multilan(obj) {
    this.btnVal = obj.btnVal;
    this.textVal = obj.textVal;
    this.menuVal = obj.menuVal
    this.floatText = obj.floatText
};

Multilan.prototype.switchLan = function(index) {
    btns.forEach((item, index) => {
        item.value = this.btnVal[index];
    })
    cvWrappers.forEach((item, index) => {
        item.innerHTML = this.textVal[index];
    })
    menus.forEach((item, index) => {
        item.innerHTML = this.menuVal[index];
    })
    floatText.innerHTML = this.floatText;
};


const toEn = new Multilan({
    btnVal: ["En", "Start", "Pause", "Review"],
    textVal: [
        "Spanish Language and Literature</br>Jilin International Studies University.",
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
        "Lengua y Literatura Españolas</br>Universidad de Estudios Internacionales Jilin.",
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
        "Língua e Literatura Espanhola</br>Jilin International Studies University.",
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
        "Langue et Littérature Espagnoles</br>Université Jilin International Studies University.",
        "China United Engineering Corporation.</br>Interprétation et Traduction.",
        "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.",
        "Université de Porto.</br>Master en PLE à FLUP."
    ],
    menuVal: ["SUR MOI", "NOTES", "MES PROJETS"],
    floatText: "Deviens</br> Programmeur Web."
})