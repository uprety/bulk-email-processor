import React from 'react'
import Badge from 'react-bootstrap/Badge'


const EmailBadge = (props) => {
    return (
            <Badge className="mt-4 mb-4 ml-3" style={{fontSize: "1rem"}} variant="info">{props.email}</Badge>
    )
}

export default EmailBadge