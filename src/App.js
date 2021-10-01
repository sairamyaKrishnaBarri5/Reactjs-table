
import React, { useState, useEffect } from "react";
import './table.css';
//import './Comp/validation.js'

export default function App() {
  const [data, setData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangedob = (event) => {
    setSearchTerm(event.target.value);
  };
  const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();


  useEffect(() => {
    fetch("https://try.smilecdr.com/baseR4/Patient")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  console.log(data.entry, "data");
  

  return (
    <div className="App">
    <div className="search"> <input
        type="text"
        placeholder="Name"
        className="searchname"
        value={searchTerm}
       onChange={handleChange}/>
       <input
        type="text"
        placeholder="dd/mm/yy"
        className="searchname"
        value={searchTerm}
       onChange={handleChangedob}
      

      /><button>Reset</button></div>
      
      <table>
      <th>FirstName</th>
      <th>LastName</th>
      <th>Adress</th>
      <th>phone</th>
      <th>Gender</th>
      <th>Birthday</th>
        {data && (
          <tbody>
            {data.entry.filter((item, i)=>{
              if(searchTerm ==""){
                return item;
              } else{
                if(item.resource.name && item.resource.name[0].family.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.resource.name && item.resource.name[0].given.toLowerCase().includes(searchTerm.toLowerCase())
                 ){
                  return item;
                }

              }

              
            })
            .map((item, i) => (
              <tr>
               <td>
                   {" "}
                  {(item.resource.name && item.resource.name[0].family) || "-"}
                </td>
                <td>
                  {" "}
                  {(item.resource.name && item.resource.name[0].given) || "-"}
                </td>
                
                
                <td>
                  {" "}
                  {(item.resource.address && item.resource.address[0].line) || "-"}<br/>
                  {(item.resource.address && item.resource.address[0].state) || "-"}<br/>
                  {(item.resource.address && item.resource.address[0].postalCode) || "-"}
                </td>
                <td>
                  {" "}
                  {(item.resource.telecom && item.resource.telecom[0].value) || "-"}
                </td>
                

                
                <td>
                  {" "}
                  {(item.resource.gender) || "-"}
                </td>
                <td>
                  {" "}
                  {(item.resource.birthDate) || "-"}
                </td>
                
              </tr>
            ))}
          </tbody>
        )}
      </table>

      
     <div className="datetime container">{date} {time}</div>
    </div>
  


























  );
  
}

