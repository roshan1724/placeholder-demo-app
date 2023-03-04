
import { useFormik } from "formik";
// import * as Yup from "yup";

const GameDetailForm = (formOptionsData) => {
  console.log('Received formOptionsData ==> ', formOptionsData);

  const initialValues = {
    start_date: '',
    start_time: {
      hours: '',
      minutes: '',
      meredian: 'AM',
    },
    time_zone: 'UTC',
    
    user_name: '',
    user_email: '',

    cisco_name: '',
    cisco_email: '',
    cisco_title: '',


  }

  const validateDate = (given_date) => {
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i.test(given_date);
  }

  const validate = (values) => {
    let errors = {};

    // Validating start_date
    if (!values.start_date || !(validateDate(values.start_date.trim()))) {
      errors.start_date = 'Select start date';
    }

    // Validating start_time
    if (!(values.start_time.hours && values.start_time.minutes && values.start_time.meredian)) {
      errors.start_time = 'Select valid start time';
    }

    // Validating time_zone
    if (!values.time_zone || !formOptionsData.time_zome.includes(values.time_zome)) {
      errors.time_zome = 'Select valid time zone';
    }

    // Validating user_name
    if (!values.user_name || !values.user_name.trim()) {
      errors.user_name = 'Enter valid name';
    }

    // Validating user_email
    if (!values.user_email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.user_email.trim())) {
      errors.user_email = 'Enter valid email';
    }

    // Validating cisco_name
    if (!values.cisco_name || !values.cisco_name.trim()) {
      errors.cisco_name = 'Enter valid name';
    }

     // Validating cisco_email
     if (!values.cisco_email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cisco_email.trim())) {
      errors.cisco_email = 'Enter valid email';
    }

    // Validating cisco_title
    if (!values.cisco_title || !values.cisco_title.trim()) {
      errors.cisco_title = 'Enter valid title';
    }

    return errors;
  }

  // const validationSchema = Yup.object().shape({
  //   start_date: Yup.date().required('Required'),
  //   hours: Yup.number().oneOf(formOptionsData.start_time.hours).required('Required'),
  //   minutes: Yup.number().oneOf(formOptionsData.start_time.minutes).required('Required'),
  //   meredian: Yup.string().oneOf(formOptionsData.start_time.meredian).required('Required'),
  //   time_zone: Yup.string().oneOf(formOptionsData.time_zome).required('Required'),
  // });

  return useFormik({
    initialValues,
    validate,
  });
}

export default GameDetailForm;