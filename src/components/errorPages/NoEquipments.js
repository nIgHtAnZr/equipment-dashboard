import React from 'react';
import { Row, Col } from 'react-bootstrap';

const NoEquipments = () => {
  return (
    <div className="col-md-12">
      <Row className="justify-content-md-center">
        <Col md="auto">
          No Data Available
        </Col>
      </Row>
    </div>
  );
}

export default NoEquipments;
