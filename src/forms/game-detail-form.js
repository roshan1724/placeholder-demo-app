
import { useFormik } from "formik";
import * as Yup from "yup";

const GameDetailForm = (formOptionsData) => {
  const initialValues = {
    start_date: ''
  }

  const validationSchema = Yup.object().shape({
    start_date: Yup.date().required('Required')
  });

  return useFormik({
    initialValues,
    validationSchema
  });
}

export default GameDetailForm;