
import { useFormik } from 'formik';
import * as Yup from "yup";

const LoginForm = (submitCallback) => {
  const initialValues = {
    email: '',
    password: ''
  };

  const onSubmit = (values) => {
    console.log("Submitted Values => ", values);
    if (values.email === 'graham@test.com' && values.password === 'test@123') {
      submitCallback(true);
    } else {
      submitCallback(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string().required("Please enter a password"),
  });

  // const validate = (values) => {
  //   let errors = {};

  //   // Validating Email field
  //   if (!values.email) {
  //     errors.email = 'Please enter a valid email address';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Please enter a valid email address';
  //   }

  //   // Validating Password field
  //   if (!values.password) {
  //     errors.password = 'Please enter a password';
  //   }

  //   return errors;
  // }

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
} 

export default LoginForm;