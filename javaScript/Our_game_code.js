var cards_array = [];
var conditions_array = [];
var num_condition = 4;
var num_cards;
var flag_condition = 1;
var index_card = 1;
var kind1 = -1;
var kind2 = -1;
var condition1 = -1;
var condition2 = -1;
var inter1, inter2,inter3;
var count_fisfus = 0;
var count_point = 0;
var level = 2;
var flag_music = true;

var finish = false;

function new_game() {
    alert('new game');
    window.location.reload();
}

//התחלת משחק
function start_cool_game()
{
    //End_game();
    //if (window.opener.l != null)
        //level = window.opener.l;
        //level = window.opener.l;
    //else level = 1;
    index_card=0
    level = 1;
    set_order();
    Create_array_cards();
    Create_array_conditions();
    Change_condition();
    Change_condition();
    timer_condition();
    timer_cardA();
    timer_cardB();
    var s = document.getElementById("audio")
    s.setAttribute("src", "../music/type.wav")
}
function set_order() {
    var y = document.getElementById("order")
    if (level == 2)
        y.innerText = "לחץ על כרטיס המתאים לשני הסמלים"
    else
        y.innerText = ":לחץ על כרטיס המתאים לאחד או לשני הסמלים"
}

function timer_condition() { inter1 = setInterval("Change_condition()", 5000); }
function timer_cardA() { inter2 = setInterval("insert_card('B')", 1200); }
function timer_cardB() { inter3 = setInterval("insert_card('A')", 1200); }
//מילוי מערך תנאים
function Create_array_conditions() {
    var color_array = [{ name: "red", src: "../picture/condition/color_red.png" },
        { name: "purple", src: "../picture/condition/color_purple.png" },
        { name: "green", src: "../picture/condition/color_green.png" }];
    var fill_array = [{ name: "full", src: "../picture/condition/fill_full.png" },
        { name: "empty", src: "../picture/condition/fill_empty.png" },
        { name: "striped", src: "../picture/condition/fill_striped.png" }];

    var shape_array = [{ name: "circle", src: "../picture/condition/shape_ciricle.png" },
        { name: "diamond", src: "../picture/condition/shape_diamond.png" },
        { name: "triangle", src: "../picture/condition/shape_triangle.png" }];

    var amount_array = [{ name: 1, src: "../picture/condition/amount_one.png" },
        { name: 2, src: "../picture/condition/amount_tow.png" },
        { name: 3, src: "../picture/condition/amount_three.png" }];

    conditions_array = [{ name: "color", array: color_array },
    { name: "fill", array: fill_array },
    { name: "shape", array: shape_array },
    { name: "amount", array: amount_array }];
}
//מערך כרטיסים
function Create_array_cards() {
    var colors = new Array("red", "green", "purple");
    var shapes = new Array("circle", "triangle", "diamond");
    num_cards = 81;
    var fill = new Array("striped", "empty", "full");
    var index = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var n = 1; n < 4; n++) {
                    cards_array[index++] = { "color": colors[i], "fill": fill[j], "shape": shapes[k], "amount": n }
                } }} }}

//כל כמה שניות מוסיף כרטיס
function insert_card(c)
{
    var symbol;
    var card;
    //מיקום האלמנט
    card = document.createElement("div");
    card.onclick = chooseCard;
    card.setAttribute("class", "card")
    card.setAttribute("id", index_card)
    document.getElementById("board_cards" + c).appendChild(card)
    var index = Math.floor(Math.random() * num_cards);
    //מעתיק את המאפיינים של הכרטיס המוגרל
    symbol = document.createElement("div");
    symbol.classList.add(cards_array[index].color, cards_array[index].fill, cards_array[index].shape);
    for (var j = 0; j < cards_array[index].amount; j++)
    {
        //מצייר צורות במספר שצריך
        document.getElementById(index_card).appendChild(symbol.cloneNode());
    }
    index_card++;
    var length = document.getElementById("board_cards"+c).querySelectorAll("div").length;
    //var m = document.getElementById("message");
    //m.innerText = length;
    if (length >= 33)
    {
        var remove = document.getElementById("board_cards"+c).querySelector("div");
        ////לשלוח לבדיקת פיספוס
        b1 = check_card(remove, kind1, condition1) == true;
        b2 = check_card(remove, kind2, condition2) == true
        if (b1 && b2)
            count_fisfus++;
        document.getElementById("board_cards"+c).removeChild(remove)
        if (length > 38)
        {
            for (var i = 0; i < length - 38; i++)
            {
                var remove = document.getElementById("board_cards"+c).querySelector("div");
                ////לשלוח לבדיקת פיספוס
                b1 = check_card(remove, kind1, condition1) == true;
                b2 = check_card(remove, kind2, condition2) == true
                if (b1 && b2)
                    count_fisfus++;
                document.getElementById("board_cards"+c).removeChild(remove)
            }
        }
    }
    //אנימציית כניסה
    card.style.animationName = "anim_card";
    card.style.animationDuration = "30s";
    card.style.left = 1400 + "px";
    if (index_card > 30000)
        End_game();
}

function set_music() {
    var s = document.getElementsByClassName("audio")
    if (flag_music) {
        //איך מכבים את המוזיקה
        flag_music = false
    }
    else {
        //להדליק
        flag_music = true

    }

}
function go_home() {
    window.open("home.html");
}
var firstClick = true;
function chooseCard()
{
    if (firstClick) {
        var myadido = document.getElementById("myautoload");
        myadido.play();
        myadido.muted = false;
        firstClick = false;
    }


    //alert("ok");
    //clearInterval(inter1)
    //clearInterval(inter2)
    //clearInterval(inter3)
    if (event.target.children.length > 0) {
        //var x = document.getElementById("message");
        //x.innerText = "-";
        //x.innerText += event.target.children[0].classList + "\n";
        b1 = check_card(event.target, kind1, condition1) == true;
        b2 = check_card(event.target, kind2, condition2) == true
        //x.innerText += "\n"
        var remove = event.target;
        //document.getElementById("board_cards").removeChild(remove)
        Add_point(b1, b2)
        if ((level == 1 && (b1 || b2)) || (level == 2 && (b1 && b2)))
            {
            //לעשות אפקט יפה לכרטיס  ושהאנימציה תמשיך
            var s = document.getElementById("audio")
            s.setAttribute("src", "../music/good.wav")

            event.target.onclick = "nothing()";
            event.target.style.borderStyle = "groove";
            event.target.animationName = "background-position-2";
            event.target.style.animationDuration = "2s";

        }
        else {
            var s = document.getElementById("audio")
            s.setAttribute("src", "../music/wrong4.wav")
            event.target.style.borderStyle = "groove";

        }

    }
    else {
        //alert("problem");
    }
    //timer_cardA();
    //timer_cardB();
    //timer_condition();
}
function nothing() {

}


function check_card(this_card, k1, c1)
{
    //var x = document.getElementById("message");
    switch (conditions_array[k1].name) {
        case "color": if (this_card.children[0].classList[0] == conditions_array[k1].array[c1].name) {
            //x.innerText += " color good ";
            //alert("color good");
            return true;
            break;
        }
        case "fill": if (this_card.children[0].classList[1] == conditions_array[k1].array[c1].name) {
            //x.innerText += " fill good ";
            // alert("fill good");
            return true;
            break;
        }
        case "shape": if (this_card.children[0].classList[2] == conditions_array[k1].array[c1].name) {
            //x.innerText += " shape good ";
            //alert("shape good");
            return true;
            break;
        }
        case "amount": if (this_card.children.length == conditions_array[k1].array[c1].name) {
            //x.innerText += " amount good ";
            // alert("amount good");
            return true;
            break;
        }
    }
}
function Add_point(b1, b2)
{
    var change_point;
    if (level == 1)
        if (b1 && b2) {
            count_point = count_point + 2; change_point = 1;
        }
        else
            if (b1 || b2) { count_point++; change_point =1; }
            else { count_point--; change_point = -1; }
    else
        if (b1 && b2) { count_point = count_point + 2; change_point = 1; }
        else { count_point = count_point - 2; change_point = 1;}        
    var x = document.getElementById("point");
    x.innerText = count_point;
    //if (count_point < 0)
    //    alert("fail");
    var s = document.getElementById("point")
    //if (change_point == 1) {
    s.animationName = "background-position-2";
        s.style.animationDuration = "2s";
    //else {
    //להעלים
    if (level == 1 && (b1 || b2)) {
        s.animationName = "background-position-2";
        s.style.animationDuration = "2s";
    }
    else
        if (level == 2 && (b1 && b2)) {

            s.animationName = "background-position-2";
            s.style.animationDuration = "2s";
        }


}

function Change_condition()
{
    if (flag_condition == 1)
        var s = document.getElementById("condition2");
    else
        var s = document.getElementById("condition1");

    //הגרלת תנאי
    var rnd_kind = Math.floor(Math.random() * (4));
    var rnd_option = Math.floor(Math.random() * (3));
    //אם זה תנאי 1
    if (flag_condition == 1) {
        while (rnd_kind == kind2) {
            rnd_kind = Math.floor(Math.random() * (4));
        }
        kind1 = rnd_kind;
        condition1 = rnd_option;
    }
    //אם זה תנאי 2
    else
    {
        while (rnd_kind == kind1)
        {
            rnd_kind = Math.floor(Math.random() * (4));
        }
        kind2 = rnd_kind;
        condition2 = rnd_option;
    }
    var my_conditom = conditions_array[rnd_kind].array[rnd_option];
    if (flag_condition == 1)
    {
        document.getElementById("condition1").children[0].src = my_conditom.src
        //new_condition = document.createElement("img");
        //new_condition.setAttribute("src", my_conditom.src);
        //.appendChild(new_condition);
        flag_condition = 2;
    }
    else
    {
        document.getElementById("condition2").children[0].src = my_conditom.src;
        flag_condition = 1;
    }
    s.style.animationName = "opocity_card";
    s.style.animationDuration = "2s";
}

function End_game()
{
    //if (count_point > 50)
    //    alert("win");
    //else
    //    alert("fail");
    clearInterval(inter1);
    clearInterval(inter2);
    clearInterval(inter3);
    var s = document.getElementById("numP");
    s.innerText = "you have " + count_point + " points ";
    document.getElementsByTagName("button")[0].click();
}
function exit() {
    window.close();
}

function Move_cards()
{
    var last_cards = document.getElementById("board_cards").getElementsByTagName("div");
    var x = last_cards.length;
    var shem;
    for (var i = x - 1; i >= 0; i--) {
        //alert(last_cards[i].id);
        last_cards[i].id = i + 2;
        shem = i + 2;
        shem = "anim" + shem;
        last_cards[i].style.animationName = shem;
        last_cards[i].style.animationDuration = "2s";
        last_cards[i].style.left = (800 - (i * 200)) + "px";
    }
}

function openHome() {
    window.open("home.html");
}


