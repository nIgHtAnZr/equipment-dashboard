import React from 'react';

const RowCard = ({ title, value }) => {
  return (
    <div className="col-xl-12 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-0">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowCard;
