import i18n from "@/plugins/i18n";
export default function () {
  const t = i18n.global.t;
  const response = {
    invalid_username_or_password: {
      title: t("invalid_username_or_password"),
      description: t("please_try_again_with_correct_credentials"),
    },
    email_not_confirmed: {
      title: t("email_not_confirmed"),
      description: t("please_confirm_your_email_address_before_login"),
    },
    successful_registration: {
      title: t("successful_registration"),
      description: "",
    },
    companies_name_key: {
      title: t("compay_has_already_been_registred"),
      description: t("please_confirm_your_invitation_and_login"),
    },
    user_not_found: {
      title: t("user_not_found"),
      description: t("user_not_found_description"),
    },
  };

  const extract = (err) => {
    let msg_compilation = "";
    if (err && err.graphQLErrors) {
      if (err.graphQLErrors.length > 0) {
        const errObject = err.graphQLErrors[0];

        if (
          errObject.extensions &&
          errObject.extensions.internal &&
          errObject.extensions.internal.error
        ) {
          msg_compilation += errObject.extensions.internal.error.message;
          // return errObject.extensions.internal.error.message;
        } else {
          msg_compilation += err.graphQLErrors[0].message;
          if (
            err.graphQLErrors[0].extensions &&
            err.graphQLErrors[0].extensions.code
          ) {
            msg_compilation += ` ${
              err.graphQLErrors[0].extensions &&
              err.graphQLErrors[0].extensions.code
            }`;
          }
          // return `${err.graphQLErrors[0].message}`;
        }
      } else {
        msg_compilation += err.message || " extraction_error";
        // return "extraction_error";
      }
    }
    if (err && err.errors && err.errors.length > 0) {
      msg_compilation += err.errors[0].message;
      // return err.errors[0].message;
    }

    if (typeof err === "string") {
      msg_compilation += err;
      return err;
    }

    return msg_compilation;
  };

  const parse = (err) => {
    let item = {};

    const msg = extract(err);

    Object.keys(response).forEach((key) => {
      if (msg.includes(key)) {
        item = {
          ...response[key],
          key,
        };
      }
    });

    if (Object.keys(item).length === 0 && msg) {
      item = {
        title: msg,
        key: null,
      };
    }
    return item;
  };

  return {
    parse,
    extract,
  };
}
