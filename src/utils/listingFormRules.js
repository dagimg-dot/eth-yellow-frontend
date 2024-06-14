export class ListingFormRules {
  nameRules = [
    (v) => !!v || "Name is required",
    (v) =>
      (v && v.length >= 5 && v.length <= 25) ||
      "Name must be between 5 and 25 characters",
  ];

  descriptionRules = [
    (v) => !!v || "Description is required",
    (v) =>
      (v && v.length >= 10 && v.length <= 100) ||
      "Description must be between 10 and 100 characters",
  ];

  emailRules = [
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];

  phoneRules = [
    (v) => !!v || "Phone is required",
    (v) => /^\d+$/.test(v) || "Phone number must be a number",
    (v) => v.length === 10 || "Phone must be 10 characters",
  ];

  websiteRules = [
    (v) => !!v || "Website is required",
    (v) => /.+\..+/.test(v) || "Website must be valid",
    (v) => v.length >= 10 || "Website must be at least 10 characters",
  ];

  addressRules = [
    (v) => !!v || "Address is required",
    (v) => v.length >= 5 || "Address must be at least 5 characters",
  ];

  cityRules = [
    (v) => !!v || "City is required",
    (v) => v.length >= 3 || "City must be at least 3 characters",
  ];

  stateRules = [
    (v) => !!v || "State is required",
    (v) => v.length >= 3 || "State must be 2 characters",
  ];

  countryRules = [
    (v) => !!v || "Country is required",
    (v) => v.length >= 3 || "Country must be at least 3 characters",
  ];

  postalCodeRules = [
    (v) => !!v || "Postal Code is required",
    (v) => /^\d+$/.test(v) || "Postal Code must be a number",
  ];
}

export default new ListingFormRules();
