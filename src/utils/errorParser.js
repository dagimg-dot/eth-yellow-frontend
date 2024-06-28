const COMMON_ERRORS = ["Uniqueness violation"];

const parseErrorMessage = (errorMessage) => {
  let errorType = -1;
  let i;
  for (i = 0; i < COMMON_ERRORS.length; i++) {
    if (errorMessage.includes(COMMON_ERRORS[i])) {
      errorType = i;
      break;
    }
  }

  switch (errorType) {
    case 0:
      const duplicateKey = errorMessage.match(/_(.*?)_/)[1];
      if (["latitude", "longitude"].includes(duplicateKey.trim())) {
        return "Business with the same location already exists";
      }
      return `Business with the same ${duplicateKey} already exists`;
    default:
      return "An error occurred, please try again";
  }
};

const mergeErrorsMessage = (errors) => {
  let errMessage = "";

  if (errors.length === 1) {
    return errors[0].message;
  }

  errors.forEach((err) => {
    errMessage += err.message + ", ";
  });

  return errMessage;
};

export { parseErrorMessage, mergeErrorsMessage };
