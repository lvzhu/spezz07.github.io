(function () {
    function $(selector, context){
        if(context){
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }
let schooldata = {
     bj:["北京大学","清华大学","北京理工","北京师范"],
     sh:["复旦大学","同济大学","上海交通大学","华东师范"],
     gd:["中山大学","华南理工","华南农业","深圳大学"],
     fj:["厦门大学","福州大学","福建师范","福建农林"]
};
    const l = $(".list");
    const t = $(".textarea");
    function sel(e) {
       let ev = e||window.event;
       let target = ev.target.value;
       let schoolName = schooldata[target];
       let s = $(".school");

       s.innerHTML="";
       schoolName.forEach(function (item) {
           s.innerHTML += "<option>" + item + "</option>";
       })
   }
   $("#student").onclick = function () {
       l.style.display = "block";
       t.style.display = "none";
   };
    $("#nostudent").onclick = function () {
        l.style.display = "none";
        t.style.display = "block";
    };
   $(".school-area").addEventListener("change",sel);
})();