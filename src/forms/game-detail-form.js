import { useFormik } from "formik";
import * as Yup from "yup";

export const getSpectatorFields = () => {
  return {
    spectator_name: "",
    spectator_email: "",
  };
};

export const getGameDetailFormInitailState = () => {
  return {
    start_date: "",
    start_time: "",
    time_zone: "",

    user_name: "",
    user_email: "",

    ciso_name: "",
    ciso_email: "",
    ciso_title: "",

    it_admin_name: "",
    it_admin_email: "",
    it_admin_title: "",

    spectators: [getSpectatorFields()],

    hasPortal: "",
    portalValue: "",

    im_name: "",
    email_gateway: [],
    antivirus: "",
    edr: "",
  };
};

const GameDetailForm = (formOptionsData, formValues, submitCallback) => {
  const initialValues = {
    ...formValues,
    time_zone: formOptionsData.current_time_zone,
  };

  const validationSchema = Yup.object().shape({
    start_date: Yup.date().required("Select start date"),
    start_time: Yup.string().required("Select start time"),
    time_zone: Yup.string()
      .oneOf(formOptionsData.time_zome, "Select valid time zone")
      .required("Select valid time zone"),

    user_name: Yup.string()
      .trim("Please remove trailing spaces")
      .strict(true)
      .required("Enter valid name"),
    user_email: Yup.string()
      .email("Enter valid email")
      .test("GAME_DETAILS_USER_EMAIL_TEST", "Enter valid email", (value) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      )
      .required("Enter valid email"),

    ciso_name: Yup.string()
      .trim("Please remove trailing spaces")
      .strict(true)
      .required("Enter valid name"),
    ciso_email: Yup.string()
      .email("Enter valid email")
      .test("GAME_DETAILS_CISO_EMAIL_TEST", "Enter valid email", (value) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      )
      .required("Enter valid email"),
    ciso_title: Yup.string()
      .trim("Please remove trailing spaces")
      .strict(true)
      .required("Select valid title"),

    it_admin_name: Yup.string()
      .trim("Please remove trailing spaces")
      .strict(true)
      .required("Enter valid name"),
    it_admin_email: Yup.string()
      .email("Enter valid email")
      .test("GAME_DETAILS_IT_ADMIN_EMAIL_TEST", "Enter valid email", (value) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      )
      .required("Enter valid email"),
    it_admin_title: Yup.string()
      .trim("Please remove trailing spaces")
      .strict(true)
      .required("Select valid title"),

    spectators: Yup.array().of(
      Yup.object().shape({
        spectator_name: Yup.string()
          .trim("Please remove trailing spaces")
          .strict(true),
        spectator_email: Yup.string().email("Enter valid email"),
      })
    ),

    hasPortal: Yup.string()
      .oneOf(
        formOptionsData.hasPortalOptions.map(
          (optionData) => optionData.optionValue
        )
      )
      .required("Select one of the above options"),
    portalValue: Yup.string().when("hasPortal", {
      is: "true",
      then: Yup.string()
        .trim("Please remove trailing spaces")
        .strict(true)
        .required("Enter valid portal address"),
    }),

    im_name: Yup.string()
      .trim("Please remove trailing spaces")
      .strict(true)
      .required("Enter valid name"),
    email_gateway: Yup.array().test({
      name: "GAME_DETAILS_EMAIL_GATEWAY_TEST",
      exclusive: true,
      message: "Select atleast one of the above options",
      test: (value) => value.length > 0,
    }),
    antivirus: Yup.string()
      .oneOf(
        formOptionsData.antivirusOptions.map(
          (optionData) => optionData.optionValue
        ),
        "Select atleast one of the above options"
      )
      .required("Select atleast one of the above options"),
    edr: Yup.string()
      .oneOf(
        formOptionsData.edrOptions.map((optionData) => optionData.optionValue),
        "Select atleast one of the above options"
      )
      .required("Select atleast one of the above options"),
  });

  const onSubmit = (values) => {
    console.log(`Submitting Vlaues ==> `, values);
    submitCallback(true);
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};

export default GameDetailForm;
