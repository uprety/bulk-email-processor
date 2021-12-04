import React, { useState, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io(window.location.origin)
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const EmailLogs = (props) => {
  const myRef = useRef(null)
  const [tableLogs, setTableLogs] = useState([]);

  useEffect(() => {
    axios.get(window.location.origin + '/api/get-sent-email-logs', { withCredentials: true })
      .then((response) => {
        // Sent logs is a list 
        setTableLogs(response.data.sentLogs)
      })
  }, [])


  useEffect(() => {
    socket.on(props.initiator, log => {
      if (log) {
        setTableLogs([...tableLogs, log])
        scrollToRef(myRef)
      }
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
              <td>{index}. To <span className="text-primary">{tableLog.to}</span> from <span className="text-info">{tableLog.from}</span> Status <span className="text-success">{tableLog.status}</span></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <div ref={myRef}></div> 
  </>
)
}

export default EmailLogs