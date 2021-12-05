import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import xlsxReader from 'read-excel-file'
import ProcessXlsxFile from '../ProcessFile/XlsxFile';
import EmailLogs from '../ProcessFile/EmailLogs';

const Home = (props) => {
  const [emailTemplates, setEmailTemplates] = useState([])
  const [initiator, setInitiator] = useState('')
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
    emailList = emailList.filter(em => em)
    return emailList
  }

  const validatorEmail = (address) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(address).toLowerCase())
  }

  const handleSubmitBtn = (e) => {
    const payload = {
      recipients,
      selectedTemplateId,
    }
    axios.post(window.location.origin + '/api/process-mail-jobs', payload, { withCredentials: true })
      .then((response) => {
        props.showError(response.data.comment)
      })
      .catch(function (error) {
        props.showError('Failed to submit task')
      });
  }
  const handleInputChange = (e) => {
    if (e.target.files[0]) {
      readFile(e.target.files[0])
        .then(
          emailList => {
            emailList.map(address => validatorEmail(address))
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
    axios.get(window.location.origin + '/api/am-I-allowed-to-send-mail', { withCredentials: true })
      .then((response) => {
        if (response.status !== 200) {
          redirectToLogin()
        }
        setEmailTemplates(uniqueObjects(response.data.mailTemplates))
        setInitiator(response.data.initiator)
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
      <EmailLogs  initiator={initiator} >

      </EmailLogs>
    </div>
  )
}

export default withRouter(Home);