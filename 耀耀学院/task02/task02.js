(function () {
    let checkbtn = document.querySelector(".btn");
    let container = document.querySelectorAll("input[class$='-box']");
    let namepass,pwpass,mailpass,telpass;
    let unsel =function (e) {
        let ev=e||window.event;
        let el=ev.target;
        if(el.className==="name-box"){
            let checkfun = function () {
                let text = el.value;
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
                    Errormes(el);
                    el.nextElementSibling.innerText = "名称不能为空";
                }
                else if(len>=4&&len<=16){
                    Passmes(el);
                    el.nextElementSibling.innerText = "名称格式正确";
                    namepass = 1;

                }
                else {
                    Errormes(el);
                    el.nextElementSibling.innerText = "长度为4-16个字符";
                }
            };

            strlength();
        }
        else if(el.className==="pw-box"){
            if(el.value===""){
                Errormes(el);
                el.nextElementSibling.innerText = "密码为空值"
            }
            else{
                Passmes(el);
                el.nextElementSibling.innerText = "密码可用";


            }

        }
        else if(el.className==="pwenter-box"){
            let pw = document.querySelector(".pw-box").value;
            let pwenter = document.querySelector(".pwenter-box").value;
            if(pw===""||pwenter===""){
                Errormes(el);
                el.nextElementSibling.innerText = "密码为空值"
            }
            else if(pw===pwenter){
                Passmes(el);
                el.nextElementSibling.innerText = "两次密码输入一致";
                pwpass = 1;
            }
            else {
                Errormes(el);
                el.nextElementSibling.innerText = "两次密码输入不一致"
            }
        }
        else if(el.className==="mail-box"){
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(reg.test(el.value)){
                Passmes(el);
                el.nextElementSibling.innerText = "邮箱地址正确";
                mailpass = 1;

            }
            else {
                Errormes(el);
                el.nextElementSibling.innerText = "邮箱地址错误";
            }
        }
        else if(el.className==="tel-box"){
            let reg = /^1[0-9]{10}$/;
            if(reg.test(el.value)){
                Passmes(el);
                el.nextElementSibling.innerText = "电话号码正确";
                telpass = 1;
            }
            else {
                Errormes(el);
                el.nextElementSibling.innerText = "电话号码错误";
            }
        }
    };
    let sel = function (e) {
        let ev=e||window.event;
        let el=ev.target;
        if(el.className==="name-box"){
            Defaultmes(el);
            el.nextElementSibling.innerText = "必填，长度为4-16个字符";
            namepass=0
        }
        else if(el.className==="pw-box"){
            Defaultmes(el);
            el.nextElementSibling.innerText = "必填，长度为4-16个字符";
            pwpass=0
        }
        else if(el.className==="pwenter-box"){
            Defaultmes(el);
            el.nextElementSibling.innerText = "再次输入相同的密码";
            pwpass=0
        }
        else if(el.className==="mail-box"){
            Defaultmes(el);
            el.nextElementSibling.innerText = "请输入邮箱地址";
            mailpass=0
        }
        else if(el.className==="tel-box"){
            Defaultmes(el);
            el.nextElementSibling.innerText = "请输入电话号码";
            telpass=0
        }
    };
    for (let t=0;t<container.length;t++){
        container[t].addEventListener("blur",unsel);
        container[t].addEventListener("focus",sel)
    }
    function Errormes(elem) {
        elem.style.borderColor = "#FA5860";
        elem.nextElementSibling.style.opacity=1;
        elem.nextElementSibling.style.color="#FA5860";
    }
    function Passmes(elem) {
        elem.style.borderColor = "#60e256";
        elem.nextElementSibling.style.opacity=1;
        elem.nextElementSibling.style.color="#60e256";
    }
    function Defaultmes(elem) {
        elem.style.borderColor = "#aaaaaa";
        elem.nextElementSibling.style.opacity=1;
        elem.nextElementSibling.style.color="#999999";
    }
    document.querySelector(".btn").onclick=function () {
        if(namepass===1&&pwpass===1&&mailpass===1&&telpass===1){
            alert("提交成功");
        }
        else {
            alert("提交失败")
        }
    }

})();