import { createSlice } from "@reduxjs/toolkit";
import { getCompanyDetailFormInitailState } from "../forms/company-detail-form";

const CompanyFormSlice = createSlice({
  name: "COMPANY_FORM",
  initialState: {
    details_form: JSON.parse(JSON.stringify({ ...getCompanyDetailFormInitailState() })),
  },
  reducers: {
    updateCompanyForm: (state, action) => {
      const { pageName: formName, formData } = action.payload;
      console.log(`formName => `, formName, `\nformData => `, formData);
      state[formName] = JSON.parse(JSON.stringify(formData));
    },
    resetCompanyForm: (state, action) => {
      const { formName, initialData } = action.payload;
      const initialFormData = JSON.parse(JSON.stringify(initialData));
      state[formName] = initialFormData;
    }
  }
});

export const CompanyFormActions = CompanyFormSlice.actions;

export default CompanyFormSlice;
