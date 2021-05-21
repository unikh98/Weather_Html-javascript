// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
var input = document.querySelector('.city');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');


// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    console.log("UserData:"+userData);
    if(userData){
        icon.onclick = ()=>{
          fetch('https://api.openweathermap.org/data/2.5/weather?q='+userData+'&appid=ceb5cb95358309ebab8bbb13fe6d64f2&units=metric ')
          .then(response => response.json())
          .then(data => {
            var tempValue = data['main']['temp'];
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];
        
            main.innerHTML = nameValue;
            desc.innerHTML = "City Clouds : "+descValue;
            temp.innerHTML = "Temperature : "+tempValue+"° Celsius";
            userData ="";
        
          })        
          .catch(err => alert("Wrong City"));
        }
        
        emptyArray = autocom.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    console.log("SelectData:"+selectData);
    icon.onclick = ()=>{
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+selectData+'&appid=ceb5cb95358309ebab8bbb13fe6d64f2&units=metric ')
      .then(response => response.json())
      .then(data => {
        var tempValue = data['main']['temp'];
        var nameValue = data['name'];
        var descValue = data['weather'][0]['description'];
    
        main.innerHTML = nameValue;
        desc.innerHTML = "City Clouds : "+descValue;
        temp.innerHTML = "Temperature : "+tempValue+"° Celsius";
        selectData ="";
    
      })
      .catch(err => alert("Wrong City"));
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}