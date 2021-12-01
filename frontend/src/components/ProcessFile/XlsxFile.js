import React  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import EmailBadge from './EmailBadge' 


const ProcessXlsxFile = (props) => {

    return (
        <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Upload Xlsx file</Form.Label>
            <Form.Control type="file" onChange={props.handleInputChange} size="lg" />
            {props.recipients.map(email => (
                <EmailBadge key={email} email={email}></EmailBadge>
            )
            )}
            <p></p>

            <h3>Select your emali template</h3>
            <Form.Select aria-label="Choose a Mail Template" onChange={props.handleSelectTemplateId}>
                {props.emailTemplates.map(emailTemplate => (
                    <option key={emailTemplate.id} templateid={emailTemplate.id} value={emailTemplate.id + '. ' + emailTemplate.subject}>{emailTemplate.id + '. ' + emailTemplate.subject}</option>
                )
                )}
            </Form.Select>
            <p></p>
            <Button className='mt-3' variant="primary" onClick={props.handleSubmitBtn}>Submit</Button>{' '}

        </Form.Group>
    )
}

export default ProcessXlsxFile;