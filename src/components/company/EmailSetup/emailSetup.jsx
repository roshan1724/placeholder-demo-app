import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../utilities/constants";
import "./emailSetup.scss";
import FeedbackButton from "../../common/Buttons/FeedbackButton";
import { useRef, useState } from "react";

function CompanyEmailSetup() {
  const navigate = useNavigate();
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [enableFeedback, setEnableFeedback] = useState(false);

  const handleSetupDoneClick = () => {
    navigate(ROUTE_PATHS.GAME_ROOT);
  };

  const handleCopyClick = () => {
    const listener = function (ev) {
      ev.preventDefault();
      const text = document.getElementById("email-instructions").innerHTML;
      ev.clipboardData.setData("text/plain", text);
      ev.clipboardData.setData("text/html", text);
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    // Update Button text
    setCopyButtonText("Copied");
    setEnableFeedback(true);

    // Reset button text after 2s
    setTimeout(() => {
      setCopyButtonText("Copy");
      setEnableFeedback(false);
    }, 2000);
  };

  return (
    <section className="company-email-setup">
      <h1 className="title c-font-20">Email Setup Instructions</h1>
      <p className="subtitle c-font-14">
        Please copy and forward these instructions to your I.T. administrator so
        that the emails don't get caught in the Spam filters.
      </p>
      <div className="setup-container">
        <div className="setup-wrapper">
          <div className="row setup-content">
            <div className="col-12 col-sm-10">
              <div id="email-instructions" className="email-content c-font-15">
                <section className="mb-2">
                  <div className="title c-font-16">Lorem ipsum</div>
                  <p className="subtitle py-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    ut facilisis nulla, non aliquam libero. Nunc pretium massa
                    nec massa consectetur, vel ullamcorper nunc laoreet.
                    Pellentesque at turpis id velit vehicula imperdiet eget sit
                    amet libero. Mauris sit amet dui a justo ultricies rhoncus.
                    Pellentesque tincidunt fermentum augue, sit amet laoreet
                    urna sagittis sed. Donec diam sapien, rutrum lobortis auctor
                    a, tincidunt cursus purus.
                  </p>
                </section>
                <section className="mb-2">
                  <div className="title c-font-16">Nulla rhoncus ultrices</div>
                  <p className="list-container mb-2">
                    <ol>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur{" "}
                        <strong>adipiscing elit.</strong>
                      </li>
                      <li>Sed ut facilisis nulla, non aliquam libero. </li>
                      <li>
                        Nunc pretium massa nec{" "}
                        <strong>massa consectetur</strong>, vel ullamcorper nunc{" "}
                        <strong>laoreet</strong>.{" "}
                      </li>
                      <li>
                        Pellentesque at turpis id velit vehicula imperdiet eget
                        sit amet libero. Mauris sit amet dui a justo ultricies
                        rhoncus.
                      </li>
                      <li>
                        Pellentesque tincidunt fermentum augue, sit amet laoreet
                        urna sagittis sed.{" "}
                      </li>
                      <li>
                        Nullam vestibulum lobortis erat. Vivamus eu{" "}
                        <strong>maximus lorem.</strong>
                      </li>
                      <li>
                        Cras sagittis massa nec{" "}
                        <strong>porta condimentum</strong>. Vivamus elementum
                        pretium velit, at <strong>porta odio euismod</strong>{" "}
                        et.{" "}
                      </li>
                    </ol>
                  </p>
                  <p className="mb-2">
                    Nulla rhoncus ultrices orci eget suscipit. Mauris eu dui sed
                    libero molestie luctus. Donec finibus velit in massa luctus,
                    id commodo arcu volutpat. Morbi tempor enim in nulla
                    sodales, sed iaculis risus pharetra. Nullam orci tortor,
                    auctor ac felis sit amet, luctus euismod elit. Quisque ac
                    volutpat orci, id mattis ipsum. Sed non dictum libero, eget
                    rutrum sem. Vestibulum semper ultricies nibh. Curabitur
                    felis sem, maximus vel magna non, ultricies consequat neque.
                  </p>
                  <p className="mb-2">
                    Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Curabitur ipsum metus, luctus facilisis nunc non,
                    dapibus volutpat odio. Fusce neque ante, cursus ac pretium
                    ut, semper ac mauris. Suspendisse potenti. Vestibulum mattis
                    augue id feugiat volutpat. Nam ultrices interdum est id
                    fermentum. Fusce vulputate dolor vitae metus facilisis, ut
                    mattis erat condimentum. Maecenas porttitor non nisl sit
                    amet consectetur.
                  </p>
                </section>
              </div>
            </div>
            <div className="col-12 col-sm-2">
              <div className="action-wrapper">
                {/* <button className="btn btn-primary" onClick={handleCopyClick}>
                  <span className="icon-wrapper me-2">
                    <i className="fa-regular fa-clone"></i>
                  </span>
                  Copy
                </button> */}
                <span className="d-inline-block">
                  <FeedbackButton
                    className={
                      enableFeedback
                        ? ["btn", "btn-primary", "btn-copy-feedback"]
                        : ["btn", "btn-primary"]
                    }
                    tooltipText={
                      enableFeedback
                        ? "Email Content Copied"
                        : "Copy Email Content"
                    }
                    feedbackTooltipClass={`copy-email-tooltip${
                      enableFeedback ? "__feedback" : ""
                    }`}
                    clickHandler={handleCopyClick}
                  >
                    <span className="icon-wrapper me-2">
                      <i
                        className={`${
                          enableFeedback
                            ? "fa-solid fa-check"
                            : "fa-regular fa-clone"
                        }`}
                      ></i>
                    </span>
                    {copyButtonText}
                  </FeedbackButton>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="page-action-wrapper flex-center mt-3">
          <span>&nbsp;</span>
          <button
            className="btn btn-primary btn-filled"
            onClick={handleSetupDoneClick}
          >
            Done
          </button>
        </div>
      </div>
    </section>
  );
}

export default CompanyEmailSetup;
