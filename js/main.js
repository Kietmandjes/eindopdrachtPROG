class API {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async GetData() {
        if (this.data === null) {
            await fetch(this.url)
                .then(function (response) {
                    return response.json();
                }).then((data) => {
                    this.data = data;
                });
        }
        return this.data;
    }
}

class Header{
    header;
    i;
    h1;
    placeToRenderHeader;

    constructor(placeToRenderHeader){
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];

        this.header = document.createElement("header");
        this.header.classList = "header";

        this.i = document.createElement("i");
        this.i.classList = "fa-solid fa-flask header__logo";

        this.h1 = document.createElement("h1");
        this.h1.classList = "header__h1";
        this.h1.innerText = "Collection of Happines";
    }

    render() {
        this.placeToRenderHeader.appendChild(this.header);
        this.header.appendChild(this.i);
        this.header.appendChild(this.h1);
    }
}

class Main{
    main;
    placeToRenderMain;
    data =[];
    left;
    right;

    constructor(placeToRenderMain,data){
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
        this.data = data;
        this.main = document.createElement("main");
        this.main.classList = ("main");
        this.right = new Right(this.main,this.data);

        this.left = new Left(this.main,this.data,this)
        this.left.render();
        this.right.render();
        this.right.makeRightSection(0)

    }

    render = ()=> {
        this.placeToRenderMain.appendChild(this.main);
    }
}

class Footer{
    footer;
    h2;
    placeToRenderFooter;

    constructor(placeToRenderFooter){
        this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];

        this.footer = document.createElement("footer");
        this.footer.classList = "footer";

        this.h2 = document.createElement("h2");
        this.h2.classList = "footer__h2";
        this.h2.innerText = "Gemaakt door Kiet Mandjes SD2C MediaCollege";
    }

    render() {
        this.placeToRenderFooter.appendChild(this.footer);
        this.footer.appendChild(this.h2);
    }
}

class Left{
    sectionLeft;
    img;
    placeToRenderLeft;
    sectionRight
    constructor(placeToRenderLeft,data,main){
        this.sectionRight = main.right
        
        this.placeToRenderLeft = placeToRenderLeft;
        this.data = data;
        this.sectionLeft = document.createElement("section");
        this.sectionLeft.classList = "section__left";

        for (let i = 0; i < 4; i++) {
            let randomNumber = Math.floor(Math.random() * 7)
            this.img = document.createElement("img");
            this.img.onclick = () =>{
                console.log(this.sectionRight)
                this.sectionRight.makeRightSection(randomNumber)
               
            }

            this.sectionLeft.appendChild(this.img)
            this.img.src = data[randomNumber].img
            this.img.classList = "section__left__img";
        }       
        
    }

    render() {
        this.placeToRenderLeft.appendChild(this.sectionLeft);
    }
}

class Right{
    sectionRight;
    img;
    placeToRenderRight;
    data = [];

    constructor(placeToRenderRight, data){
        this.data = data
        this.placeToRenderRight = placeToRenderRight;

        this.sectionRight = document.createElement("section");
        this.sectionRight.classList = "section__right";

        this.img = document.createElement("img");
        this.img.classList = "section__right__img";

        this.p = document.createElement("p");
        this.p.classList = "section__right__p";

        this.buttonWrapper = document.createElement("div");
        this.buttonWrapper.classList = "buttonWrapper";

        this.audio = document.createElement("audio");
        this.audio.classList = "section__right__audio";
        this.audio.controls = true;        

        this.source = document.createElement("a");
        this.source.classList = "section__right__button--source"; 
        this.source.innerText = "Source >";
        
    }

    makeRightSection =(nummer) =>{

        this.img.src = this.data[nummer].img;
        this.p.innerText = this.data[nummer].summary;
        this.audio.src = this.data[nummer].audio;
        this.source.href = this.data[nummer].url;

    }


    render() {
        this.placeToRenderRight.appendChild(this.sectionRight);
        this.sectionRight.appendChild(this.img);
        this.sectionRight.appendChild(this.p);
        this.sectionRight.appendChild(this.buttonWrapper);
        this.buttonWrapper.appendChild(this.audio);
        this.buttonWrapper.appendChild(this.source);

    }
}

class DetailCard{

}

class App{
    header;
    main;
    left;
    right;
    footer;
    getdata;
    api;

    constructor(){
        this.header = new Header("body");
        this.header.render();

        this.api = new API("./json/data.json");
        this.api.GetData().then((data) => {
            this.main = new Main("body",data.episodes)
            this.main.render()
            this.footer = new Footer("body");
            this.footer.render();   
        })

    }

}

const app = new App();
