class multiLan {
    constructor(obj) {
        // text content in home page
        this.nTitlesV = obj.nTitlesV || null;
        this.p1ResumeV = obj.p1ResumeV || null;
        this.p1BtnV = obj.p1BtnV || null;
        this.p2TitleV = obj.p2TitleV || null;
        this.p3TitlesV = obj.p3TitlesV || null;
        this.p3DescsV = obj.p3DescsV || null;
        // text content in animation page
        this.btnsV = obj.btnsV;
        this.descsV = obj.descsV;
        this.resumeV = obj.resumeV;
        // elements in home page
        this.nTitles = this.getEles(".navTitles>li");
        this.p1Resume = this.getEles(".pageOne>div:first-child");
        this.p1Btn = this.getEles(".pageOne .btn>a");
        this.p2Title = this.getEle(".pageTwo>div>h1");
        this.p3Titles = this.getEles(".pageThree>div>h2");
        this.p3Descs = this.getEles(".pageThree>div>p");
        // elements in animation page
        this.btns = this.getEles(".btns>li");
        this.descs = this.getEles(".descWrap>p:last-child");
        this.resume = this.getEle(".resume .resumeText");
    }

    homeSwitchLan() {
        this.nTitles.forEach((item, index) => {
            item.innerHTML = this.nTitlesV[index]
        })
        this.p1Resume.forEach(item => {
            item.innerHTML = this.p1ResumeV
        })
        this.p1Btn.forEach(item => {
            item.innerHTML = this.p1BtnV
        })
        this.p2Title.innerHTML = this.p2TitleV
        this.p3Titles.forEach((item, index) => {
            item.innerHTML = this.p3TitlesV[index]
        })
        this.p3Descs.forEach((item, index) => {
            item.innerHTML = this.p3DescsV[index]
        })
    }

    aniSwitchLan() {
        this.btns.forEach((item, index) => {
            item.innerHTML = this.btnsV[index]
        })
        this.descs.forEach((item, index) => {
            item.innerHTML = this.descsV[index]
        })
        this.resume.innerHTML = this.resumeV
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
                        homeLanSelected.innerHTML = target.innerHTML;
                        eval(`${target.innerHTML}.homeSwitchLan()`);
                        homeLan.classList.replace("showLan", "hideLan")
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
    btnsV: ["<img src='../img/EN.png'>", "Start / Stop", "Reset", "Home"],
    descsV: [
        "Jilin International Studies University.</br>Bachelor in Spanish Language.",
        "China United Engineering Corporation.</br>Interpretation and translation.",
        "University of Santiago de Compostela.</br>Study Mobility Program.",
        "University of Porto.</br>Master in PLE of FLUP."
    ],
    resumeV: "Hello.</br>My name is Danjun.</br>I am a Frontend Developer.</br>I love languages.",
    nTitlesV: ["Me", "Skills", "More"],
    p1ResumeV: "<h1>Hello.</h1><p style='font-weight:600;'>My name is Danjun.</p><p>I am a front-end developer.</br>I like building things,</br>and meeting new people.</br>I used to be a translator. </br>Now I spend time on,</br>Web Development.</p>",
    p1BtnV: "Resume",
    p2TitleV: "Stacks",
    p3TitlesV: ["Contact", "Links"],
    p3DescsV: ["Feel free to contact me:", "Find things I write on:"]
})

const CN = new multiLan({
    btnsV: ["<img src='../img/CN.png'>", "开始/停止", "重置", "首页"],
    descsV: [
        "吉林外国语大学</br>西班牙语",
        "中国联合工程公司</br>西语翻译",
        "圣地亚哥德孔波斯特拉大学</br>学术交流",
        "波尔图大学</br>PLE 硕士"
    ],
    resumeV: "你好。</br>我叫谢丹军。</br>我是一个前端。</br>我喜欢学习语言。",
    nTitlesV: ["角色", "修行", "撩我"],
    p1BtnV: "经历",
    p1ResumeV: "<h2>吾</h2><p>吾谢氏人士也，</br>身矮貌陋，中庸无才，</p><p>然好编程之技艺，</br>尤为前端之知。</p><p>鄙人深知西学为用，</br>曾处葡萄牙国，为任葡语译者。</p><p>自幼拙而不敏，故勤学补拙，</br>今以前端之技而习之。</p><p>初出茅庐，遂成此作。</p><p>迎同道能士，吾从而师也。</p>",
    p2TitleV: "技术栈",
    p3TitlesV: ["联系方式", "了解更多"],
    p3DescsV: ["通过邮箱联系我:", "我的代码仓库:"]
});

const ES = new multiLan({
    btnsV: ["<img src='../img/ES.png'>", "Empezar / Parar", "Reiniciar", "Inicio"],
    descsV: [
        "Universidad de Estudios Internacionales Jilin.</br>Lengua y Literatura Españolas.",
        "China United Engineering Corporation.</br>Interpretación y traducción.",
        "Universidad de Santiago de Compostela.</br>Movilidad de estudio.",
        "Universidad de Porto.</br>Master en PLE de FLUP."
    ],
    resumeV: "Hola.</br>Me llamo Danjun.</br>Soy un programador web.</br>A mi me gustan lenguajes"
})

const PT = new multiLan({
    btnsV: ["<img src='../img/PT.png'>", "Começar / Parar", "Repor", "Portal"],
    descsV: [
        "Jilin International Studies University.</br>Língua e Literatura Espanholas.",
        "China United Engineering Corporation.</br>Interpretação e Tradução.",
        "Universidade de Santiago de Compostela.</br>Mobilidade de Estudo.",
        "Universidade do Porto.</br>Mestrado em PLE na FLUP."
    ],
    resumeV: " Olá.</br>Chamo-me Danjun. </br>Sou um programador web.</br>Adoro linguagens."
})

const FR = new multiLan({
    btnsV: ["<img src='../img/FR.png'>", "Commencer / Cesser", "Réinitialiser", "Accueil"],
    descsV: [
        "Université Jilin International Studies University.</br>Licence Espagnol.",
        "China United Engineering Corporation.</br>Interprétation et Traduction.",
        "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.",
        "Université de Porto.</br>Master en PLE à FLUP."
    ],
    resumeV: "Bonjour.</br>Je m'appelle Danjun,</br>un programmeur web.</br>J'aime des langages."
})