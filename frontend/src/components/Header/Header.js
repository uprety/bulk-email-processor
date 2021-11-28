import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import axios from 'axios'

const Header = (props) => {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        title = 'Welcome'
    }
    const renderLogout = () => {
        if (props.location.pathname === '/home') {
            return (
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    const handleLogout = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/api/logout', { withCredentials: true})
        .then( (response) => {
          if (response.status === 200) {
            
            props.history.push('/login')
          }
        })
        .catch(function (error) {
        });
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
            <NavLink to="/register" ><button className="btn btn-secondary">Register</button></NavLink>
            <NavLink  to="/login"><button className="btn btn-secondary">Login</button></NavLink>
        </nav>
    )
}
export default withRouter(Header);