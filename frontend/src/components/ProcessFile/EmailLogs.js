import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io(window.location.origin)

const EmailLogs = (props) => {
  const [tableLogs, setTableLogs] = useState([]);

  useEffect(() => {
    axios.get(window.location.origin + '/api/get-sent-email-logs', { withCredentials: true })
      .then((response) => {
        // Sent logs is a list 
        setTableLogs(response.data.sentLogs)
      })
  }, [])


  useEffect(() => {
    console.log(props.initiator)
    socket.on(props.initiator, log => {
      if (log) {
        setTableLogs([...tableLogs, log])
      }
      console.log(`${props.initiator} ${log}`)
    });

  return () => {
    socket.off(props.initiator);
  };
}, );

return (
  <>
    <h3>
      Mail Sent Logs
    </h3>

    <div className="table-responsive">
      <Table striped bordered hover className="table mt-2">
        <tbody>
          {tableLogs.map((tableLog, index) => (
            <tr key={index} style={{ textAlign: 'left' }}>
              <td>{`${index}. ${tableLog}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </>
)
}

export default EmailLogs