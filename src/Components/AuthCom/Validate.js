import * as Yup from 'yup';

export const validationSchema = Yup.object({  
    email: Yup.string().required('Please enter email address'),
    password: Yup.string().required('Please enter password'),
  });