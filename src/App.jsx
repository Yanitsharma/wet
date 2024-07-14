import Display from './components/Display'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './App.css'
import { useRef, useState } from 'react';
function App() {
const [data,setdata]=useState("");
const [Date,setDate]=useState("");
const [MaxTemp,setMaxTemp]=useState("");
const [MinTemp,setMinTemp]=useState("");
const [DayPrecp,setDayPrecp]=useState("");
const [NightPrecp,setNightPrecp]=useState("");


const search=useRef();

const handleOnSubmit=async (event)=>{
  event.preventDefault();
  const cityName=search.current.value;
  let key;
  
  try{
  let response=await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=bHGqIVzl91DejS6T5Saq3Y97YOEjtAHX&&q=${cityName}`)
  console.log(((response.data)[0]).Key);
   key=((response.data)[0]).Key;
  
  }
  catch(error){
    console.log(error);
    setdata("404 Not Found");
    setDate("");
    setMaxTemp("");
    setMinTemp("");
    setDayPrecp("");
    setNightPrecp("");
  }
  try{
    let response=await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=bHGqIVzl91DejS6T5Saq3Y97YOEjtAHX`)
    console.log(response.data);
    setdata((([(response.data)][0]).Headline).Category);
    setDate(((([(response.data)][0]).DailyForecasts)[0]).Date);
    console.log((((([(response.data)][0]).DailyForecasts)[0]).Temperature).Maximum)
    setMaxTemp(((((([(response.data)][0]).DailyForecasts)[0]).Temperature).Maximum).Value);
    setMinTemp(((((([(response.data)][0]).DailyForecasts)[0]).Temperature).Minimum).Value);
    setDayPrecp((((([(response.data)][0]).DailyForecasts)[0]).Day).IconPhrase)
    setNightPrecp((((([(response.data)][0]).DailyForecasts)[0]).Night).IconPhrase)
}
catch(error){
console.log(error);
}
}
  return (
    <>
    <div className='main'>
    <center>
    <label htmlFor="ip">Search Here</label>
    <input id="ip" type="text" placeholder='Enter your city' ref={search} />
    {(data=="404 Not Found")?<h1>404 Not Found</h1>:""}
   {(data!="404 Not Found"&&data!="")?<Display data={data} date={Date} MaxTemp={MaxTemp} MinTemp={MinTemp} NightPrecp={NightPrecp} DayPrecp={DayPrecp}/>:""}
   <div><button type="button" className="btn btn-success" onClick={handleOnSubmit }>Submit</button></div>
   </center>
   </div>
    </>
  )

}
export default App
