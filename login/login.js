
var button = document.getElementById("button");
var account = document.getElementById("account_input");
var password = document.getElementById("password_input");
var go_to_page = document.getElementsByClassName("swal-button--confirm");


function getValue(value_type){
    return value_type.value;
}
var data = {
    'E24086373':'Maple510051',
    'dog':'cat'
}

button.addEventListener("click", function(){
    var isExist = false;
    if(getValue(account) in data){
        if(data[getValue(account)] == getValue(password)){
            isExist = true;
        }
    }
    if(isExist){
        swal({
            title:"Login success!!",
            icon:"success",
            buttons:{
                confirm: {
                    text: "Login Success",
                    visible: true,

                }
            }
        });
        setTimeout(window.location.href="http://luffy.ee.ncku.edu.tw:1833/Main2.html",5000)

    }else{
        swal({
            title:"Your account or password is wrong!!",
            icon:"error",
            buttons:{
                cancel: {
                    text: "Try again",
                    visible: true
                }
            }
        });
    }
})

// for ---------------------------------fb------------------------------------------// 
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback')
    console.log(response)

    // Step 4 code goes here
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        loginMain()
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        //document.getElementById('status').innerHTML = 'Please log into this app.'
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        //document.getElementById('status').innerHTML = 'Please log into Facebook.'
    }
}

// Step 3 code goes here
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response)
    })
}
// Step 2 code goes here
window.fbAsyncInit = function() {
    FB.init({
        appId  : myAppId,
        cookie : true,    // enable cookies to allow the server to access the session
        version: 'v10.0', // use graph api version v10.0
        xfbml  : true,    // parse social plugins on this page
    })
    FB.AppEvents.logPageView()
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response)
    })
}

      // Load the SDK dynamically
      ;(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
      
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

function loginMain() {
    //console.log('Welcome!  Fetching your information.... ')
    FB.api('/me', function(response) {
      console.log(`Successful login for: ${response.name}`)
      var UserId = response.id; //使用者ID
      var Name = response.name; //使用者姓名
      //document.getElementById('status').innerHTML = `Thanks for logging in, ${response.name}!`
      //讀檔>>判斷是否存在(後)>>連到Main2.
      $.get('./login',{
            UID: UserId,
            Uname: Name
        }, (data)=>{
            console.log("User "+data);
            //連到新網頁
            localStorage.setItem("UID",UserId)
            window.location.href = './Main2.html';
            //openWindowWithPost(url, {UID: UserId})
        })
    })
}

function openWindowWithPost(url, data) {
    var form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}