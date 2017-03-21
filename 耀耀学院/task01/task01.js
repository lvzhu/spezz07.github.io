(function () {
    let checkbtn = document.querySelector(".btn");
    let eBox = document.querySelector(".enterbox");
    let ebDestext = document.querySelector(".enterbox-destext");
    let checkfun = function () {
        let text = document.querySelector(".enterbox").value;
        let ch = 0;
        let en = 0;
        let tempstr;
        for (tempstr of text){ //es6新语法：为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
            if(tempstr.charCodeAt(0)>=0&&tempstr.charCodeAt(0)<=127){//判断是否为英文字母、数字、英文符号
                en++
            }
            else {
                ch++
            }
        }
        return ch*2+en;
    };
    let strlength = function () {
        let len = checkfun();
        console.log(len);
        if(len===0){
            eBox.style.borderColor = "#FA5860";
            ebDestext.style.color = "#FA5860";
            ebDestext.innerText = "姓名不能为空";
        }
        else if(len>=4&&len<=16){
            eBox.style.borderColor = "#60e256";
            ebDestext.style.color = "#60e256";
            ebDestext.innerText = "名称格式正确";
        }
        else {
            eBox.style.borderColor = "#FA5860";
            ebDestext.style.color = "#FA5860";
            ebDestext.innerText = "长度为4-16个字符";
        }
    };
    checkbtn.addEventListener("click",strlength,false) ;
})()