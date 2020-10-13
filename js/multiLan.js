class multiLan {
    constructor(obj) {
        // text content in home page
        this.navTexts = obj.navTexts || null;
        this.pageOneText = obj.pageOneText || null;
        this.pageTwoText = obj.pageTwoText || null;
        this.pageThreeText = obj.pageThreeText || null;
        // text content in animation page
        this.btnTexts = obj.btnTexts;
        this.descTexts = obj.descTexts;
        this.resumeText = obj.resumeText;
        // elements in home page
        this.navWraps = this.getEles(".navTitles>li");
        this.pageOneWraps = this.getEles(".pageOne>div:first-child");
        this.pageTwoWrap = this.getEle(".pageTwo>div>h1");
        this.pageThreeWrap = this.getEle(".pageThree>div:first-child>h2");
        // elements in animation page
        this.btns = this.getEles(".btns>li");
        this.descWraps = this.getEles(".descWrap>p:last-child");
        this.resumeWrap = this.getEle(".resume .resumeText");
    }

    homeSwitchLan() {
        this.navWraps.forEach((item, index) => {
            item.innerHTML = this.navTexts[index]
        })
        this.pageOneWraps.forEach((item) => {
            item.innerHTML = this.pageOneText
        })
        this.pageTwoWrap.innerHTML = this.pageTwoText
        this.pageThreeWrap.innerHTML = this.pageThreeText
    }

    aniSwitchLan() {
        this.btns.forEach((item, index) => {
            item.innerHTML = this.btnTexts[index]
        })
        this.descWraps.forEach((item, index) => {
            item.innerHTML = this.descTexts[index]
        })
        this.resumeWrap.innerHTML = this.resumeText
    }

    getEle(ele) {
        return document.querySelector(ele);
    }

    getEles(eles) {
        return document.querySelectorAll(eles);
    }
}

const setLans = (() => {
    const getEle = ele => {
        return document.querySelector(ele)
    }
    const homeLan = getEle(".container>.nav>.lan>ul")
    const homeLanSelected = getEle(".nav>.lan>p")
    const aniLan = getEle(".footer>.nav>.lan")
    const aniLanSelected = getEle(".btns>li:first-child>img")
    return {
        setListener() {
            if (homeLan) {
                homeLan.addEventListener("click", event => {
                    const target = event.target;
                    if (target.nodeName.toLowerCase() === "li") {
                        // console.log(target.innerHTML)
                        homeLanSelected.innerHTML = target.innerHTML;
                        eval(`${target.innerHTML}.homeSwitchLan()`)
                    }
                }, false);
            }
            if (aniLan) {
                aniLan.addEventListener("click", event => {
                    const target = event.target;
                    // target can be element "li" and its child node "img"
                    const src = target.nodeName.toLowerCase() === "li" ?
                        target.childNodes[1].getAttribute("src") : target.getAttribute("src");
                    // get the src value and slice the key words
                    aniLanSelected.setAttribute("src", src);
                    const type = src.slice(-6, -4);
                    eval(`${type}.aniSwitchLan()`);
                    aniLan.classList.remove("showLan")
                }, false)
            }
        },
    }
})();

setLans.setListener();

const EN = new multiLan({
    btnTexts: ["<img src='../img/EN.png'>", "Start / Stop", "Reset", "Home"],
    descTexts: [
        "Jilin International Studies University.</br>Bachelor in Spanish Language.",
        "China United Engineering Corporation.</br>Interpretation and translation.",
        "University of Santiago de Compostela.</br>Study Mobility Program.",
        "University of Porto.</br>Master in PLE of FLUP."
    ],
    resumeText: "Hello.</br>My name is Danjun.</br>I am a Frontend Developer.</br>I love languages.",
    navTexts: ["Me", "Stacks", "Contact"],
    pageOneText: "<h1>Hello.</h1><p style='font-weight:600;'>My name is Danjun.</p><p>I am a front-end developer.</br>I like traveling,</br>and meeting new people.</br>I used to be a translator. </br>Now I spend time on,</br>web development stacks.</p>",
    pageTwoText: "Stacks",
    pageThreeText: "Contact"
})

const CN = new multiLan({
    btnTexts: ["<img src='../img/CN.png'>", "开始/停止", "重置", "首页"],
    descTexts: [
        "吉林外国语大学</br>西班牙语",
        "中国联合工程公司</br>西语翻译",
        "圣地亚哥德孔波斯特拉大学</br>学术交流",
        "波尔图大学</br>PLE 硕士"
    ],
    resumeText: "你好。</br>我叫谢丹军。</br>我是一个前端。</br>我喜欢学习语言。",
    navTexts: ["角色", "修行", "撩我"],
    pageOneText: "<h2>吾</h2><p>吾谢氏人士也，</br>身矮貌陋，中庸无才，</p><p>然好编程之技艺，</br>尤为前端之知。</p><p>鄙人深知西学为用，</br>曾处葡萄牙国，为任葡语译者。</p><p>自幼拙而不敏，故勤学补拙，</br>今以前端之技而习之。</p><p>初出茅庐，遂成此作。</p><p>迎同道能士，吾从而师也。</p>",
    pageTwoText: "技术栈",
    pageThreeText: "联系方式"
});

const ES = new multiLan({
    btnTexts: ["<img src='../img/ES.png'>", "Empezar / Parar", "Reiniciar", "Inicio"],
    descTexts: [
        "Universidad de Estudios Internacionales Jilin.</br>Lengua y Literatura Españolas.",
        "China United Engineering Corporation.</br>Interpretación y traducción.",
        "Universidad de Santiago de Compostela.</br>Movilidad de estudio.",
        "Universidad de Porto.</br>Master en PLE de FLUP."
    ],
    resumeText: "Hola.</br>Me llamo Danjun.</br>Soy un programador web.</br>A mi me gustan lenguajes"
})

const PT = new multiLan({
    btnTexts: ["<img src='../img/PT.png'>", "Começar / Parar", "Repor", "Portal"],
    descTexts: [
        "Jilin International Studies University.</br>Língua e Literatura Espanholas.",
        "China United Engineering Corporation.</br>Interpretação e Tradução.",
        "Universidade de Santiago de Compostela.</br>Mobilidade de Estudo.",
        "Universidade do Porto.</br>Mestrado em PLE na FLUP."
    ],
    resumeText: " Olá.</br>Chamo-me Danjun. </br>Sou um programador web.</br>Adoro linguagens."
})

const FR = new multiLan({
    btnTexts: ["<img src='../img/FR.png'>", "Commencer / Cesser", "Réinitialiser", "Accueil"],
    descTexts: [
        "Université Jilin International Studies University.</br>Licence Espagnol.",
        "China United Engineering Corporation.</br>Interprétation et Traduction.",
        "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.",
        "Université de Porto.</br>Master en PLE à FLUP."
    ],
    resumeText: "Bonjour.</br>Je m'appelle Danjun,</br>un programmeur web.</br>J'aime des langages."
})