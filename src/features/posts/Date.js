import React from "react";
import { ISOtoDDMMYY } from "../../utility/util";

export const DateComponent = ({ date, className }) => {
  return <div className={className}>{ISOtoDDMMYY(date)}</div>;
};
