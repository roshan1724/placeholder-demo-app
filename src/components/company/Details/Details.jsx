import "./Details.scss";
import CompanyDetailsForm from "../../../forms/company-detail-form";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../utilities/constants";

function CompanyDetails() {
  const navigate = useNavigate();

  const bodOptionList = [
    { optionValue: "yes", displayText: "Yes" },
    { optionValue: "no", displayText: "No" },
  ];
  const imOptionList = [
    { optionValue: "slack", displayText: "Slack" },
    { optionValue: "ms teams", displayText: "MS Teams" },
    { optionValue: "google chat", displayText: "Google Chat" },
    { optionValue: "other", displayText: "Other" },
  ];
  const smOptionList = [
    { optionValue: "executive committee", displayText: "Executive Committee" },
    { optionValue: "executives", displayText: "Executives" },
    { optionValue: "leadership", displayText: "Leadership" },
    { optionValue: "partners", displayText: "Partners" },
    { optionValue: "other", displayText: "Other" },
  ];
  const infoOptionList = [
    { optionValue: "credit card numbers", displayText: "Credit card numbers" },
    {
      optionValue: "social security numbers",
      displayText: "Social security numbers",
    },
    {
      optionValue: "driver license number",
      displayText: "Driver's license number",
    },
    {
      optionValue: "healcare information",
      displayText: "Healthcare information",
    },
    {
      optionValue: "bank account numbers",
      displayText: "Bank account numbers",
    },
    { optionValue: "other", displayText: "Other" },
  ];

  const submitCallback = (submitState) => {
    if (submitState) {
      navigate(ROUTE_PATHS.COMPANY_EMAIL_SETUP);
    }
  };

  const companyForm = CompanyDetailsForm(submitCallback);

  return (
    <div className="section-company-details">
      <h1 className="title">Company Details</h1>
      <p className="subtitle c-font-15">
        You need to configure your Company Details before you can launch a game.
      </p>
      <form className="company-detail-form">
        <div className="company-form-container c-font-14">
          <section className="left-container">
            <div className="custom-form-block">
              <label htmlFor="company-name" className="form-label">
                Company Name *
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  name="company_name"
                  id="company-name"
                  className={
                    companyForm.touched.company_name &&
                    companyForm.errors.company_name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Company Name"
                  onChange={companyForm.handleChange}
                  onBlur={companyForm.handleBlur}
                  value={companyForm.values.company_name}
                />
                <div className="invalid-feedback">
                  {companyForm.touched.company_name &&
                  companyForm.errors.company_name
                    ? companyForm.errors.company_name
                    : ""}
                </div>
              </div>
            </div>

            <div className="custom-form-block">
              <label htmlFor="company-admin_name" className="form-label">
                Administrator Name *
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  name="admin_name"
                  id="company-admin_name"
                  className={
                    companyForm.touched.admin_name &&
                    companyForm.errors.admin_name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Administrator Name"
                  onChange={companyForm.handleChange}
                  onBlur={companyForm.handleBlur}
                  value={companyForm.values.admin_name}
                />
                <div className="invalid-feedback">
                  {companyForm.touched.admin_name &&
                  companyForm.errors.admin_name
                    ? companyForm.errors.admin_name
                    : ""}
                </div>
              </div>
            </div>

            <div className="custom-form-block">
              <label htmlFor="company-admin_email" className="form-label">
                Administrator Email *
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  name="admin_email"
                  id="company-admin_email"
                  className={
                    companyForm.touched.admin_email &&
                    companyForm.errors.admin_email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Administrator Email"
                  onChange={companyForm.handleChange}
                  onBlur={companyForm.handleBlur}
                  value={companyForm.values.admin_email}
                />
                <div className="invalid-feedback">
                  {companyForm.touched.admin_email &&
                  companyForm.errors.admin_email
                    ? companyForm.errors.admin_email
                    : ""}
                </div>
              </div>
            </div>

            <div className="custom-form-block">
              <div id="company-BoD_group" className="option-group-label">
                Does your company have a Board of Directors? *
              </div>
              <div
                className="c-radio-groups"
                role="group"
                aria-labelledby="company-BoD_group"
              >
                {bodOptionList.length > 0 &&
                  bodOptionList.map((optionData, index) => (
                    <div
                      className="form-check form-check-inline"
                      key={"bod_option_key_" + index}
                    >
                      <input
                        type="radio"
                        name="isBoD"
                        id={"company-BoD_option" + index}
                        className="form-check-input"
                        onChange={companyForm.handleChange}
                        onBlur={companyForm.handleBlur}
                        value={optionData.optionValue}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={"company-BoD_option" + index}
                      >
                        {optionData.displayText}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="invalid-feedback">
                {companyForm.touched.isBoD && companyForm.errors.isBoD
                  ? companyForm.errors.isBoD
                  : ""}
              </div>
            </div>
          </section>

          <section className="right-container">
            <div className="custom-form-block">
              <div id="company-IM_group" className="option-group-label">
                What do you use for instant messaging? *
              </div>
              <div
                className="c-radio-groups"
                role="group"
                aria-labelledby="company-IM_group"
              >
                {imOptionList.length > 0 &&
                  imOptionList.map((optionData, index) => (
                    <div
                      className="form-check form-check-inline"
                      key={"im_option_key_" + index}
                    >
                      <input
                        type="radio"
                        name="im_name"
                        id={"company-IM_option" + index}
                        className="form-check-input"
                        onChange={companyForm.handleChange}
                        onBlur={companyForm.handleBlur}
                        value={optionData.optionValue}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={"company-IM_option" + index}
                      >
                        {optionData.displayText}
                      </label>
                    </div>
                  ))}
              </div>
              {companyForm.values.im_name === "other" ? (
                <input
                  type="text"
                  name="other_im_name"
                  id="company-im_name"
                  className={
                    companyForm.touched.other_im_name &&
                    companyForm.errors.im_name
                      ? "form-control mt-3 is-invalid"
                      : "form-control mt-3"
                  }
                  placeholder="Please Specify"
                  onChange={companyForm.handleChange}
                  onBlur={companyForm.handleBlur}
                  value={companyForm.values.other_im_name}
                />
              ) : null}
              <div className="invalid-feedback">
                {companyForm.touched.im_name && companyForm.errors.im_name
                  ? companyForm.errors.im_name
                  : ""}
              </div>
            </div>

            <div className="custom-form-block">
              <div id="company-SM_group" className="option-group-label">
                What is the name of the senior-most committee that runs your
                business? *
              </div>
              <div
                className="c-radio-groups"
                role="group"
                aria-labelledby="company-SM_group"
              >
                {smOptionList.length > 0 &&
                  smOptionList.map((optionData, index) => (
                    <div
                      className="form-check form-check-inline"
                      key={"sm_option_key_" + index}
                    >
                      <input
                        type="radio"
                        name="sm_name"
                        id={"company-SM_option" + index}
                        className="form-check-input"
                        onChange={companyForm.handleChange}
                        onBlur={companyForm.handleBlur}
                        value={optionData.optionValue}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={"company-SM_option" + index}
                      >
                        {optionData.displayText}
                      </label>
                    </div>
                  ))}
              </div>
              {companyForm.values.sm_name === "other" ? (
                <input
                  type="text"
                  name="other_sm_name"
                  id="company-sm_name"
                  className={
                    companyForm.touched.other_sm_name &&
                    companyForm.errors.sm_name
                      ? "form-control mt-3 is-invalid"
                      : "form-control mt-3"
                  }
                  placeholder="Please Specify"
                  onChange={companyForm.handleChange}
                  onBlur={companyForm.handleBlur}
                  value={companyForm.values.other_sm_name}
                />
              ) : null}
              <div className="invalid-feedback">
                {companyForm.touched.sm_name && companyForm.errors.sm_name
                  ? companyForm.errors.sm_name
                  : ""}
              </div>
            </div>

            <div className="custom-form-block">
              <div id="company-Info_group" className="option-group-label">
                What kind of sensitive information does your company store? *
              </div>
              <div
                className="c-checkbox-groups"
                role="group"
                aria-labelledby="company-Info_group"
              >
                {infoOptionList.length > 0 &&
                  infoOptionList.map((optionData, index) => (
                    <div
                      className="form-check form-check-inline"
                      key={"info_option_key_" + index}
                    >
                      <input
                        type="checkbox"
                        name="info_types"
                        id={"company-Info_option" + index}
                        className="form-check-input"
                        onChange={companyForm.handleChange}
                        onBlur={companyForm.handleBlur}
                        value={optionData.optionValue}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={"company-Info_option" + index}
                      >
                        {optionData.displayText}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="invalid-feedback">
                {companyForm.touched.info_types && companyForm.errors.info_types
                  ? companyForm.errors.info_types
                  : ""}
              </div>
            </div>
          </section>
        </div>

        <div className="action-wrapper">
          <span>&nbsp;</span>
          <button
            type="submit"
            className="btn btn-primary btn-filled"
            onClick={companyForm.handleSubmit}
          >
            Save & Continue
            <span className="icon-wrapper ps-2">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyDetails;
