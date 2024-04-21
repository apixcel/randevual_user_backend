"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = (error:any, req?:any) => {
  let output;
  let field:any
  try {
    let fieldName = error.message.split(".$")[1];
    field = field.split(" dup key")[0];
    field = field.substring(0, field.lastIndexOf("_"));
    req.flash("errors", [
      {
        msg: "An account with this " + field + " already exists.",
      },
    ]);
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "already exists";
  }

  return output;
};

/**
 * Get the erroror message from error object
 */
export const errorHandler = (error:any) => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};
