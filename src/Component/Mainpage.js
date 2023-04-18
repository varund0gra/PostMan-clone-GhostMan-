import React, { useEffect, useState } from "react";
import "../Stylings/mainpage.css";
import axios, { Axios } from "axios";

function Mainpage() {
  // states
  const [rendercard, setrendercard] = useState(false);
  const [renderbody, setrenderbody] = useState(false);
  const [option, setOption] = useState("");
  const [urlbox, seturlbox] = useState('');
  const [apidata, setapidata] = useState([]);
  const [keyvaluetextbox, setkeyvaluetextbox] = useState(false);
  const [jasondata, setjasondata] = useState({});
  const [id, setid] = useState(undefined);
  const [keyvalue, setkeyvalue] = useState(false);
  const [key, setkey] = useState("");
  const [value, setvalue] = useState("");
  const [error , setError] = useState("");

  // on clicking + button
  function handleplusbtn() {
    setrendercard(true);
  }
  function handleclosebtn() {
    setrendercard(false);
  }
  useEffect(()=>{
    if(urlbox!=''){
       const newurl = new URL(urlbox)
       const params = newurl.searchParams;
       params.forEach((_ , param)=>{
        if(param!== key){
          params.delete(param)
        }
       });
       if(value || key){
        newurl.searchParams.set(key , value)
       }
       seturlbox(newurl)
    }
  },[key,value])
  function handlesubmit() {
    axios.interceptors.request.use(request=>{
      document.getElementById('loader').style.display = 'block'
      return request;
    })
    axios.interceptors.response.use(response=>{
      document.getElementById('loader').style.display = 'none';
      return response;
    })

    try {
      if (option == "GET") {
        axios.get(urlbox).then((response) => {
          setapidata(response.data);
          setError("")
        })
      } else if (option == "DELETE") {
        axios.delete(`${urlbox}/${id}`).then((response) => {
          setapidata(response.data);
          setError("")
        })
      } else if (option == "POST") {
        axios.post(urlbox, JSON.parse(jasondata)).then((response) => {
          setapidata(response.data);
          setError("")
        })
  
  
      } else if (option == "PUT") {
        axios.put(`${urlbox}/${id}`, JSON.parse(jasondata)).then((response) => {
          setapidata(response.data);
          setError("")
        })
      }
    } catch (error) {
      setError(error.message)
      setapidata("")
    }
    
  }
  function handlebodybtn() {
    setkeyvaluetextbox(true);
  }
  function handleheder() {
    setkeyvalue(true);
  }
  return (
    <>
     
      
            {/*  */}
            <div>
              <h1 style={{ color: "#6b0505" }}>
                <img
                  src="https://i.postimg.cc/k4n2Hyh3/OIP-removebg-preview.png"
                  className="Gost_img"
                />
                <b className="Jumotron">GhOsTmAn</b>
              </h1>
            </div>
            <div className="container-fluid text-start">
              <div className="row">
                <div className="col-sm-6 ">
                  {rendercard == false ? (
                    <button
                      className="btn btn-lg btn-danger  border border-success "
                      type="button"
                      id="buttonopen"
                      onClick={handleplusbtn}
                    >
                      +
                    </button>
                  ) : (
                    <div className="col-sm-6 d-flex flex-row">
                      <button
                        className="btn btn-lg btn-danger  border border-success  "
                        type="button"
                        // id="buttonopen"
                        onClick={handleclosebtn}
                      >
                        -
                      </button>
                      <div className="card-header">
                        <ul
                          className="nav nav-pills card-header-pills"
                          id="navbar"
                        >
                          <li className="nav-item m-1">
                            <select
                              className="btn btn-info"
                              onChange={(e) => {
                                setOption(e.target.value);
                                setrenderbody(true);
                              }}
                            >
                              <option>Select</option>
                              <option value="GET">Get</option>
                              <option value="POST">Post</option>
                              <option value="PUT">Put</option>
                              <option value="DELETE">Delete</option>
                            </select>
                          </li>
                          <li className="nav-item m-1">
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={handleheder}
                            >
                              QueryParams
                            </button>
                          </li>
                          {renderbody == true && option === "GET" ? (
                            ""
                          ) : (
                            <li className="nav-item m-1">
                              <button
                                type="button"
                                className="btn btn-info"
                                onClick={handlebodybtn}
                              >
                                Body
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div>
                    {keyvalue == true ? (
                      <>
                        <label>
                          <b>key</b>
                        </label>
                        <input
                          type="text"
                          style={{ margin: 20 }}
                          value={key}
                          onChange={(e) => setkey(e.target.value)}
                        />                            
                        <label style={{ margin: 2 }}>
                          <b>value</b>
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setvalue(e.target.value)}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex flex-row p-2">
                    {keyvaluetextbox == true &&
                    option != "GET" &&
                    option != "DELETE" ? (
                      <>
                        <label className="url-label1">JSON</label>
                        <textarea
                          rows={10}
                          className="form-control"
                          onChange={(e) => setjasondata(e.target.value)}
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          {" "}
                        </textarea>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {option == "DELETE" || option == "PUT" ? (
                    <div className="d-flex flex-row p-2">
                      <label className="url-label">Id</label>
                      <input
                        type="number"
                        className="form-control w-50"
                        onChange={(e) => setid(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-row p-2">
                    <label className="url-label">Url</label>
                    <input
                      type="text"
                      className="form-control w-80"
                      value={urlbox}
                      onChange={(e) => seturlbox(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-success m-2"
                      onClick={handlesubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="col-sm-6 bg-gradient-light">
                  <h3>Response</h3>
                  <hr />
                 {error && <label style={{color:"red"}}>{error}</label>}
                  <div>
                     <textarea
                      value={JSON.stringify(apidata, null, 2)}
                      rows={15}
                      cols={80}
                      className="form-control"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontSize: 20,
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
         
          
    </>
  );
}

export default Mainpage;