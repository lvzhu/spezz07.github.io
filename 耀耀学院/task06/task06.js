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
    function drag(elem) {
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
        function getStyle(elem, property) {
            // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] : elem.currentStyle[property];
        }
        function elemStartPos(elem) {
             if(isTransform()){

             }
        }
    }


})();