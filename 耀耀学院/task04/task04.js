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
    }
    Move.prototype.go = function () {
        if(this.direction===1){
            if(this.startX>=this.EndX-1){
                alert("出界了")
            }
            else {
                MG.style.left = (this.startX+1)*(girdSize+1)+"px";
                this.startX++;
            }
        }
        else if(this.direction===2){
            if(this.startY>=this.EndY-1){
                alert("出界了");
            }
            else {
                MG.style.top = (this.startY+1)*(girdSize+1)+"px";
                this.startY++;
            }
        }
        else if(this.direction===3){
            if(this.startX<=0){
                alert("出界了")
            }
            else {
                MG.style.left = (this.startX-1)*(girdSize+1)+"px";
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
            this.direction = 3
        }
        else {
            this.direction--;
        }
    };
    Move.prototype.rig = function () {
        this.deg+=90;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        if(this.direction===3){
            this.direction = 0
        }
        else{
            this.direction++;
        }
    };
    Move.prototype.bac = function () {
        this.deg+=180;
        MG.style.transform = "rotate("+ this.deg + "deg)";
        if(this.direction===2){
            this.direction = 0
        }
        else{
            this.direction+=2;
        }
    };
    function moveTo() {
        let command = $(".orderto").value;
        if(command==="GO"){
            M.go();
        }
        else if(command==="TUN LEF"){
            M.lef();
        }
        else if(command==="TUN RIG"){
            M.rig();
        }
        else if(command==="TUN BAC"){
            M.bac();
        }
    }
    let M = new Move(conW/(girdSize+1),conH/(girdSize+1));
    $(".enter").onclick = moveTo;


})()
