import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import xlsxReader from 'read-excel-file'
import ProcessXlsxFile from '../ProcessFile/XlsxFile';
import EmailLogs from '../ProcessFile/EmailLogs';

const Home = (props) => {
  const [emailTemplates, setEmailTemplates] = useState([])
  const [recipients, setRecipients] = useState([])
  const [selectedTemplateId, setSelectedTemplateId] = useState('')

  const handleSelectTemplateId = (e) => {
      setSelectedTemplateId(e.target.value.split('.', 1)[0])
  }

const readFile = async sF => {
      let emailList = []
      await xlsxReader(sF).then(rows => {
          rows.forEach(items => {
              emailList = [...emailList, ...items]
          })
      })
      return emailList
  }

  const handleSubmitBtn = (e) => {
      const payload = {
          recipients,
          selectedTemplateId,
      }
      axios.post(process.env.REACT_APP_SERVER_URL + '/api/process-mail-jobs', payload, { withCredentials: true })
          .then((response) => {
              if (response.status !== 200) {
                  props.showError(response.data.comment)
              }
              // setEmailTemplates(response.data.mailTemplates)
              props.showError(null)
          })
          .catch(function (error) {
              console.log(error)
              props.showError('Failed to submit task')
          });
  } 
  const handleInputChange = (e) => {
    if (e.target.files[0]) {
      readFile(e.target.files[0])
        .then(
          emailList => {
            setRecipients([...new Set(emailList)])
          }
        )
    }
  }

  const redirectToLogin = () => {
    props.history.push('/login');
  }

  const uniqueObjects = (arr) => {
    return [...new Map(arr.map(item => [item.id, item])).values()]
  }

  useEffect(() => {
      if (selectedTemplateId === '' && emailTemplates.length !== 0) {
          setSelectedTemplateId(`${emailTemplates[0].id}`)
      }
  }, [emailTemplates])

  // For receiving list of email template
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/api/am-I-allowed-to-send-mail', { withCredentials: true})
      .then( (response) => {
        if (response.status !== 200) {
          redirectToLogin()
        }
        setEmailTemplates(uniqueObjects(response.data.mailTemplates))
      })
      .catch(function (error) {
        redirectToLogin()
      });
  }, [])

  return (
    <div className="mt-2">
      <ProcessXlsxFile 
          emailTemplates={emailTemplates} 
          recipients={recipients}
          handleSubmitBtn={handleSubmitBtn}
          handleInputChange={handleInputChange}
          handleSelectTemplateId={handleSelectTemplateId}
      >

      </ProcessXlsxFile>
      <EmailLogs>

      </EmailLogs>
    </div>
  )
}

export default withRouter(Home);