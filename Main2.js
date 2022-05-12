addEventListener('load', function () {
    function findPath(type){
        if(type=='便當') return './Main2/image.svg';
        else if(type=='飲料') return './Main2/drink.svg';
        else return './Main2/other.svg';
    }
    function findPath2(type){
        if(type=='葷') return './Main2/meat.svg';
        else return './Main2/veg.svg';
    }
    let post = this.document.getElementById('post');
    var posts =[]
    this.preventDefault()
    $.get('./load_post',{}, (data)=>{
        posts = data;
    })
    for (let i = posts.length - 1; i >= 0; i--) {
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
    let victory = this.document.getElementById('vic_pic');
    let success = this.document.getElementById('suc_pic');
    let recovery = this.document.getElementById('rec_pic');
    let self = this.document.getElementById('sel_pic')
    let ded = this.document.getElementById('ded_pic');
    let doi = this.document.getElementById('doi_pic');
    let che = this.document.getElementById('che_pic')
    let vic_frame = this.document.getElementById('victory');
    let suc_frame = this.document.getElementById('success');
    let rec_frame = this.document.getElementById('recovery');
    let sel_frame = this.document.getElementById('self');
    let ded_frame = this.document.getElementById('ded');
    let doi_frame = this.document.getElementById('doi');
    let che_frame = this.document.getElementById('che');
    let campus = new Array(victory, success, recovery, self, ded, doi, che);
    let cam_frame = new Array(vic_frame, suc_frame, rec_frame, sel_frame, ded_frame, doi_frame, che_frame);
    for (let i = 0; i < campus.length; i++) {
        $(campus[i]).click(function () {
            if ($(cam_frame[i]).hasClass("rotate")) {
                $(cam_frame[i]).removeClass("rotate").addClass("rotate1");
            } else {
                $(cam_frame[i]).removeClass("rotate1").addClass("rotate");
            }
        })
    }
    const listContent = [[]];
    let button = this.document.getElementsByClassName('publish')//對應到按鈕
    let com = this.document.getElementsByClassName('com');//對應到input的text
    let write = this.document.getElementsByClassName('write');
    for (let i = 0; i < button.length; i++) {    //為每個按鈕增加事件
        listContent.push([]);
        button[i].addEventListener('click', function () {
            if (com[i].value != '') {
                cover(com[i].value,i);
                $.get('./addComment',{
                    value: $(com[i]).val(),
                    index: i
                })
                console.log($(com[i]).val());
                console.log( i+1 );
                com[i].value = '';
            }
        })
    }
    function cover(detail,index){
        listContent[index].unshift(detail);
        let htmlStr = write[index].innerHTML;
        htmlStr = htmlStr + `
        <div class="sticker"></div>
        <div class="content">${detail}</div>
        `
        write[index].innerHTML = htmlStr;
    }
    for (let i = 0; i < posts.length; i++) {
        for(let j = 0; j < posts[i].comment.length; j++){
            cover(posts[i].comment[j],i);
        }       
    }
})