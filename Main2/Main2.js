
var options = {         //before loading the website, run the 定位系統 first
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
var x_now = 0;          //store the coordinate the user is at
var y_now = 0;
function success(pos) {
    var crd = pos.coords;
    x_now = crd.longitude;
    y_now = crd.latitude;
};
let posts = [];

function previous(callback) {
    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
    $.get('./load_post',{}, (data)=>{
        posts = data;
    })
    callback();
}
function later() {
    addEventListener('load', function () {
        //測試怎樣取得現在時間
        this.setInterval(() => {
            console.log(getTimeNow());
        }, 3000);
        function findPath(type) {    //當網頁載入時，會根據input的是便當、飲料或是其他來決定圖片的src
            if (type == '便當') return './Main2/image.svg';
            else if (type == '飲料') return './Main2/drink.svg';
            else return './Main2/other.svg';
        }
        function findPath2(type) {   //根據input是葷食素食來決定圖片
            if (type == '葷') return './Main2/meat.svg';
            else return './Main2/veg.svg';
        }
        let post = this.document.getElementById('post');    //post是html中拿來存貼文的部分，在之後要將post的內容加到這邊

        for (let i = posts.length - 1; i >= 0; i--) {//根據posts的大小，去輸出對應的內容
            let htmlPost = post.innerHTML;
            htmlPost = htmlPost + `
        <div class="food_pic" style="background-image: url(${posts[i].pic})"></div>
            <div class="inf">
                <div class="rest">
                    <div class="diamond"></div>
                    ${posts[i].name}
                </div>
                <div class="love"></div>
                <div class="mess"></div>
                <div class="clearfix"></div>
                <div class="more">MORE INFO...</div>
                <div class="clearfix"></div>
                <div class="type rect">
                    ${posts[i].food}
                    <div class="image" style="background-image: url(${findPath(posts[i].food)})"></div>
                </div>
                <div class="meat rect">
                    ${posts[i].whether}
                    <div class="niku" style="background-image: url(${findPath2(posts[i].whether)})"></div>
                </div>
                <div class="campus rect">
                    校區
                    <div class="where">${posts[i].place}</div>
                </div>
                <div class="detail rect">
                    系館/地點
                    <div class="hard">${posts[i].where}</div>
                </div>
                <div class="clearfix"></div>
                <div class="messages">
                    <div class="person"></div>
                    <input type="text" class="com" placeholder="新增留言" />
                    <div class="publish">發布</div>
                    <div class="write">
                    </div>
                </div>
            </div>
        `
            post.innerHTML = htmlPost;
        }
        let black = this.document.getElementById('black');
        let black_left = this.document.getElementById('black_left');
        let black_middle = this.document.getElementById('black_middle');
        let black_right = this.document.getElementById('black_right');
        let story_vic = [];
        let story_suc = [];
        let story_rec = [];
        let story_sel = [];
        let story_ded = [];
        let story_doi = [];
        let story_che = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].place == '勝利校區' && underOneDay(i)) story_vic.push(posts[i]);
            else if (posts[i].place == '成功校區' && underOneDay(i)) story_suc.push(posts[i]);
            else if (posts[i].place == '光復校區' && underOneDay(i)) story_rec.push(posts[i]);
            else if (posts[i].place == '自強校區' && underOneDay(i)) story_sel.push(posts[i]);
            else if (posts[i].place == '敬業校區' && underOneDay(i)) story_ded.push(posts[i]);
            else if (posts[i].place == '力行校區' && underOneDay(i)) story_doi.push(posts[i]);
            else if (posts[i].place == '成杏校區' && underOneDay(i)) story_che.push(posts[i]);
        }
        //we have to recommend the bendou to the shortest people, so we have to decide which
        //campus is shortest.Thus, we have to change the order in campus, campus depending on the distance
        //Here we will call a request to the backend, the backend will return the order of distance between users and campus
        //the returned array is return_order
        /*
        here is the representation of each number
        成功:suc-0
        勝利:vic-1
        光復:rec-2
        自強:sel-3
        敬業:ded-4
        力行:doi-5
        成杏:che-6
        */
        //需要得到距離每個校區的遠近排名，在這邊加入比較程式碼，會有定位相關的內容
        //scooter_position存著每個scooter點的距離
        var scooter_position = [
            { "longitude": 120.217778, "latitude": 23.002279, "place": "社科院門口" },      //社科院門口-力行校區
            { "longitude": 120.220981, "latitude": 23.001520, "place": "醫學院門口" },      //醫學院門口-成杏校區
            { "longitude": 120.218793, "latitude": 23.002063, "place": "醫院門口" },        //醫院門口-成杏校區
            { "longitude": 120.223084, "latitude": 23.000804, "place": "敬業一舍門口" },    //敬業一舍門口-敬業校區
            { "longitude": 120.220592, "latitude": 22.999822, "place": "圖書館前" },        //圖書館前-成功校區
            { "longitude": 120.219525, "latitude": 22.996241, "place": "博物館前" },        //博物館前-成功校區 
            { "longitude": 120.216225, "latitude": 23.000224, "place": "光復一舍前" },      //光復一舍前 -光復校區
            { "longitude": 120.216477, "latitude": 22.997777, "place": "一活前" },          //一活前-光復校區
            { "longitude": 120.222534, "latitude": 22.997097, "place": "電機系館前" },      //電機系館前-自強校區
            { "longitude": 120.223165, "latitude": 23.000501, "place": "自強籃球場前" },    //自強籃球場前 -自強校區
            { "longitude": 120.220304, "latitude": 22.993173, "place": "勝後" },            //勝後 -勝利校區
            { "longitude": 120.219595, "latitude": 22.996088, "place": "未來館前" }         //未來館前-勝利校區
        ];
        let campusPosition = [
            { "longitude": 120.216621, "latitude": 23.002172, "number": 5 },     //力行校區
            { "longitude": 120.220461, "latitude": 23.001871, "number": 6 },     //成杏校區
            { "longitude": 120.223547, "latitude": 23.001493, "number": 4 },     //敬業校區
            { "longitude": 120.220112, "latitude": 22.998233, "number": 0 },     //成功校區
            { "longitude": 120.216222, "latitude": 22.998574, "number": 2 },     //光復校區
            { "longitude": 120.223080, "latitude": 22.998119, "number": 3 },     //自強校區
            { "longitude": 120.219960, "latitude": 22.994248, "number": 1 }      //勝利校區
        ]
        let result = 0;
        let shortest_now = Number.MAX_SAFE_INTEGER;
        // console.log('x_now is ' + x_now);
        // console.log('y_now is ' + y_now);
        for (var i in scooter_position) {
            var x_distance = Math.pow(scooter_position[i]["longitude"] - x_now, 2);
            var y_distance = Math.pow(scooter_position[i]["latitude"] - y_now, 2);
            var distance = Math.sqrt(x_distance + y_distance);
            // console.log('the current distance is ' + distance);
            if (distance < shortest_now) {
                result = i;
                shortest_now = distance;
            }
            // console.log('The shortest distance is ' + shortest_now);
        }
        //the shortest station is scooter_position[i].Then we have to calculate the shortest campus
        //calculate the distance between the station and each campus
        let campusDis = new Array();//store the distance between the shortest station and each campus
        for (let i in campusPosition) {
            var x_distance = Math.pow(scooter_position[result]["longitude"] - campusPosition[i]["longitude"], 2);
            var y_distance = Math.pow(scooter_position[result]["latitude"] - campusPosition[i]["latitude"], 2);
            var distance = Math.sqrt(x_distance + y_distance);
            campusDis.push({ "distance": distance, "number": campusPosition[i].number });
        }
        let campusDisStore = new Array();
        for (let i in campusDis) {
            campusDisStore.push(campusDis[i].distance);
        }
        let return_order = new Array();
        while (campusDis.length > 0) {  //會根據最近車站到各個校區的距離去決定限動的排序
            let min = Number.MAX_SAFE_INTEGER;
            let index = 0;
            for (let i = 0; i < campusDis.length; i++) {
                if (campusDis[i].distance < min) {
                    min = campusDis[i].distance;
                    index = i;
                }
            }
            return_order.push(campusDis[index].number);
            campusDis.splice(index, 1);
        }
        // console.log(return_order);
        //we have to devise it to the order we want.The story without content will be put at the latest.Let the one with content in the front
        let camOrder = return_order;            //copy the returned array first
        let limit = camOrder.length;            //store the length of it
        for (let i = 0; i < limit; i++) {       //檢查是否該限動有內容，有內容的話保持不變，沒內容的話將他移到最後  
            if (checkLength(camOrder[i])) {     //ure checkLength to check whether there is content in the story
                let item = camOrder[i];         //store the current item first
                camOrder.splice(i, 1);          //delete it
                camOrder.push(item);            //add it back into the array
                limit--;
                i--;
            }
        }
        function checkLength(index) {       //use the checklength to check whether there is story in it.
            if (index == 0) {
                if (story_suc.length == 0) return true;
                else return false;
            } else if (index == 1) {
                if (story_vic.length == 0) return true;
                else return false;
            } else if (index == 2) {
                if (story_rec.length == 0) return true;
                else return false;
            } else if (index == 3) {
                if (story_sel.length == 0) return true;
                else return false;
            } else if (index == 4) {
                if (story_ded.length == 0) return true;
                else return false;
            } else if (index == 5) {
                if (story_doi.length == 0) return true;
                else return false;
            } else {   //index == 6
                if (story_che.length == 0) return true;
                else return false;
            }
        }
        let cam_frame = this.document.getElementsByClassName("cam_frame");
        let campus = this.document.getElementsByClassName("cam_pic");
        for (let i = 0; i < camOrder.length; i++) {                         //add the picture of each campus according to the camOrder
            if (camOrder[i] == 0) campus[i].style.backgroundImage = 'url(./Main2/success.jpg)';
            else if (camOrder[i] == 1) campus[i].style.backgroundImage = 'url(./Main2/victory.jpg)';
            else if (camOrder[i] == 2) campus[i].style.backgroundImage = 'url(./Main2/recovery.jpg)';
            else if (camOrder[i] == 3) campus[i].style.backgroundImage = 'url(./Main2/self.jpg)';
            else if (camOrder[i] == 4) campus[i].style.backgroundImage = 'url(./Main2/ded.jpg)';
            else if (camOrder[i] == 5) campus[i].style.backgroundImage = 'url(./Main2/doi.jpg)';
            else campus[i].style.backgroundImage = 'url(./Main2/che.jpg)';  //if(camOrder[i] == 6)
        }
        //we have to decide whether the story can enter, so we must check the time it's posted.Maybe after one day,the story 
        //can't enter anymore
        //And we have to decide the order of stories depending on the distance between the user and the bendow.
        let hour = 0;
        let minute = 0;
        let second = 0;
        let story = new Array();            //add the story of each campus into the story according to the recommending order
        for (let i = 0; i < camOrder.length; i++) {
            if (camOrder[i] == 0) story.push(story_suc);
            else if (camOrder[i] == 1) story.push(story_vic)
            else if (camOrder[i] == 2) story.push(story_rec)
            else if (camOrder[i] == 3) story.push(story_sel)
            else if (camOrder[i] == 4) story.push(story_ded)
            else if (camOrder[i] == 5) story.push(story_doi)
            else story.push(story_che)  //if(camOrder[i] == 6)
        }

        let data_station = this.document.getElementById('data_station');
        function changeURL() {          //限動中有些東西的資料要現場抓，用changeURL抓
            storyVisible();
            if (index1 < story[number].length) {
                black.style.backgroundImage = `url(${story[number][index1].pic})`;
                story_pic.style.backgroundImage = `url(${story[number][index1].pic})`;
                data_black.innerHTML = `${story[number][index1].name}`
                data[0].innerHTML = `${story[number][index1].whether}`
                data[1].innerHTML = `${story[number][index1].place}`
                data[2].innerHTML = `${story[number][index1].where}`
                timee.innerHTML = calTime();
                data_station.innerHTML = `騎${scooter_position[result].place}的車大概需要${calArriveTime()}分鐘`
            }
        }
        function calArriveTime() {
            let camdistance = findposition(story[number][index1].place);
            // console.log('the distance is :' + camdistance);
            let min = Math.ceil(camdistance / 0.001);
            return min;
        }
        // for(let i in campusDis_store){
        //     console.log(campusDis_store[i].distance + '   ' +  campusDis_store[i].number);
        // }
        function findposition(campusName) {
            //campusDis裡面存著最近的車站到每個校區的距離
            // console.log('store2 is : '+campusDisStore);
            if (campusName == '力行校區') return campusDisStore[0];
            else if (campusName == '成杏校區') return campusDisStore[1];
            else if (campusName == '敬業校區') return campusDisStore[2];
            else if (campusName == '成功校區') return campusDisStore[3];
            else if (campusName == '光復校區') return campusDisStore[4];
            else if (campusName == '自強校區') return campusDisStore[5];
            else if (campusName == '勝利校區') return campusDisStore[6];
        }
        function calTime() {            //the callTime function is used to calculate how long is a story be posted
            let diff = Math.floor((getTimeNow() - story[number][index1].time) / 1000);
            hour = Math.floor((diff / 3600));
            minute = Math.floor(((diff % 3600) / 60));
            second = diff % 60;
            if (hour == 0 && minute == 0) return `${second}秒前`
            else if (hour == 0) return `${minute}分前`
            else return `${hour}小時前`
        }
        function underOneDay(index) {       //use this function to check whether the story has been posted over one day
            let diff = Math.floor((getTimeNow() - posts[index].time) / 1000);
            let difHour = Math.floor((diff / 3600));
            if (difHour > 24) return false;
            else return true;
        }
        let story_pic = this.document.getElementById('story_pic');
        let story_data = this.document.getElementById("story_data");
        let data = document.getElementsByClassName("data");
        let data_black = document.getElementById('data_black');
        for (let i = 0; i < story.length; i++) {
            if (story[i] == 0) cam_frame[i].style.backgroundImage = 'url(./Main2/circle_unact.svg)';
        }//沒有限動的話就把圈圈弄成灰色
        let story_line = this.document.getElementById('story_line');
        let number = 0;//用來存現在跑到第幾個限動
        let timee = this.document.getElementById("time");
        let up = this.document.getElementById('up');
        for (let i = 0; i < campus.length; i++) {
            $(campus[i]).click(function () {                //對每個限動增加選轉功能，點了後會選轉   
                if ($(cam_frame[i]).hasClass("rotate1")) {
                    $(cam_frame[i]).removeClass("rotate1").addClass("rotate");
                } else {
                    $(cam_frame[i]).removeClass("rotate").addClass("rotate1");
                }
            })
            $(campus[i]).click(function () {                //點擊按鈕之後要有限動跑出來
                terminated = false;                         //將terminated先設回false
                number = i;                                 //number對應到在跑的限動的編號
                buildStory();                               //叫buildStory來初始一些東西
                setStory();                                 //setStory來初始化限動的介面
            })
        }
        function buildStory() {
            $(black).css("visibility", "visible");          //先顯示黑色的背景
            storyVisible();                                 //呼叫storyVisible將data跟pic都設為visible
            changeURL();                                    //要改變data、pic的內容
        }
        function destroyStory() {                           //摧毀限動，當限動跑完或是人為刪除的時候，摧毀它
            $(black).css("visibility", "hidden");           //black設為hidden
            storyHidden();                                  //data、pic設為hidden
        }
        function setStory() {
            let htmlStr = story_line.innerHTML;                     //取的story_line中的html程式碼
            for (let j = 0; j < story[number].length; j++) {        //看該個校區有幾個story，就加入幾個線動的線
                htmlStr = htmlStr + `
                <div class="underLine">
                    <div class="upperLine"></div>
                </div>
                `
            }
            story_line.innerHTML = htmlStr;                                 //把改完的內容傳回去
            let underLine = document.getElementsByClassName('underLine');   //抓到那些新增後的線
            for (let j = 0; j < underLine.length; j++) {                    //調整線的寬度以及它的位置
                underLine[j].style.width = ((100 / underLine.length) - 1) + '%';
                underLine[j].style.left = ((100 / underLine.length) * j) + '%';
            }
            if (underLine.length != 0) {                                    //如果萬事俱備時，就開始跑story
                runStory();
            } else {
                destroyStory();                                             //這邊算是debug，如果限動刪除了但是其他東西沒刪除到，會跑destroyStory刪除他
            }
        }
        function runStory() {   //這邊會先將index1設為0
            index1 = 0;
            run(0);             //執行run(0)，開始跑限動的內容
        }
        let timeStart, timeEnd, time;               //the three parametes are used to calculate how long the users touch the screen
        function getTimeNow() {                     //get the start time
            let now = new Date();
            return now.getTime();
        }
        let touch = false;
        let next = true;
        function holdDown() {
            touch = true;                           //When we set the touch to true, it means the screen is touched.將touch設定為true會阻止限動往前跑
            next = true;                            //next is used to decide whether we enter the other story.Here is the intialization
            timeStart = getTimeNow();               //use the getTimeNow function to get the current time 
            time = setInterval(function () {        //use the setInterval to check routly
                timeEnd = getTimeNow();             //get the time right now
                if (timeEnd - timeStart > 200) {    //按超過0.2秒算是長按
                    next = false;                   //長按的話代表想要停止線動，就不會進到下一個限動，next設為false
                    clearInterval(time);            //after 1s clear the interval,
                }
            })
        }
        let index1 = 0;
        let stop = false;                           //stop 用來分辨是否要跳到旁邊的限動，如果是false，就代表不要，如果是1就代表要換限動，順便用來關掉限動相關的interval
        let terminated = false;                     //用來判斷是否要關掉整個限動的功能，要搭配著stop使用
        function holdUp() {                         //當使用者離開螢幕時
            touch = false;                          //將touch設為false
            clearInterval(time);                    //先清掉用來計算長按的interval
            if (next) {                             //if the next is true, it means the user want to enter the next story
                if (leftOrRight != 0) {
                    stop = true;
                }
            }                                       //如果沒有next就代表使用者長按，留在該介面
            timeEnd = timeStart;
        }
        let leftOrRight = 0;                        //這個全域變數是用來看點擊的是往左還是往右，往左的化為true，往右的話為false
        let black_block = new Array(black_middle, black_left, black_right);
        for (let i = 0; i < black_block.length; i++) {
            black_block[i].addEventListener('touchstart', () => {
                leftOrRight = 0;
                holdDown();
            })
            black_block[i].addEventListener('touchend', () => {
                leftOrRight = i;
                holdUp();
            })
        }
        function runNextStory() {
            index1++;
            changeURL();
            run(0);
        }
        function run(direct) {                                              //direct用來控制限動的變化，0代表讓他順順的跑下去，1代表要跳到下一個限動，2代表跳到上一個限動
            let upper = document.getElementsByClassName('upperLine');
            if (index1 <= upper.length - 1 && !terminated) {
                stop = false;
                if (direct == 0) {                                          //順順的跑下去
                    let value = 0;                                          //用value來控制限動的長度，1~100代表趴數
                    let extension = setInterval(function () {
                        if (!touch) value++;                                //如果螢幕沒有被點著才會增加value的值
                        if (upper.length != 0) upper[index1].style.width = value + "%";//改變當前的長度
                        if (value >= 101) this.clearInterval(extension);    //當value跑到100時，代表跑完了
                        if (stop) {
                            this.clearInterval(extension);
                        }
                    }, 30);                                                 //每0.03秒挑整一次限動的長度，然後再呼叫一次自己
                    let next_value = 0;                                     //然後用next_value來看是不是要進入下一個限動
                    let Mytime = setInterval(function () {                  //一樣用setInterval來算三秒
                        if (!touch) {                                       //如果沒有被點的話才會算
                            next_value++;
                        }
                        if (next_value > 100 && !terminated) {              //當next_value到達100時，他才會進到下一個限動
                            clearInterval(Mytime);                          //先清除現在這個interval
                            runNextStory();                                 //跑下一篇限動
                        }
                        if (stop) {
                            clearInterval(Mytime);
                            if (leftOrRight == 1 && !terminated) {
                                run(2);
                            } else if (leftOrRight == 2 && !terminated) {
                                run(1);
                            }
                        }
                    }, 30);//每三秒會呼叫下一條線動，
                }
                else if (direct == 1) {     //跳到下一個限動
                    // this.clearInterval(extension);
                    upper[index1].style.width = "100%";
                    runNextStory();
                } else {                    //回到上一個限動
                    upper[index1].style.width = "0%"
                    if (index1 != 0) {
                        upper[--index1].style.width = "0%"
                        changeURL();
                        run(0);
                    } else {
                        run(0);
                    }
                }
            } else {
                if (upper.length != 0) {
                    // console.log('cloooose');
                    // close();
                    storyHidden();
                    black.animate({
                        left: "-100vh"
                    }, 150);
                    setTimeout(() => {
                        destroyStory();
                        endStory();
                    }, 150);
                    setTimeout(() => {
                        nextStory();
                    }, 200)
                }                    //限動全部點完之後會進到下一個限動
            }
        }
        function close() {
            destroyStory();
            story_line.innerHTML = ``;
            index1 = 0;
        }
        let startPositionY = 0;
        let startPositionX = 0;
        let distanceY = 0;
        let distanceX = 0;
        let X = false;
        let Y = false;
        function getArray(now) {
            let arrA = new Array(now, story_pic, story_data, story_line, timee, data_station, up);
            return arrA;
        }
        black.addEventListener('touchstart', function (e) {
            startPositionY = e.touches[0].pageY;
            startPositionX = e.touches[0].pageX;
        })
        black.addEventListener('touchmove', function (e) {
            const currentPositionY = e.touches[0].pageY;
            const currentPositionX = e.touches[0].pageX;
            distanceY = currentPositionY - startPositionY;
            distanceX = currentPositionX - startPositionX;
            if (distanceY < 250 && distanceY > 0 && !X) { //往上下拉
                Y = true;
                let arr = getArray(this);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transition = 'transform 0s';
                    arr[i].style.transform = `translateY(${distanceY}px)`
                }
            }
            if (distanceX > -350 && distanceX < 350 && !Y) {  //現在可以真的往左右拉
                X = true;
                let arr = new Array(this, story_pic, story_data);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transition = 'transform 0s';
                    arr[i].style.transform = `scale(0.9) translateX(${distanceX}px)`;
                }
            }
        })
        black.addEventListener('touchend', function (e) {
            this.style.transition = 'transform 1s';
            if (distanceX > -300 && distanceX < 300 && !Y) {  //拉的不夠深，要還原到原本的位置，左右拉
                let arr = new Array(this, story_pic, story_data);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transform = `scale(1.11) translateX(0px)`;
                }
                X = false;
                return;
            }
            if (distanceY > 0 && distanceY < 200 && !X) {   //拉的不夠深，要還原到原本的位置，上下拉
                let arr = getArray(this);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transform = `translateY(0px)`;
                }
                Y = false;
                return;
            }
            if (distanceY > 200 && !X) {                    //拉得夠深了，跑出刪除的動畫
                let arr = getArray(this);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transform = `translateY(100px)`;
                }
                Y = false;
                storyHidden();
                black.animate({
                    top: "100vh"
                }, 300);
                setTimeout(() => {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].style.transform = `translateY(0px)`;
                    }
                    endStory();
                }, 300);
            }
            if (distanceY < -200 && !X) {                    //拉得夠深了，跑出刪除的動畫
                window.location.href = '../Map2/Map2.html';
            }
            if (distanceX < -300 && !Y) {       //將會進到下一個限動(往左拉)
                let arr = new Array(this, story_pic, story_data);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transform = `scale(1.11)`; //translateX(0px)
                }
                X = false;
                storyHidden();
                black.animate({
                    left: "-100vh"
                }, 200);
                setTimeout(() => {
                    destroyStory();
                    endStory();
                }, 200);

                setTimeout(() => {
                    nextStory();
                }, 300)
            }
            if (distanceX > 300 && !Y) {       //將會進到下一個限動(往左拉)
                let arr = new Array(this, story_pic, story_data);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.transform = `scale(1.11)`;
                }
                X = false;
                storyHidden();
                black.animate({
                    left: "100vh"
                }, 200);
                setTimeout(() => {
                    destroyStory();
                    endStory();
                }, 200);

                setTimeout(() => {
                    lastStory();
                }, 300)
            }
            distanceY = 0;
            distanceX = 0;
            X = false;
            Y = false;
        })
        function nextStory() {
            if (number != 6 && story[number + 1].length != 0) {
                number++;
                buildStory();
                terminated = false;
                setStory();
                storyVisible();
            }
        }
        function lastStory() {
            if (number != 0 && story[number - 1].length != 0) {
                number--;
                buildStory();
                terminated = false;
                setStory();
                storyVisible();
            }
        }
        function endStory() {   //結束story
            terminated = true;
            stop = true;
            close();
        }
        function storyVisible() {//用這個function來同時讓限動中的pic跟data出現
            $(story_pic).css("visibility", "visible");
            $(story_data).css("visibility", "visible");
            $(timee).css("visibility", "visible");
            $(data_station).css("visibility", "visible");
            $(up).css("visibility", "visible");
        }
        function storyHidden() { //用這個function來同時讓限動中的pic跟data消失S
            $(story_pic).css("visibility", "hidden");
            $(story_data).css("visibility", "hidden");
            $(timee).css("visibility", "hidden");
            $(data_station).css("visibility", "hidden");
            $(up).css("visibility", "hidden");
        }
        up.addEventListener('click', () => {
            window.location.href = '../Map2/Map2.html';
        })
        let wheree = this.document.getElementById('where');
        wheree.addEventListener('click', () => {
            // console.log('touched');
            window.location.href = '../Map2/Map2.html';
        })
        const listContent = [[]];//設一個二維陣列，用來存每篇貼文對應到的留言
        let button = this.document.getElementsByClassName('publish')//對應到按鈕
        let com = this.document.getElementsByClassName('com');//對應到input的text
        let write = this.document.getElementsByClassName('write');
        for (let i = 0; i < button.length; i++) {               //為每個按鈕增加事件
            listContent.push([]);                               //每一個按鈕就代表有一個貼文，所以就用push將貼文丟進去
            button[i].addEventListener('click', function () {   //在點擊按鈕之後
                if (com[i].value != '') {                       //如果輸入的內容不是空的話
                    cover(com[i].value, i);                      //就呼叫cover function來新增內容，第一個參數是新增的內容，第二個參數是對第幾個貼文
                    $.get('../addComment', {                     //傳到後端讓其他使用者也可以看到
                        value: $(com[i]).val(),
                        index: i + 1
                    })
                    com[i].value = '';                          //將輸入的內容設為0
                }
            })
        }
        function cover(detail, index) {                           //用來加入留言內容
            listContent[index].unshift(detail);                 //從前面加入
            let htmlStr = write[index].innerHTML;               //先抓到原有的html code
            htmlStr = htmlStr + `                               
        <div class="sticker"></div>
        <div class="content">${detail}</div>
        `
            write[index].innerHTML = htmlStr;                   //把加入後的html弄回去
        }
        for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < posts[i].comment.length; j++) {
                cover(posts[i].comment[j], posts.length - 1 - i);
            }
        }
    })
}
previous(later);