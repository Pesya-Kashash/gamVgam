var l;
function enterName() {
    document.getElementsByClassName("blackOpasity")[0].style.display = "block";
    document.getElementsByClassName("enterName")[0].style.display = "block";
}
function onEnter() {
    document.getElementById("namePlayer").setAttribute("value", "");
}
function ok() {
    localStorage.namePlayer = document.getElementById("namePlayer").value;//.getAttribute("value");
    document.getElementsByClassName("blackOpasity")[0].style.display = "none";
    document.getElementsByClassName("enterName")[0].style.display = "none";
    document.getElementsByClassName("buttonName")[0].style.display = "none";
    onEnter();
    document.getElementsByClassName("wellcome")[0].style.display = "block";
    document.getElementsByClassName("wellcome")[0].innerHTML = " " + localStorage.namePlayer;

    setTimeout(function () {
        document.getElementsByClassName("wellcome")[0].style.display = "none";
    }, 3000)
}
function CloseWindowLevels() {
    document.getElementsByClassName("blackOpasity")[0].style.display = "none";
    document.getElementsByClassName("windowLevels")[0].style.display = "none";
}
function toGame(lGame)
{
    l = lGame;
    window.open("game.html");
}