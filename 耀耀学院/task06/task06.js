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
    let drag = function(elem,e) {
        let pos = {x:0,y:0};
        let mstartpos = {x:0,y:0};
        let ev=e||window.event;
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
        }
        function start(ev) {
            let mouseStartX = ev.pageX;
            let mouseStartY = ev.pageY;
            elemPos(elem);
            mstartpos.x = mouseStartX;
            mstartpos.y = mouseStartY;

            elem.addEventListener("mouseup",end,false);
            elem.addEventListener('mousemove',move,false);
        }
        function setElemPos(elem,disX,disY) {
            elem.style.top = disY +"px";
            elem.style.left = disX +"px"
        }
        function move(ev) {
            let distanceX = ev.pageX - mstartpos.x;
            let distanceY = ev.pageY - mstartpos.y;
            setElemPos(elem,(pos.x+distanceX),(pos.y+distanceY))
        }
        function end() {
            elem.removeEventListener('mousemove',move,false);
            elem.removeEventListener('mouseup',end,false);
        }

        return{move,start,end}
    };
    layer.addEventListener("mousedown",drag(layer).start,false);
    layer.addEventListener("mouseup",drag(layer).end,false)
})();
