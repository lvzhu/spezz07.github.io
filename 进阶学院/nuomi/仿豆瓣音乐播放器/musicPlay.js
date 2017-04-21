(function () {
    const musicArrayEl = document.querySelector(".music-list ul");
    const musicload = document.querySelector(".music-load");
    const musictitle = document.querySelector(".music-title");
    const musicsinger = document.querySelector(".music-singer");
    const musicnext =document.querySelector(".glyphicon-step-forward");
    const musicback = document.querySelector(".glyphicon-step-backward");
    const musicplaybtn = document.querySelector(".music-play span:nth-child(2)");
    const musicvolicon = document.querySelector(".music-vol span:nth-child(1)");
    const musicvolbtn = document.querySelector(".music-vol input");
    const musicdelbtn = document.querySelector(".music-operating span:nth-child(2)");
    const musictime = document.querySelector(".music-len");
    const musicnowtime = document.querySelector(".music-time");
    const musiccircle = document.querySelector(".music-circle");
    const musicstrategy = document.querySelector(".music-operating span:nth-child(1)");
    const musicpic = $(".music-circle");
    const searchbtn = document.querySelector(".search-enter");
    let mContent = [];
    let datalist = list;//默认打开的音乐列表
    let lastclick;
    let mIndex = 0;
    datalist["showapi_res_body"]["pagebean"]["contentlist"].forEach(function (item) {
        mContent.push(item)
    });//音乐数据
    searchbtn.onclick = function () {
        let searchvalue = document.querySelector(".search-form").value;
        $.getJSON(`https://route.showapi.com/213-1?showapi_appid=35940&showapi_sign=f1a4fcbd4d4e45eebcf2d9f700aadd9a&keyword=${searchvalue}`,function (data) {
            mContent = [];
            datalist = data;
            datalist["showapi_res_body"]["pagebean"]["contentlist"].forEach(function (item) {
                mContent.push(item)
            });
            mIndex = 0;
            musiclist();
            new MusicPlay(mIndex)
        });
    };//查找歌曲
    function musiclist() {
        musicArrayEl.innerHTML="";
        mContent.forEach(function (item,index) {
            musicArrayEl.innerHTML+= `<li data-index="${index}"><span class="music-list-play"></span ><span class="music-list-name">${item["songname"]}</span><span class="music-list-singer">${item["singername"]}</span></li>`
        });
    }//渲染音乐列表
    function musicNow() {
        let ev= window.event;
        ev.target.dataset.index === undefined ? mIndex = ev.target.parentElement.dataset.index: mIndex = ev.target.dataset.index;
        if(lastclick===mIndex){
            return false
        }
        else {
            lastclick = mIndex;
        }

    }//获取点击的index
    musicArrayEl.addEventListener("click",musicNow,false);//获取点击的index
    class MusicPlay{//音乐播放构造函数
        constructor(index){
            this.mindex = index;
            this.src = mContent[this.mindex]["m4a"];
            this.title = mContent[this.mindex]["songname"];
            this.singer = mContent[this.mindex]["singername"];
            this.pic = mContent[this.mindex]["albumpic_big"];
            this.strategy = 0;
            this.init();
            this.play()

        }
        init(){//事件绑定
            musicnext.addEventListener("click",this.next.bind(this));
            musicback.addEventListener("click",this.back.bind(this));
            musicArrayEl.addEventListener("click",this.play.bind(this));
            musicplaybtn.addEventListener("click",this.pause.bind(this));
            musicload.addEventListener("timeupdate",this.nowtime.bind(this));//audio元素的时间发送变化时候触发事件
            musictime.addEventListener("click",this.changetime.bind(this));
            musicvolbtn.addEventListener("input",this.volchange.bind(this));
            musicdelbtn.addEventListener("click",this.delmusic.bind(this));
            musicstrategy.addEventListener("click",this.playstrategy.bind(this))
        }
        pause(){//暂停
            if(!musicload.paused){
                musicplaybtn.className = "glyphicon glyphicon-play";
                setTimeout(function () {
                    musicload.pause();
                },300);
            }
            else {
                musicplaybtn.className = "glyphicon glyphicon-pause";
                setTimeout(function () {
                    musicload.play();
                },300);
            }
            this.rotate();
        }
        play(){//播放
            if(!musicload.paused){
                musicload.pause();
            }
            if(this.mindex!== mIndex){
                this.change();
                this.play()
            }
            musicload.src = this.src;
            musictitle.innerText = this.title;
            musicsinger.innerText = this.singer;
            musicpic.css("background-image",`url("${this.pic}")`);
            musicplaybtn.className = "glyphicon glyphicon-pause";
            musiccircle.className = "music-circle music-circle-rotate";
            setTimeout(function () {//这是要设置一个setTimeout 不然的话会因为上一个play()或者pause()事件没完成，导致出错
                musicload.play();
            },300);
        }
        next(){//下一首歌
            if(this.strategy===1){//判断是否随机播放
                this.random();
                return
            }
            mIndex++;
            let mLen = mContent.length;
            if(mIndex>=mLen){
                mIndex = 0;
            }
            this.change();
            this.play();

        }
        back(){
            if(this.strategy===1){
                this.random();
                return
            }
            mIndex--;
            let mLen = mContent.length;
            if(mIndex<0){
                mIndex = mLen-1
            }
            console.log(mIndex)
            this.change();
            this.play();
        }
        changetime(e){//进度条拉动事件
            let w =  e.offsetX;
            $(".music-len-top").css("width",parseInt(w)+"px");
            musicload.currentTime = musicload.duration*((w/400));
        }
        nowtime(){//显示当前的播放时间
            let m = Math.floor(musicload.currentTime/60);
            let s = Math.floor(musicload.currentTime%60);
            let nowtime = musicload.currentTime/musicload.duration;
            if(s<10){
                s = `0${s}`;
            }
            musicnowtime.innerText = `${m}:${s}`;
            $(".music-len-top").css("width",parseInt(nowtime*400)+"px");
            if(nowtime===1){
                this.next()
            }
        }
        rotate(){//歌曲图片信息转动
            if(!musicload.paused){
                musiccircle.className = "music-circle";
            }
            else {
                musiccircle.className = "music-circle music-circle-rotate";
            }
        }
        change(){
            this.mindex = mIndex;
            this.src = mContent[this.mindex]["m4a"];
            this.title = mContent[this.mindex]["songname"];
            this.singer = mContent[this.mindex]["singername"];
            this.pic = mContent[this.mindex]["albumpic_big"];
        }
        volchange(){//声音控制
            let value = musicvolbtn.value;
            let vol = value*0.01;
            musicvolbtn.style.background = `linear-gradient(to right, #6e6e6e, #6e6e6e ${value}%, #dadada ${value}%, #dadada 100%)`;
            if(value>80){
                musicvolicon.className = "glyphicon glyphicon-volume-up"
            }
            else if (value<1){
                musicvolicon.className = "glyphicon glyphicon-volume-off"
            }
            else {
                musicvolicon.className = "glyphicon glyphicon-volume-down"
            }
            musicload.volume = vol;
        }
        delmusic(){//删除事件
            let oli = Array.from(document.querySelectorAll(".music-list ul li"));
            let temp ;
            if(oli.length === 1){
                musicload.pause();
                musicload.src = "";
                musictitle.innerText = "无歌手";
                musicsinger.innerText = "无歌曲";
                musicpic.css("background-image",``);
                musiccircle.className = "music-circle";
                musicArrayEl.innerHTML="";
                alert("已经没有歌曲了");
            }
            else {
                oli.forEach(function (item) {
                    if(item.dataset.index == mIndex){
                        temp = item;
                        return
                    }
                });
                musicArrayEl.removeChild(temp);
                mContent.splice(mIndex,1);
                mIndex--;//因为前面数组-1了，所以对应的整体序号也要-1
                musicArrayEl.innerHTML="";
                mContent.forEach(function (item,index) {
                    musicArrayEl.innerHTML+= `<li data-index="${index}"><span class="music-list-play"></span ><span class="music-list-name">${item["songname"]}</span><span class="music-list-singer">${item["singername"]}</span></li>`
                });//重新渲染列表，让data-set的序号正确
                this.next();
            }
        }
        playstrategy(){//随机播放按钮样式
            if(this.strategy===0){
                this.strategy = 1;
                musicstrategy.className = "glyphicon glyphicon-random"
            }
            else if(this.strategy===1){
                this.strategy = 0;
                musicstrategy.className = "glyphicon glyphicon-retweet"
            }
        }
        random(){//随机播放
            let mLen = mContent.length;
            let random = parseInt(Math.random()*(mLen+1),10);
            if(mIndex === random){
                this.random()
            }
            else {
                mIndex = random;
                this.change();
                this.play();
            }
        }
    }
    musiclist();
    new MusicPlay(mIndex)
})();