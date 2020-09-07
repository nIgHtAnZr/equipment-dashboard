import React from 'react';
import { Button } from 'react-bootstrap';

const InternalServerError = ({ history }) => {
  return (
    <div className="col-md-12 mt-2">
      <h5>Internal Server Error</h5>
      <h6>Please contact administrator</h6>
      <Button
        className="btn btn-primary"
        md="auto"
        onClick={() => history.push('/')}
      >
          Go To Dashboard
      </Button>
    </div>
  );
}

export default InternalServerError;
