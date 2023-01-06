import "./Details.scss";

function Details() {
  return <section className="section-details">
    <div className="title-container">
        <h1 className="title">Incident Details</h1>
    </div>
    <div className="chatbox-container">
        <div className="msg-wrapper bot">
            <span className="icon-wrapper">
                <img src="/images/question_logo.png" alt="bot icon" className="bot-icon" />
            </span>
            <div className="msg-container">
                <p className="msg">
                    Angela Taylor (IT Dept.), you get the call or message from the employee and they've 
                    described the situation (scroll up to read). What do you do?
                </p>
            </div>
        </div>
        <div className="msg-wrapper user">
            <span className="icon-wrapper">
                <img src="/images/people-male.png" alt="user icon" className="user-icon" />
            </span>
            <div className="msg-container">
                <p className="user-name">
                    Graham Smith
                    <span className="user-type"> (user) </span>
                </p>
                <p className="msg">
                    I'll ask the user to log in to portal.office.com and check this.
                </p>
            </div>
            <span className="icon-wrapper achievement">
                <img src="/images/victory_cup.png" alt="victory cup" className="badge-icon" />
            </span>
        </div>
    </div>
  </section>;
}

export default Details;
