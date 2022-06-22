addEventListener('load', function () {
    let stationNum = [];
    $.get('./load', {
    }, (number) => {
        stationNum = number;
        //利用$.get的callback function,確保程式碼的執行有先後順序
        callback();
    })
    function callback() {
        let available = this.document.getElementsByClassName('available');
        let partable = this.document.getElementsByClassName('partable');
        for (let i = 0; i < available.length; i++) {
            available[i].innerHTML = stationNum[2 * i];
            partable[i].innerHTML = stationNum[2 * i + 1];
        }
        let home = this.document.getElementById('home');
        home.addEventListener('click', () => {
            window.location.href = '../Main2/Main2.html';
        })
        let buttons = this.document.getElementsByClassName('book');
        for (let i = 0; i < buttons.length; i++) {
            $(buttons[i]).click((event) => {
                event.preventDefault();
                $.get('./book', {
                    index: i
                }, (data) => {
                    available[i].innerHTML = data.available;
                    partable[i].innerHTML = data.partable;
                    this.alert(data.text);
                })
            })
        }
    }
})