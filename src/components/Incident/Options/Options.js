import "./Options.scss";

function Options() {
  return <section className="section-options">
    <div className="title-container">
        <h1 className="title">Incident Summary</h1>
        <p className="description">
            Graham Smith (User) hasn't received any emails from outside the company for at least 8 hours
        </p>
        <img src="/images/people-male.png" alt="profile-icon" className="profile-icon" />
    </div>

    <div className="option-container">
        <div className="option-content">
            <input type="checkbox" name="incident_option" className="option-input" id="type1"/>
            <label htmlFor="type1" className="option-text">
                Nunc pretium massa nec massa consectetur, vel ullamcorper nunc laoreet.
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
            <input type="checkbox" name="incident_option" className="option-input" id="type3" disabled="disabled"/>
            <label htmlFor="type3" className="option-text">
                Nunc pretium massa nec massa consectetur, vel ullamcorper nunc laoreet.
            </label>
        </div>
        
        <button className="btn submit-btn mx-auto"> Submit </button>
    </div>


  </section>;
}

export default Options;
