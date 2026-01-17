import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export const phoneWithPassSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

export const editProfileSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  alt_phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .nullable(),
  alt_email: Yup.string().email("Invalid email address").nullable(),
  companyName: Yup.string().nullable(),
});

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Old password is required"),
  new_password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("New password is required")
    .notOneOf(
      [Yup.ref("old_password")],
      "New password must be different from old password"
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password"),
});
