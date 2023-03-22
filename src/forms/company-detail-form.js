import { useFormik } from "formik";

export const getCompanyDetailFormInitailState = () => {
  return {
    company_name: "",
    admin_name: "",
    admin_email: "",
    isBoD: "",
    im_name: "",
    other_im_name: "",
    sm_name: "",
    other_sm_name: "",
    info_types: ""
  };
}

const CompanyDetailsForm = (submitCallback) => {
  const initialValues = getCompanyDetailFormInitailState();

  const validate = (values) => {
    let errors = {};
    
    // Validating Company Name
    if (!values.company_name || !values.company_name.trim()) {
      errors.company_name = 'Please enter company name.';
    }

    // Validating Admin Name
    if (!values.admin_name || !values.admin_name.trim()) {
      errors.admin_name = 'Please enter administrator name';
    }

    // Validating Admin Email
    if (!values.admin_email || !values.admin_email.trim()) {
      errors.admin_email = 'Please enter a valid administrator email address.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.admin_email)) {
      errors.admin_email = 'Please enter a valid administrator email address.';
    }

    // Validation for is Board of Directors
    if (!values.isBoD) {
      errors.isBoD = 'Please select one of the above options';
    }

    // Validation for Instant Messaging Name
    if (!values.im_name) {
      errors.im_name = 'Please select one of the above options';
    }

    // Validation for other Instant Messaging Name
    if (values.im_name && values.im_name === 'other') {
      if (!values.other_im_name || !values.other_im_name.trim()) {
        errors.im_name = 'Please specify other';
      }
    }

    // Validation for Seniormost Committee Name
    if (!values.sm_name) {
      errors.sm_name = 'Please select one of the above options';
    }

    // Validation for other Seniormost Committee Name
    if (values.sm_name && values.sm_name === 'other') {
      if (!values.other_sm_name) {
        errors.sm_name = 'Please specify other';
      }
    }

    // Validation for Information Types
    if (!values.info_types) {
      errors.info_types = 'Please select one of the above options';
    }

    return errors;
  }

  const onSubmit = (values) => {
    console.log('Submitting Values ==> ', values);
    submitCallback(true);
  }

  return useFormik({
    initialValues,
    validate,
    onSubmit
  });
}

export default CompanyDetailsForm;