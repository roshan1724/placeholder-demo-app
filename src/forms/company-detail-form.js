import { useFormik } from "formik";


const CompanyDetailsForm = (submitCallback) => {
  const initialValues = {
    company_name: "",
    admin_name: "",
    admin_email: "",
    isBoD: "",
    im_name: "",
    other_im_name: "",
    sm_name: "",
    other_sm_name: "",
    info_types: ""
  }

  const validate = (values) => {
    let errors = {};
    
    // Validating Company Name
    if (!values.company_name) {
      errors.company_name = 'Required';
    } else if (values.company_name.length < 4) {
      errors.company_name = 'Company name should be of atleast of 4 characters';
    }

    // Validating Admin Name
    if (!values.admin_name) {
      errors.admin_name = 'Required';
    } else if (values.admin_name.length < 4) {
      errors.admin_name = 'Admin name should be of atleast of 4 characters';
    }

    // Validating Admin Email
    if (!values.admin_email) {
      errors.admin_email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.admin_email)) {
      errors.admin_email = 'Please enter a valid email address';
    }

    // Validation for is Board of Directors
    if (!values.isBoD) {
      errors.isBoD = 'Required';
    }

    // Validation for Instant Messaging Name
    if (!values.im_name) {
      errors.im_name = 'Required';
    }

    // Validation for other Instant Messaging Name
    if (values.im_name && values.im_name === 'other') {
      if (!values.other_im_name) {
        errors.im_name = 'Required'
      } else if (values.other_im_name.length < 2) {
        errors.im_name = 'Instant Messaging name should be of atleast of 2 characters';
      }
    }

    // Validation for Seniormost Committee Name
    if (!values.sm_name) {
      errors.sm_name = 'Required';
    }

    // Validation for other Seniormost Committee Name
    if (values.sm_name && values.sm_name === 'other') {
      if (!values.other_sm_name) {
        errors.sm_name = 'Required'
      } else if (values.other_sm_name.length < 2) {
        errors.sm_name = 'Seniormost Committee name should be of atleast of 2 characters';
      }
    }

    // Validation for Information Types
    if (!values.info_types) {
      errors.info_types = 'Required';
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
  })
}

export default CompanyDetailsForm;