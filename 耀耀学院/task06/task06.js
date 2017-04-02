(function () {
    function $(selector, context) {
        if (context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }
    const cover = $(".cover");
    const layer =$(".fl-layer");
    const btn = $(".layer-show");
    const layerSize =  {w:$(".layer-w"), h:$(".layer-h")};
    function openlayer() {
        let bodyW = document.documentElement.scrollWidth;
        let bodyH =  document.documentElement.scrollHeight;
        let browerW = document.documentElement.clientWidth;
        let browerH = document.documentElement.clientHeight;
        let layerW = layerSize.w.value==="" ? 400 : $(".layer-w").value;
        let layerH = layerSize.h.value==="" ? 200 : $(".layer-h").value;
        cover.style.width = bodyW+"px";
        cover.style.height = bodyH+"px";
        cover.style.display = "block";
        layer.style.display = "block";
        layer.style.position = "absolute";
        layer.style.width = layerW===400 ? 400+"px":layerW+"px";
        layer.style.height = layerH===200 ? 200+"px":layerH+"px";
        layer.style.left = (browerW/2)-(layerW/2)+"px";
        layer.style.top = (browerH/2)-(layerH/2)+"px";
    }
    function closelayer(e) {
        let ev = e||window.event;
        if(ev.target.className==="cover"){
            cover.style.display = "none";
            layer.style.display = "none"
        }
        else {
            return false;
        }
    }
    cover.onclick = function (e) {
        closelayer(e)
    };
    btn.onclick = openlayer;

    /*let drag = function(elem,e) {
        let pos = {x:0,y:0};
        let mstartpos = {x:0,y:0};
        let ev=e||window.event;
        let browerW = document.documentElement.clientWidth;
        let browerH = document.documentElement.clientHeight;
        let layerW = parseInt(getStyle(elem,"width"));
        let layerH = parseInt(getStyle(elem,"height"));
        function getStyle(elem, property) {
            // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] : elem.currentStyle[property];
        }
        function elemPos(elem) {
            let elemPosition = getStyle(elem,"position");
            if(elemPosition==="static") {
                elem.style.position = "absolute";
                return pos;
            }
            else {
                let x = parseInt(getStyle(elem,"left"));
                let y = parseInt(getStyle(elem,"top"));
                return pos = {x,y}
            }
        }*/
    /*暂时只用positon定位
     function isTransform() {
     let transform ;
     let transformArray = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
     let tansformdiv = document.createElement("div").style;
     for(let i=0;i<transformArray.length;i++){
     if (transformArray[i] in tansformdiv){
     console.log(transformArray[i]);
     return  transform = transformArray[i]
     }
     else {
     return false
     }
     }
     }
     if(isTransform()){
     let transformName = isTransform();
     let elemTransform = getStyle(elem,transformName);
     if(elemTransform==="none"){
     elem.style[transformName] = "transform(0,0)"
     }
     else {
     let reg = /-?\d+/g;
     let t = elemTransform.match(reg);//因为如果transfrom有数值的话，返回的是matrix矩阵 比如返回值是matrix(1,0,0,20,50) 其中,20和50分别为 translateX和Y的值,获取和设置的就是这个
     let x = parseInt(t[4]);
     let y = parseInt(t[5]);
     return pos = {x,y}
     }
     }*/
    /* function start(ev) {
            let mouseStartX = ev.pageX;
            let mouseStartY = ev.pageY;
            elemPos(elem);
            mstartpos.x = mouseStartX;
            mstartpos.y = mouseStartY;
            event.preventDefault();
            elem.addEventListener('mousemove',move,false);
            elem.addEventListener("mouseup",end,false)
        }
        function setElemPos(elem,disX,disY,ev) {
            let elemLeft = parseInt(elem.style.left);
            let elemTop = parseInt(elem.style.top);
            if(elemLeft+layerW>browerW){
                elem.style.left = browerW - layerW +"px";
                elem.style.top = disY +"px";
            }
            else if(elemLeft < 0){
                elem.style.left = 0 +"px";
            }
            else if(elemTop <0){
                elem.style.top = 0 +"px"
            }
            else if(elemTop+layerH>browerH){
                elem.style.top = browerH - layerH  +"px"

            }
            else{
                elem.style.top = disY +"px";
                elem.style.left = disX +"px"
            }

        }
        function move(ev) {
            let distanceX = ev.pageX - mstartpos.x;
            let distanceY = ev.pageY - mstartpos.y;
            setElemPos(elem,(pos.x+distanceX),(pos.y+distanceY),ev)
        }
        function end() {
            elem.removeEventListener('mousemove',move,false);
            elem.removeEventListener('mouseup',end,false);
        }

        return{move,start,end}
    };
    layer.addEventListener("mousedown",drag(layer).start,false);*/
    function Drag(elem) {//构造函数
        this.elem = elem;
        this.startX = 0;
        this.startY = 0;
        this.disX = 0;
        this.disY = 0;
        this.browerW = document.documentElement.clientWidth;//浏览器宽度
        this.browerH = document.documentElement.clientHeight;
        this.layerW = parseInt(this.getStyle(this.elem,"width"));
        this.layerH = parseInt(this.getStyle(this.elem,"height"));
        this.init();
    }
    Drag.prototype = {
        constructor:Drag,//constructor指向指回Drag
        init:function () {
            this.elemEvent()
        },
        setElemPos:function () {
            let elemLeft = parseInt(this.elem.style.left);
            let elemTop = parseInt(this.elem.style.top);
            if (elemLeft + this.layerW > this.browerW) {//判断位置，不过框架会跳动。。
                this.elem.style.left = this.browerW - this.layerW + "px";
                this.elem.style.top = this.disY + "px";
            }
            else if (elemLeft < 0) {
                this.elem.style.left = 0 + "px";
            }
            else if (elemTop < 0) {
                this.elem.style.top = 0 + "px"
            }
            else if (elemTop + this.layerH > this.browerH) {
                this.elem.style.top = this.browerH - this.layerH + "px"

            }
            else {
                this.elem.style.top = this.disY + "px";
                this.elem.style.left = this.disX + "px"
            }
        },
        elemPos:function () {
            let elemPosition = this.getStyle(this.elem,"position");
            if(elemPosition==="static") {
                this.elem.style.position = "absolute";
                return {startX:0,startY:0}
            }
            else {
                let x = parseInt(this.getStyle(this.elem,"left"));
                let y = parseInt(this.getStyle(this.elem,"top"));
               this.startX = x; this.startY = y;
            }
        },
        getStyle:(elem,prop)=>{//返回传入的元素以及指定的css值
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[prop] : elem.currentStyle[prop]; //另一种写法(elem.currentStyle||document.defaultView.getComputedStyle)[prop];

        },
        elemEvent:function () {
            let _this = this;
            let mouseStart = {x:0,y:0};
            function start(e) {
                let ev = e||window.event;
                mouseStart.x = ev.pageX;
                mouseStart.y = ev.pageY;
                _this.elemPos();
                _this.elem.addEventListener("mousemove",move);//绑定鼠标动作
                _this.elem.addEventListener("mouseup",end)
            }
            function move(e) {
                let ev = e||window.event;
                let tempX = ev.pageX - mouseStart.x;
                let tempY = ev.pageY - mouseStart.y;
                _this.disX = tempX + _this.startX;
                _this.disY = tempY + _this.startY;
                _this.setElemPos()
            }
            function end() {
                _this.elem.removeEventListener("mousemove",move);
                _this.elem.removeEventListener("mouseup",end)
            }
            _this.elem.addEventListener("mousedown",start)
        }

        };
    new Drag(layer);


})();
