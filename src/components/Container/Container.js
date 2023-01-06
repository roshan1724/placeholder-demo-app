import "./Container.scss";

import Summary from "../Incident/Summary/Summary";
import Details from "../Incident/Details/Details";
import Options from "../Incident/Options/Options";

function Container() {
  return (
    <section className="container-wrapper p-3 mb-3">
      <div className="row">
        <div className="col-12 col-md-4 section-container">
            <Summary className="h-100" />
        </div>
        <div className="col-12 col-md-4 section-container">
            <Details className="h-100" />
        </div>
        <div className="col-12 col-md-4 section-container">
            <Options className="h-100" />
        </div>
      </div>
    </section>
  );
}

export default Container;
