import "./Summary.scss";

function Summary({
    userData
}) {
  return <section className="section-summary">
    <div className="title-container">
        <h1 className="title">Incident Summary</h1>
        <p className="description">
            Graham Smith (User) hasn't received any emails from outside the company for at least 8 hours
        </p>
    </div>
    <div className="achievement-container">
        <h4 className="title">Accomplishments</h4>
        <div className="achievement-wrapper">
            <img src="/images/victory_cup.png" alt="victory cup" className="badge-icon" />
            <div className="achievement-user-wrapper active">
                <img src="/images/people-male.png" alt="victory cup" className="profile-icon" />
                <div className="user-details">
                    <p className="user-name">
                        Graham Smith
                        <span className="user-type"> (user) </span>
                    </p>
                    <p className="achievement-name">
                        Calls I.T. to report the issue
                    </p>
                </div>
            </div>
        </div>
        <div className="achievement-wrapper">
            <img src="/images/victory_cup.png" alt="victory cup" className="badge-icon" />
            <div className="achievement-user-wrapper">
                <img src="/images/people-female.png" alt="victory cup" className="rounded-circle profile-icon" />
                <div className="user-details">
                    <p className="user-name">
                        Angela Taylor
                        <span className="user-type"> (IT Dept.) </span>
                    </p>
                    <p className="achievement-name">
                        Another accomplishment
                    </p>
                </div>
            </div>
        </div>
    </div>
  </section>;
}

export default Summary;
