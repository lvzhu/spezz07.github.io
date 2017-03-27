(function () {
    function $(selector, context) {
        if (context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }
    const conW = 490;
    const conH = 490;
    const girdSize = 48;
    function createGird() {
        let gridnum = (conW/(girdSize+1))*(conH/(girdSize+1));
        for(let i=0;i<gridnum;i++){
            let t=document.createElement("div");
            t.className = "grid";
            $(".container").appendChild(t);
        }
    }
    createGird();
    let MG = $(".movegird");
    function Move(gridX,gridY) {
        this.EndX = gridX;
        this.EndY = gridY;
        this.startX = 0;
        this.startY = 0;
        this.direction = 0;//方向0为上;1为右;2为下;3为左;
        this.deg = 0;
        this.init();
    }
    Move.prototype.init = function () {
         let right = ()=>{
             if (this.startX >= this.EndX - 1) {
                 alert("出界了")
             }
             else {
                 MG.style.left = (this.startX + 1) * (girdSize + 1) + "px";
                 this.startX++;
             }
         };
         let left = ()=>{
             if (this.startX <= 0) {
                 alert("出界了")
             }
             else {
                 MG.style.left = (this.startX - 1) * (girdSize + 1) + "px";
                 this.startX--;
             }
         };
         let bottom =()=>{
             if (this.startY >= this.EndY - 1) {
                 alert("出界了");
             }
             else {
                 MG.style.top = (this.startY + 1) * (girdSize + 1) + "px";
                 this.startY++;
             }
         };
         let top = ()=>{
             if(this.startY<=0){
                 alert("出界了")
             }
             else {
                 MG.style.top = (this.startY-1)*(girdSize+1)+"px";
                 this.startY--;
             }
         };
         return {right,left,bottom,top}
    };
    Move.prototype.go = function () {
        if(this.direction===1){
            if (this.startX >= this.EndX - 1) {
                alert("出界了")
            }
            else {
                MG.style.left = (this.startX + 1) * (girdSize + 1) + "px";
                this.startX++;
            }

        }
        else if(this.direction===2){
            if (this.startY >= this.EndY - 1) {
                alert("出界了");
            }
            else {
                MG.style.top = (this.startY + 1) * (girdSize + 1) + "px";
                this.startY++;
            }
        }
        else if(this.direction===3){
            if (this.startX <= 0) {
                alert("出界了")
            }
            else {
                MG.style.left = (this.startX - 1) * (girdSize + 1) + "px";
                this.startX--;
            }
        }
        else if(this.direction===0){
            if(this.startY<=0){
                alert("出界了")
            }
            else {
                MG.style.top = (this.startY-1)*(girdSize+1)+"px";
                this.startY--;
            }
        }
    };
    Move.prototype.lef = function () {
        this.deg-=90;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        if(this.direction===0){
            this.direction = 3;
            MG.style.transform = "rotate(0deg)";
        }
        else {
            this.direction--;
        }
    };
    Move.prototype.rig = function () {
        this.deg+=90;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        if(this.direction===3){
            this.direction = 0;
        }
        else{
            this.direction++;
        }
    };
    Move.prototype.bac = function () {
        this.deg+=180;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        if(this.direction===2){
            this.direction = 0;
        }
        else{
            this.direction+=2;
        }
    };
    Move.prototype.traLef = function () {
        M.init().left();
    };
    Move.prototype.traTop = function () {
        M.init().top();
    };
    Move.prototype.traRig = function () {
        M.init().right();
    };
    Move.prototype.traBot = function () {
        M.init().bottom();
    };
    Move.prototype.movLef = function () {
        this.deg = 270;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        M.init().left();
    };
    Move.prototype.movTop = function () {
        this.deg = 0;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        M.init().top();
    };
    Move.prototype.movRig = function () {
        this.deg = 90;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        M.init().right();

    };
    Move.prototype.movBot = function () {
        this.deg = 180;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        M.init().bottom();
    };
    function moveTo() {
        let command = $(".orderto").value;
        switch (command){
            case "GO":
                M.go();
                break;
            case "TUN LEF":
                M.lef();
                break;
            case "TUN RIG":
                M.rig();
                break;
            case  "TUN BAC":
                M.bac();
                break;
            case "TRA LEF":
                M.traLef();
                break;
            case "TRA TOP":
                M.traTop();
                break;
            case "TRA RIG":
                M.traRig();
                break;
            case "TRA BOT":
                M.traBot();
                break;
            case "MOV LEF":
                M.movLef();
                break;
            case "MOV TOP":
                M.movTop();
                break;
            case "MOV RIG":
                M.movRig();
                break;
            case  "MOV BOT":
                M.movBot();
                break;
        }
    }
    let M = new Move(conW/(girdSize+1),conH/(girdSize+1));
    $(".enter").onclick = moveTo;


})()
