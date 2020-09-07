import React from 'react';
import { Button } from 'react-bootstrap';

const Unathourized = ({ history }) => {
  return (
    <div className="col-md-12 mt-2">
      <h5>Failed to authorize</h5>
      <h6>Please check your API key</h6>
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

export default Unathourized;
