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
        }

    };

    dataEnter.onclick = function () {
        let yuwen = yuw.value;
        let shuxue = shux.value;
        let yingyu = yingy.value;
        let name = xingm.value;
        new Sroce(yuwen,shuxue,yingyu,name)
    };


})();
