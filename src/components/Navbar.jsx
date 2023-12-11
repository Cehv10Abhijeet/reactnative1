import React , { useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
const NavigationBar = () => {
  const { logout, user } = useAuth();
  const [drop1,setDrop1]=useState("");

  //const { setIdValue } = useInternalContext();

 

  return (
    <Navbar
      className=" px-3 text-white bg-success shadow"
      style={{ top: "0", left: "0", width: "100%" }}
      expand="lg"
    >
      <Navbar.Brand
        exact
        to="/home"
        className="w-100 text-white "
        style={{ fontFamily: "poppins", fontSize: "20px" }}
      >
        {user.UserName}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
       

        <NavLink
            to="/Home"
            className="nav-link text-white  "
            style={{marginRight:"10px",marginLeft:"10px"}}
            activeClassName="active"
            as={NavLink}
          >
            Home
          </NavLink>

        {/* settlement */}
        {user.merchantId==="2"&&
       <>
        <NavDropdown
            title="Settlement"
            id="Thumb"
            className={drop1==1 ? "custom-dropdown active1" : "custom-dropdown"}
            activeClassName="active"
            style={{marginRight:"10px",marginLeft:"10px"}}
          >
          
          
         
              
            
              <NavDropdown.Item
                as={NavLink}
                to="/SettlementProcess"
                
              
              >
                Settlement Process
              </NavDropdown.Item>
            

          
            </NavDropdown>
              </>
            }
          
       
       
        <NavLink
            
            to="/Pay"
            className="nav-link text-white  "
            style={{marginRight:"10px",marginLeft:"10px"}}
            activeClassName="active"
            as={NavLink}
          >
            PayOut
          </NavLink>
          <NavLink
            
            to="/LoadRequest"
            className="nav-link text-white  "
            style={{marginRight:"10px",marginLeft:"10px"}}
            activeClassName="active"
            as={NavLink}
          >
            Load+
          </NavLink>
       
     
         
         <NavDropdown
            title="Report"
            id="Thumb"
            className={drop1==1 ? "custom-dropdown active1" : "custom-dropdown"}
            activeClassName="active"
            style={{marginRight:"10px",marginLeft:"10px"}}
          >
            <NavDropdown.Item
              as={NavLink}
              to="/Report"
             
            
            >
             Pay In Report
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to="/ReportSettlement"
             
            
            >
           Pay Out Report
            </NavDropdown.Item>

        
          </NavDropdown>
         
        
      
    
        

          <NavLink
            onClick={logout}
            to="/"
            className="nav-link text-white bg-danger "
            style={{ borderRadius: "5px" ,marginRight:"10px",marginLeft:"10px",}}
            activeClassName="active"
          >
            Logout
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
