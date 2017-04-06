(function () {
    function $(selector, context) {
        if (context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }
    const xingm = $(".data-import-name");
    const yuw = $(".data-import-yuw");
    const shux = $(".data-import-shux");
    const yingy = $(".data-import-yingy");
    const dataEnter = $(".data-import-enter");
    const tableContent = $(".table-container-content");
    const trelem = document.querySelectorAll(".triagle");
    let order = [0,0];//order[0]代表点击的项目，0为语文，1为数学。。依次类推 order[1]代表点击状态0为上，1为下
    function clickTarget(e){
        let ev = e||window.event;
        if(ev.target.className==="triangle-up"){
            order[1] = 0;
        }
        else if(ev.target.className==="triangle-down"){
            order[1] = 1;
        }
        switch (targetPar(ev)){
            case "语文":
                order[0]= 0;
                break;
            case "数学":
                order[0]= 1;
                break;
            case "英语":
                order[0]= 2;
                break;
            case "总分":
                order[0]= 3;
                break;
        }
        console.log(order);
    }
    function targetPar(ev) {
        return ev.target.parentNode.parentNode.innerText
    }
    function sortSorce() {
        let trArray = Array.prototype.slice.call(document.getElementsByTagName("tr"));
        let sortArray = [];
        if(order[1]===0){
            for (let i=1;i<trArray.length;i++) {
                for(let j=i+1;j<trArray.length;j++){
                    if(parseInt(trArray[i].childNodes[order[0]+1].innerText)>parseInt(trArray[j].childNodes[order[0]+1].innerText)){
                        let temp = trArray[i];//冒泡排序
                        trArray[i] = trArray[j];
                        trArray[j] = temp;
                    }
                }
            }
        }
        else if(order[1]===1){
            for (let i=1;i<trArray.length;i++) {
                for(let j=i+1;j<trArray.length;j++){
                    if(parseInt(trArray[i].childNodes[order[0]+1].innerText)<parseInt(trArray[j].childNodes[order[0]+1].innerText)){
                        let temp = trArray[i];
                        trArray[i] = trArray[j];
                        trArray[j] = temp;
                    }
                }

            }
        }
        tableContent.innerHTML ="";
        for (let k = 1;k<trArray.length;k++){
            tableContent.innerHTML+=trArray[k].innerHTML;
        }
    }
    function Sroce(yuwen,shuxue,yingyu,name) {
        this.yuwen = yuwen;
        this.shuxue = shuxue;
        this.yingyu = yingyu;
        this.name = name;
        this.init();
    }
    Sroce.prototype =  {
        constructor:Sroce,
        init:function () {
            this.createTable();
        },
        createTable:function () {
            if(this.yuwen === ""||this.shuxue === ""||this.yingyu === ""||this.name === ""){
                alert("数据不能为空")
            }
            else {
                tableContent.innerHTML+=`<tr><td>${this.name}</td><td>${this.yuwen}</td><td>${this.shuxue}</td><td>${this.yingyu}</td><td>${parseInt(this.yuwen)+ parseInt(this.shuxue)+ parseInt(this.yingyu)}</td></tr>`;
            }
        },
    };
    dataEnter.onclick = function () {
        let yuwen = yuw.value;
        let shuxue = shux.value;
        let yingyu = yingy.value;
        let name = xingm.value;
        new Sroce(yuwen,shuxue,yingyu,name)
    };
    for (let i = 0; i<trelem.length;i++){
        trelem[i].addEventListener("click",clickTarget);
        trelem[i].addEventListener("click",sortSorce)
    }

})();
