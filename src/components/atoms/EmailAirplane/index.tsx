import "./EmailAirplane.css";

function EmailAirplane() {
  return (
    <div className="frame">
      <svg className="icon mail">
        <polyline points="119,1 119,69 1,69 1,1" />
        <polyline points="119,1 60,45 1,1 119,1" />
      </svg>
      <svg className="icon plane">
        <polyline points="119,1 1,59 106,80 119,1" />
        <polyline points="119,1 40,67 43,105 69,73" />
      </svg>
    </div>
  );
}

export default EmailAirplane;
