import React from "react";

export const Cards = (props) => {
  return (
    <div className="col-md-4 mb-4" >
      <div className="card p-2 m-0" style={{ width: '480px', height: '480px' }} >
        <img src={props.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body m-3">
          <h1>{props.fullName}</h1>
          <h4 className="text-start m-0"><strong>Nombre:</strong> {props.firstName}</h4>
          <h4 className="text-start"><strong>Apellido:</strong> {props.lastName}</h4>
          <h4 className="text-start"><strong>Titulo:</strong> {props.title}</h4>
          <h4 className="text-start"><strong>Familia:</strong> {props.family}</h4>
        </div>
      </div>
    </div>
  );
};
