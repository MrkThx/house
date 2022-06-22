var Name = document.getElementById("account_word2");
var HxH_point = document.getElementById("account_number");
var bando1 = document.getElementById("bando1");
var bando2 = document.getElementById("bando2");
var bando3 = document.getElementById("bando3");
var bando4 = document.getElementById("bando4");
var body = document.getElementById("body");
var reward_window = document.getElementById("reward_window");
var reward_window_word2 = document.getElementById("reward_window_word2");
var reward_window_close = document.getElementById("reward_window_close");
var notice_window_close = document.getElementById("notice_window_close");
//得獎視窗是否存在
var Isexist_reward = false;
//提示視窗是否存在
var Isexist_notice = true;
//圖標
var house = document.getElementById("house");
var plus = document.getElementById("plus");
var position = document.getElementById("position");
var luckyleaf = document.getElementById("luckyleaf");
var usericon = document.getElementById("usericon");

//獎項  禮卷 ; e-SCOOTER 騎乘次數 1 ; e-SCOOTER 騎乘次數 2 ; e-SCOOTER 騎乘次數 3 ; 
var reward = "e-SCOOTER 騎乘次數 1";

//確認是否可以抽卡的函式
function CanChoose(point){
    if(point >= 50){
        return true;
    }else{
        return false;
    }
}
function ChangeName(name){
    if(name.length == 3){
        console.log(3);
        var newName = "";
        newName += name[0];
        newName += " ";
        newName += name[1];
        newName += " ";
        newName += name[2];
        return newName;
    }else if(name.length == 2){
        console.log(2);
        var newName = "";
        newName += name[0];
        newName += " ";
        newName += name[1];
        return newName;
    }
}


//關閉獲得視窗
reward_window_close.addEventListener("click", function(){
    if(Isexist_reward){
        body.style.opacity = 1;
        reward_window.style.visibility = "hidden";
        reward_window.style.opacity = 0;
        Isexist_reward = false;
    }
});
//關閉提示視窗
notice_window_close.addEventListener("click", function(){
    if(Isexist_notice){
        body.style.opacity = 1;
        notice_window.style.visibility = "hidden";
        notice_window.style.opacity = 0;
        Isexist_notice = false;
    }
});
//音效
function playAudio() {
    const audio = document.createElement("audio");
    audio.src = "./card/sound.mp3";
    audio.play();
    setTimeout(() => { audio.pause(); audio.currentTime = 0; }, 4000);
  }


//名字
var Nametext = "許丞翔";
//點數
var pointtext = 150;
//是否可以抽卡
var IsChoose = CanChoose(pointtext);
//Local storage
//var ID_key = 123;
//var ID_value = 456;
//localStorage.setItem(ID_key, ID_value);
//localStorage.clear()
//Name.textContent = ChangeName(Nametext);
//HxH_point.textContent = pointtext;


$(document).ready(function() {

    /*  用ID拿Name跟Point*/
    $.get('./get_information', {
        Account: localStorage.getItem("UID"),
    }, (data) => {
        Nametext = data.Account
        pointtext = data.HxH_point
        IsChoose = CanChoose(pointtext);
        //用ID拿到Name跟point
        Name.textContent = ChangeName(Nametext);
        HxH_point.textContent = pointtext;
    })

    //回到主頁
    house.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
    //回到地圖
    position.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
    //回到發文
    plus.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
    //回到個人頁面
    usericon.addEventListener("click", function(){
        //var ID_key = 123;
        //var ID_value = 456;
        //localStorage.setItem(ID_key, ID_value);
        window.location.href='file:///C:/Users/jason/OneDrive/%E6%A1%8C%E9%9D%A2/%E5%A4%A7%E5%AD%B8%E8%AA%B2%E7%A8%8B/%E4%B8%89%E4%B8%8B%E8%AA%B2%E7%A8%8B/%E7%B6%B2%E9%9A%9B%E7%B6%B2%E8%B7%AF%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88/person/person.html';
    });


    $('#bando1').click((event) => {
        event.preventDefault()
        if(IsChoose){
            playAudio();
            setTimeout(function(){
                bando1.src = "./card/bomb1.png";
            },80);   
            setTimeout(function(){
                bando1.src = "./card/bomb2.png";
            },160);   
            setTimeout(function(){
                bando1.src = "./card/bomb3.png";
            },240);
            setTimeout(function(){
                bando1.src = "./card/bando.png";
            },1000);
            var n1 = Math.round(Math.random()*99);
            if(n1 < 10){
                reward = "SEVEN-ELEVEN 50元 商品禮卷";
            }else if(n1 <= 60){
                reward = "e-SCOOTER 騎乘次數 1";
            }else if(n1 <= 90){
                reward = "e-SCOOTER 騎乘次數 2";
            }else{
                reward = "e-SCOOTER 騎乘次數 3";
            }
            reward_window_word2.textContent = reward;
            setTimeout(function(){
                body.style.opacity = 0.3;
                reward_window.style.visibility = "visible";
                reward_window.style.opacity = 1;
            },1000);
            Isexist_reward = true;
            pointtext -= 50;
            HxH_point.textContent = pointtext;
            IsChoose = CanChoose(pointtext);
            /* 傳送獎項給後端*/
            $.get('./bando_event', {
                reward: reward,
            }, (data) => {
                
            })
            
        }
    })
    $('#bando2').click((event) => {
        event.preventDefault()
        if(IsChoose){
            playAudio();
            setTimeout(function(){
                bando2.src = "./card/bomb1.png";
            },80);   
            setTimeout(function(){
                bando2.src = "./card/bomb2.png";
            },160);   
            setTimeout(function(){
                bando2.src = "./card/bomb3.png";
            },240);
            setTimeout(function(){
                bando2.src = "./card/bando.png";
            },1000);
            var n1 = Math.round(Math.random()*99);
            if(n1 < 10){
                reward = "SEVEN-ELEVEN 50元 商品禮卷";
            }else if(n1 <= 60){
                reward = "e-SCOOTER 騎乘次數 1";
            }else if(n1 <= 90){
                reward = "e-SCOOTER 騎乘次數 2";
            }else{
                reward = "e-SCOOTER 騎乘次數 3";
            }
            reward_window_word2.textContent = reward;
            setTimeout(function(){
                body.style.opacity = 0.3;
                reward_window.style.visibility = "visible";
                reward_window.style.opacity = 1;
            },1000);
            Isexist_reward = true;
            pointtext -= 50;
            HxH_point.textContent = pointtext;
            IsChoose = CanChoose(pointtext);
            /* 傳送獎項給後端*/
            $.get('./bando_event', {
                reward: reward,
            }, (data) => {
                
            })
        }
    })
    $('#bando3').click((event) => {
        event.preventDefault()
        if(IsChoose){
            playAudio();
            setTimeout(function(){
                bando3.src = "./card/bomb1.png";
            },80);   
            setTimeout(function(){
                bando3.src = "./card/bomb2.png";
            },160);   
            setTimeout(function(){
                bando3.src = "./card/bomb3.png";
            },240);
            setTimeout(function(){
                bando3.src = "./card/bando.png";
            },1000);
            var n1 = Math.round(Math.random()*99);
            if(n1 < 10){
                reward = "SEVEN-ELEVEN 50元 商品禮卷";
            }else if(n1 <= 60){
                reward = "e-SCOOTER 騎乘次數 1";
            }else if(n1 <= 90){
                reward = "e-SCOOTER 騎乘次數 2";
            }else{
                reward = "e-SCOOTER 騎乘次數 3";
            }
            reward_window_word2.textContent = reward;
            setTimeout(function(){
                body.style.opacity = 0.3;
                reward_window.style.visibility = "visible";
                reward_window.style.opacity = 1;
            },1000);
            Isexist_reward = true;
            pointtext -= 50;
            HxH_point.textContent = pointtext;
            IsChoose = CanChoose(pointtext);
            /* 傳送獎項給後端*/
            $.get('./bando_event', {
                reward: reward,
            }, (data) => {
                
            })
        }
    })
    $('#bando4').click((event) => {
        event.preventDefault()
        if(IsChoose){
            playAudio();
            setTimeout(function(){
                bando4.src = "./card/bomb1.png";
            },80);   
            setTimeout(function(){
                bando4.src = "./card/bomb2.png";
            },160);   
            setTimeout(function(){
                bando4.src = "./card/bomb3.png";
            },240);
            setTimeout(function(){
                bando4.src = "./card/bando.png";
            },1000);
            var n1 = Math.round(Math.random()*99);
            if(n1 < 10){
                reward = "SEVEN-ELEVEN 50元 商品禮卷";
            }else if(n1 <= 60){
                reward = "e-SCOOTER 騎乘次數 1";
            }else if(n1 <= 90){
                reward = "e-SCOOTER 騎乘次數 2";
            }else{
                reward = "e-SCOOTER 騎乘次數 3";
            }
            reward_window_word2.textContent = reward;
            setTimeout(function(){
                body.style.opacity = 0.3;
                reward_window.style.visibility = "visible";
                reward_window.style.opacity = 1;
            },1000);
            Isexist_reward = true;
            pointtext -= 50;
            HxH_point.textContent = pointtext;
            IsChoose = CanChoose(pointtext);
            /* 傳送獎項給後端*/
            $.get('./bando_event', {
                reward: reward,
            }, (data) => {
                
            })
        }
    })
});



