///DOM 
let userCityInput = document.querySelector("#city_name");
let userSubmitButton = document.querySelector("#submit_input");
let container = document.querySelector(".container");
/*let containerToday = document.querySelector(".container_today");
let containerTommorow = document.querySelector(".container_tommorow");
let containerThird = document.querySelector(".container_third");
let containerFourth = document.querySelector(".container_fourth");
let containerFifth = document.querySelector(".container_fifth");*/
///VARIABLES
let apiKey="5cb7aeb780f984e2321afc36e450468b";
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday"];
const d = new Date();
let day = d.getDay();
let today = DAYS[day];
let tommorow = DAYS[day+1];
let third = DAYS[day+2];
let fourth = DAYS[day+3];
let fifth = DAYS[day+4];
let villeSet;
let containerCity;
///FUNCTIONS
function capitalize(str){
  return str[0].toUpperCase()+str.substr(1);
}
async function handleSubmit(){
  try{
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput.value}&appid=${apiKey}&units=metric`)
    .then(res=>res.json())
    .then(value => {
      console.log(value);
      let todayData = value['list'][0];
      let tommorowData = value['list'][8];
      let thirdData = value['list'][16];
      let fourthData = value['list'][24];
      let fifthData = value['list'][32];
      console.log(todayData);
      villeSet = 0;
      createForecast(todayData,today,value);
      //createForecast(tommorowData,tommorow,value);
      //createForecast(thirdData,third,value);
      //createForecast(fourthData,fourth,value);
      //createForecast(fifthData,fifth,value);
    });
  }
  catch(error){
    console.error(error);
  }
};

function createForecast(dataDay,day,fullData){
  if(villeSet == 0)
  {
    containerCity = document.createElement("div");
    containerCity.classList.add("container_city");
    container.appendChild(containerCity);
    villeSet++;
  }
  //CREATECONTAINER
  // let containerDay = document.createElement("div");
  // containerDay.classList.add("container_days");
  // containerCity.appendChild(containerDay);
  let containerDay = createElementCustom("div","container_days",null,containerCity);
  let containerCol = createElementCustom("div","container_column",null,containerDay);
  let containerColumnContent = createElementCustom("div","container_column_content",null,containerCol);
  let containerRow = createElementCustom("div","container_row",null,containerDay);
  let containerRowContent = createElementCustom("div","container_row_content",null,containerRow);
  createElementCustom("p","p_dayofweek",fullData["city"]["name"]+", "+fullData["city"]["country"],containerColumnContent);
  createElementCustom("p","p_dayofweek",day,containerColumnContent); 
  let myImg = document.createElement("img");
  myImg.setAttribute("src",`http://openweathermap.org/img/wn/${dataDay["weather"][0]["icon"]}.png`);
  containerColumnContent.appendChild(myImg);

  
  createParagraph(containerRowContent,"Date/Heure : ")
  createElementCustom("p","p_days",dataDay["dt_txt"],containerRowContent); 
  createParagraph(containerRowContent,"Temperature felt : ");
  createElementCustom("p","p_days",dataDay["main"]["feels_like"]+"°C",containerRowContent);
  createParagraph(containerRowContent,"Minimal Temperature :");
  createElementCustom("p","p_days",dataDay["main"]["temp_min"]+"°C",containerRowContent);
  createParagraph(containerRowContent,"Maximal Temperature :");
  createElementCustom("p","p_days",dataDay["main"]["temp_max"]+"°C",containerRowContent);
  createParagraph(containerRowContent,"Temperature :");
  createElementCustom("p","p_days",dataDay["main"]["temp"]+"°C",containerRowContent);
  if(dataDay["main"]["temp"] > 20)
  {
    containerCity.style.background = 'rgb(131,58,180)';
    containerCity.style.background = 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)';
    containerDay.style.backgroundColor = 'orange';
  }
  createParagraph(containerRowContent,"Percentage of rain :");
  createElementCustom("p","p_days",Math.round(dataDay["pop"]*100,2)+"%",containerRowContent);
  createParagraph(containerRowContent,"Weather report :");
  createElementCustom("p","p_days",capitalize(dataDay["weather"][0]["description"]),containerRowContent);

};
function createParagraph(targetP,textP){
  let myParagraph=document.createElement("p");
  myParagraph.classList.add("p_title");
  myParagraph.textContent = textP;
  targetP.appendChild(myParagraph);
}
function createElementCustom(elementP,classP,textP,targetP){
  let paramP = document.createElement(elementP);
  paramP.classList.add(classP);
  paramP.textContent = textP;
  targetP.appendChild(paramP);
  return paramP;
}
///EVENT LISTENERS
userSubmitButton.addEventListener("click",handleSubmit);