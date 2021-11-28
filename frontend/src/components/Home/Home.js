import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

const Home = (props) => {
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/api/am-I-allowed-to-send-mail', { withCredentials: true})
      .then( (response) => {
        if (response.status !== 200) {
          redirectToLogin()
        }
      })
      .catch(function (error) {
        redirectToLogin()
      });
  })
  const redirectToLogin = () => {
    props.history.push('/login');
  }
  return (
    <div className="mt-2">
    This is the bulk email send system 
    TODO: 1. Upload email recipient excel file, choose email template, send mail 
    then show logs in real time. This is much more simple than complicated.
    </div>
  )
}

export default withRouter(Home);