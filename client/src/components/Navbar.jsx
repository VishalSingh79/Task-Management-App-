import React from 'react'
import "./Navbar.css"
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from "../Services/Operations/authService"
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const {token} = useSelector((state) => state.auth);
  
  return (
      <div className="navbar">
        <div className="navbar-left">
          <h2>Task Management App</h2>
        </div>
        <div className="navbar-center">
          {token && (
            <ul>
              <li>Dashboard</li>
              <li><NavLink to="/tasklist">Tasks List</NavLink></li>
            </ul>
          )}
        </div>
        <div className="navbar-right">
          {!token ? (
            <>
             <Link to="/login">
                <button>
                  Login
                </button>
              </Link>

              <Link to="/signup">
                 <button>
                    Signup
                 </button>
              </Link>
              
            </>
          ) : (

            <button
            onClick={()=>logout(navigate, dispatch)}
            >Logout</button>
          )}
        </div>
      </div>
  )
}

export default Navbar
