import React from "react";

export const Carousel = (props) => {
	return (
		<div className="card " style={{ maxWidth: '740px', height: '330px' }}>
  <img src={props.image} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h1>{props.fullName}</h1>
  </div>
</div>
	);
};
