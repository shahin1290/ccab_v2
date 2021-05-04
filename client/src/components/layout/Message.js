import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
export default function Message({ variant, children }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {children}
      </Alert>
    );
  } else {
    return "";
  }
}

Message.defaultProps = { variant: "info" };
