
import { useFormik } from 'formik';

const LoginForm = (submitCallback) => {
  const initialValues = {
    email: '',
    password: ''
  };

  const onSubmit = (values) => {
    console.log("Submitted Values => ", values);
    if (values.email === 'graham@test.com' && values.password === 'password') {
      submitCallback(true);
    } else {
      submitCallback(false);
    }
  }

  const validate = (values) => {
    let errors = {};

    // Validating Email field
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validating Password field
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be of at least 8 characters';
    }

    return errors;
  }

  return useFormik({
    initialValues,
    onSubmit,
    validate
  })
} 

export default LoginForm;