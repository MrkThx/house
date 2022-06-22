var Name = document.getElementById("name");
var ride_time = document.getElementById("ride_time");
var point = document.getElementById("point");
var voucher = document.getElementById("voucher");
//圖標
var house = document.getElementById("house");
var plus = document.getElementById("plus");
var position = document.getElementById("position");
var luckyleaf = document.getElementById("luckyleaf");
var usericon = document.getElementById("usericon");

//名字
var Nametext = "許丞翔";

//點數
var pointtext = 150;

//騎乘次數
var ride_timetext = 3;

//禮卷數量
var vouchertext = 0;

/*local storage 測試
var test_value = localStorage.getItem("123");
localStorage.removeItem("123")
console.log(test_value)*/
$get("./profile",{
    Account:localStorage("UID")
},(data)=>{
    //-------------------//
    Nametext = data.Account
    pointtext = data.HxHpoint
    ride_timetext = data.rides
    vouchertext = data.coupons
    //-------------------//
    Name.textContent = ChangeName(Nametext);
    ride_time.textContent = ride_timetext;
    point.textContent = pointtext;
    voucher.textContent = vouchertext;
    
})
function ChangeName(name){
    if(name.length == 3){
        var newName = "";
        newName += name[0];
        newName += " ";
        newName += name[1];
        newName += " ";
        newName += name[2];
        return newName;
    }else if(name.length == 2){
        var newName = "";
        newName += name[0];
        newName += " ";
        newName += name[1];
        return newName;
    }
};
Name.textContent = ChangeName(Nametext);
ride_time.textContent = ride_timetext;
point.textContent = pointtext;
voucher.textContent = vouchertext;

$(document).ready(function() {
    //回到主頁
    house.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
    //回到發文
    plus.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
    //回到地圖
    position.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
    //回到抽卡
    luckyleaf.addEventListener("click", function(){
        window.location.href='http://www.google.com';
    });
});
