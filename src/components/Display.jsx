const Display=({data,date,MaxTemp,MinTemp,NightPrecp,DayPrecp})=>{
  return <>
  <h3>Weather Condition</h3>
  <div>{data}</div>
  <div>{date.split("T")[0]}</div>
  <label htmlFor="dev">Max Temp</label>
  <div id="dev">{Math.round((MaxTemp-32)*(5/9))}<sup>o</sup>C</div>
  <label htmlFor="dev1">Min Temp</label>
  <div id="dev1">{Math.round((MinTemp-32)*(5/9))}<sup>o</sup>C</div>
  <label htmlFor="dev2">DayPrecp</label>
  <div id="dev2">{DayPrecp}</div>
  <label htmlFor="dev3">NightPrecp</label>
  <div id="dev3">{NightPrecp}</div>
   
  </>
}
export default Display;