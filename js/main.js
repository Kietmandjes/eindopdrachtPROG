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
        console.log(this.data)
        this.main = document.createElement("main");
        this.main.classList = ("main");
        this.left = new Left(this.main,data)
        this.left.render()
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
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderFooter)[0];

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

    constructor(placeToRenderLeft,data){
        this.placeToRenderLeft = placeToRenderLeft;
        this.data = data;
        this.sectionLeft = document.createElement("section");
        this.sectionLeft.classList = "section__left";

        for (let i = 0; i < 4; i++) {
            let randomNumber = Math.floor(Math.random() * 7)
            this.img = document.createElement("img");

            this.sectionLeft.appendChild(this.img)
            this.img.src = data[randomNumber].img
            this.img.classList = "section__left__img";
            console.log(data[randomNumber])

        }
        
    }

    render() {
        this.placeToRenderLeft.appendChild(this.sectionLeft);
       
    }
}

class Right{
    
}

class GetData{

}



class DetailCard{

}

class App{
    header;
    footer;
    main;
    leftpanel;
    rightpanel;
    getdata;
    api;

    constructor(){
        

        this.api = new API("./json/data.json");
        this.api
            .GetData().then((data) => {

                this.main = new Main("body",data.episodes)
                this.main.render()
            });
    }
}

const app = new App();
