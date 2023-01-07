import "./Options.scss";

function Options() {
  return <section className="section-options">
    <div className="title-container">
        <h1 className="title">What would you do ?</h1>
        <p className="description">
            Lorem ipsum dolor sit amet, consectetur ut facilisis nulla, non aliquam libero. Turpis id velit vehicula imperdiet eget ?
        </p>
        <img src="/images/people-male.png" alt="profile-icon" className="profile-icon" />
    </div>

    <div className="d-flex flex-column option-container">
        <div className="flex-shrink-0 option-wrapper overflow-scrollbar">
            <div className="option-content">
                <input type="checkbox" name="incident_option" className="option-input" id="type1"/>
                <label htmlFor="type1" className="option-text">
                    <span className="checkmark-holder"></span>
                    <img src="/images/checkmark.png" alt="checkmark" className="option-checked" />
                    <span>
                        Nunc pretium massa nec massa consectetur, vel ullamcorper nunc laoreet.
                    </span>
                </label>
            </div>
            <div className="option-content">
                <input type="checkbox" name="incident_option" className="option-input" id="type2"/>
                <label htmlFor="type2" className="option-text">
                    <span className="checkmark-holder"></span>
                    <img src="/images/checkmark.png" alt="checkmark" className="option-checked" />
                    <span>
                        Nunc pretium massa nec massa consectetur, vel ullamcorper nunc laoreet.
                    </span>
                </label>
            </div>
            <div className="option-content">
                <input type="checkbox" name="incident_option" className="option-input" id="type3" disabled="disabled" checked />
                <label htmlFor="type3" className="option-text">
                    <span className="checkmark-holder"></span>
                    <img src="/images/checkmark.png" alt="checkmark" className="option-checked" />
                    <span>
                        Nunc pretium massa nec massa consectetur, vel ullamcorper nunc laoreet.
                    </span>
                </label>
            </div>
        </div>
        <div className="action-wrapper d-flex justify-content-center mt-auto mb-2">
            <button className="btn submit-btn"> Submit </button>  
        </div>   
    </div>


  </section>;
}

export default Options;
