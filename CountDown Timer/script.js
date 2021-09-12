function countDown() {
    const newYear = new Date('Jan 1, 2022 00:00:00').getTime();
    const currentDate = new Date().getTime();
    const timeLeft = (newYear - currentDate) / 1000;

    const days = Math.floor(timeLeft / 3600 / 24);
    const hours = Math.floor(timeLeft / 3600 % 24);
    const minutes = Math.floor(timeLeft / 60 % 60);
    const seconds = Math.floor(timeLeft % 60);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = formatTime(hours);
    document.getElementById('mins').innerHTML = formatTime(minutes);
    document.getElementById('seconds').innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

setInterval(() => {
    countDown();
}, 1000);