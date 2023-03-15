
import { useFormik } from "formik";
import * as Yup from "yup";

export const getSpectatorFields = () => {
  return {
    spectator_name: '',
    spectator_email: ''
  }
}

const GameDetailForm = (formOptionsData, submitCallback) => {
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

    it_admin_name: '',
    it_admin_email: '',
    it_admin_title: '',

    spectators: [getSpectatorFields(), getSpectatorFields()],

    hasPortal: '',
    portalValue: '',

    im_name: '',
    email_gateway: [],
    antivirus: '',
    edr: ''
  }

  // const validateDate = (given_date) => {
  //   return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i.test(given_date);
  // }

  // const validate = (values) => {
  //   let errors = {};

  //   // Validating start_date
  //   if (!values.start_date || !(validateDate(values.start_date.trim()))) {
  //     errors.start_date = 'Select start date';
  //   }

  //   // Validating start_time
  //   if (!(values.start_time.hours && values.start_time.minutes && values.start_time.meredian)) {
  //     errors.start_time = 'Select valid start time';
  //   }

  //   // Validating time_zone
  //   if (!values.time_zone || !formOptionsData.time_zome.includes(values.time_zome)) {
  //     errors.time_zome = 'Select valid time zone';
  //   }

  //   // Validating user_name
  //   if (!values.user_name || !values.user_name.trim()) {
  //     errors.user_name = 'Enter valid name';
  //   }

  //   // Validating user_email
  //   if (!values.user_email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.user_email.trim())) {
  //     errors.user_email = 'Enter valid email';
  //   }

  //   // Validating cisco_name
  //   if (!values.cisco_name || !values.cisco_name.trim()) {
  //     errors.cisco_name = 'Enter valid name';
  //   }

  //    // Validating cisco_email
  //    if (!values.cisco_email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cisco_email.trim())) {
  //     errors.cisco_email = 'Enter valid email';
  //   }

  //   // Validating cisco_title
  //   if (!values.cisco_title || !formOptionsData.cisco_jobTitle.includes(values.cisco_title)) {
  //     errors.cisco_title = 'Select valid title';
  //   }

  //   // Validating it_admin_name
  //   if (!values.it_admin_name || !values.it_admin_name.trim()) {
  //     errors.it_admin_name = 'Enter valid name';
  //   }

  //    // Validating it_admin_email
  //    if (!values.it_admin_email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.it_admin_email.trim())) {
  //     errors.it_admin_email = 'Enter valid email';
  //   }

  //   // Validating it_admin_title
  //   if (!values.it_admin_title || !formOptionsData.it_admin_jobTitle.includes(values.it_admin_title)) {
  //     errors.it_admin_title = 'Select valid title';
  //   }

  //   // Validating spectators details
  //   if (values.spectators.length === 0) {
  //     errors.spectators = 'Add atleast 1 spectator';
  //   } else if (values.spectators.length > 0) {
  //     errors.spectators = [];
  //     values.spectators.forEach((spectator, index) => {
  //       const spectator_fields = getSpectatorFields();
  //       if (!spectator.spectator_name || !spectator.spectator_name.trim()) {
  //         spectator_fields.spectator_name = 'Enter valid name';
  //       }

  //       if (!spectator.spectator_email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(spectator.spectator_email.trim())) {
  //         spectator_fields.spectator_email = 'Enter valid email';
  //       }

  //       errors.spectators.push(spectator_fields);
  //     });
  //   }

  //   return errors;
  // }

  const validationSchema = Yup.object().shape({
    start_date: Yup.date().required('Select start date'),
    start_time: Yup.object().shape({
      hours: Yup.number().oneOf(formOptionsData.start_time.hours).required('Select valid start time'),
      minutes: Yup.number().oneOf(formOptionsData.start_time.minutes).required('Select valid start time'),
      meredian: Yup.string().oneOf(formOptionsData.start_time.meredian).required('Select valid start time'),
    }),
    time_zone: Yup.string().oneOf(formOptionsData.time_zome, 'Select valid time zone').required('Select valid time zone'),
    
    user_name: Yup.string().required('Enter valid name'),
    user_email: Yup.string().email('Enter valid email').required('Enter valid email'),
    
    cisco_name: Yup.string().required('Enter valid name'),
    cisco_email: Yup.string().email('Enter valid email').required('Enter valid email'),
    cisco_title: Yup.string().oneOf(formOptionsData.cisco_jobTitle, 'Select valid title').required('Select valid title'),
    
    it_admin_name: Yup.string().required('Enter valid name'),
    it_admin_email: Yup.string().email('Enter valid email').required('Enter valid email'),
    it_admin_title: Yup.string().oneOf(formOptionsData.it_admin_jobTitle, 'Select valid title').required('Select valid title'),
    
    spectators: Yup.array().of(
      Yup.object().shape({
        spectator_name: Yup.string().required('Enter valid name'),
        spectator_email: Yup.string().email('Enter valid email').required('Enter valid email')
      })
    ),

    hasPortal: Yup.string().oneOf(formOptionsData.hasPortalOptions.map(optionData => optionData.optionValue)).required('Select one of the above options'),
    portalValue: Yup.string().when("hasPortal", {
      is: "true",
      then: Yup.string().required('Enter valid portal address'),
    }),

    im_name: Yup.string().required('Enter valid name'),
    email_gateway: Yup.array().test({
      name: 'GAME_DETAILS_EMAIL_GATEWAY_TEST',
      exclusive: true,
      message: 'Select atleast one of the above options',
      test: (value) => value.length > 0
    }),
    antivirus: Yup.string().oneOf(formOptionsData.antivirusOptions.map(optionData => optionData.optionValue),
      'Select atleast one of the above options').required('Select atleast one of the above options'),
    edr: Yup.string().oneOf(formOptionsData.edrOptions.map(optionData => optionData.optionValue),
    'Select atleast one of the above options').required('Select atleast one of the above options'),

  });

  const onSubmit = (values) => {
    console.log(`Submitting Vlaues ==> `, values);
    submitCallback(true);
  }

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });
}

export default GameDetailForm;