import React, { useState, useEffect, useRef } from "react";
import SimpleReactValidator from 'simple-react-validator';
import './table.css';


export default function App() {
  const [, forceUpdate] = useState();

  const simpleValidator = useRef(new SimpleReactValidator());
  const [data, setData] = useState("");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let response;

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  

  const getData = (query) => {
    fetch("https://try.smilecdr.com/baseR4/Patient")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  };

  const handleSearch = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      return;
    }
    

  let params;
  if(firstName && lastName) {
    params = `?family=${firstName}&given=${lastName}`;
  } else if(firstName && !lastName) {
    params = `?family=${firstName}`;
  } else if(!firstName && lastName) {
    params = `?given=${lastName}`;
  } else params = '';
  response = await fetch(`https://try.smilecdr.com/baseR4/Patient${params}`)
    .then((res) => res.json());
  setData(response);
};

  
  
  const handleReset = () => {
    setFirstName("");
    setLastName("");
    getData();
  };
const [order,setorder] = useState("ASC");
  const sorting =()=>{
    if(order === "ASC"){
      const sorted = [data].sort((a,b)=>
      a.name.family.toLowerCase() > b.name.family.toLowerCase? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
      
    }
    if(order === "DSC"){
      const sorted = [data].sort((a,b)=>
      a.toLowerCase() > b.toLowerCase()? 1 : -1
      );
      setData(sorted);
      setorder("ASC");
      
    }
  };

  

  useEffect(() => {
    getData();
  }, [response]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h2>SMILE CDR</h2>
      <div className="search">
         
        <input
          type="text"
          onkeyup="this.value = this.value.toLowerCase();"
          placeholder="First Name"
          className="searchname1"

          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        
       <input
          type="text"
         
          placeholder="Last Name"
          className="searchname2"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <button className="reset" onClick={handleSearch} style={{ marginRight: '10px' }}>Search</button>
        <button className="reset" onClick={handleReset}>Reset</button>
        <div className="firstname-error-message"> {simpleValidator.current.message('First Name', firstName, 'alpha_num_space')}</div>
        <div className="lastname-error-message">{simpleValidator.current.message('Last Name', lastName, 'alpha_num_space')}</div>
        
      </div>
      <table>
        <th onClick={()=>sorting("family")}>FistName</th>
        <th>LastName</th>
        <th>Adress</th>
        <th>phone</th>
        <th>Gender</th>
        <th>Birthday</th>
        {data && (data.entry) ? (
          <tbody>
            {(data.entry)
              .map((item, i) => (
                <tr key={i}>
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
                    {(item.resource.address && item.resource.address[0].line) || "-"}<br />
                    {(item.resource.address && item.resource.address[0].state) || "-"}<br />
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
        ) : (
            <tr style={{ textAlign: 'center' }}>
              No results found for this search.
            </tr>
        )}
      </table>
      <div className="datetime container">{date} {time}</div>

    </div>



























  );

}



