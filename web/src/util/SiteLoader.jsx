import React from "react";
import { Radio } from "react-loader-spinner";

import "./SiteLoader.scss";

export default ({ size = "lg" }) => (
  <div className="text-primary">
    <Radio
      width={size == "lg" ? 80 : 20}
      height={size == "lg" ? 80 : 20}
      type="Grid"
      fill={null}
      className={`site-loader ${size}`}
    />
  </div>
);
