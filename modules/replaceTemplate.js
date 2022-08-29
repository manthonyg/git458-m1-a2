const PV = require("../modules/PV");

/**
 * @description takes an html string and replaces variable names based on course object
 * @param {string} htmlStr
 * @param {object} loan
 * @returns {string}
 */
const replaceTemplate = (htmlStr, loan) => {
  const {
    Id = null,
    customerName = "No customer name on file",
    phoneNumber = "No phone number on file",
    address = "No address on file",
    loanAmount = 0,
    interest = 0.03,
    loanTermYears = 0,
    loanType = "BOM",
    payment = 0,
    description = "No description available",
  } = loan;

  const computed = PV(interest, payment, loanTermYears, loanAmount, loanType);

  let output = htmlStr.replace(/{%CUSTOMER_NAME%}/g, customerName);
  output = output.replace(/{%PHONE_NUMBER%}/g, phoneNumber);
  output = output.replace(/{%ADDRESS%}/g, address);
  output = output.replace(/{%LOAN_AMOUNT%}/g, loanAmount);
  output = output.replace(/{%INTEREST%}/g, interest);
  output = output.replace(/{%TERM_YEARS%}/g, loanTermYears);
  output = output.replace(
    /{%LOAN_TYPE%}/g,
    loanType === "BOM" ? "Beginning of Month" : "End of Month"
  );
  output = output.replace(/{%DESCRIPTION%/g, description);
  output = output.replace(/{%ID%}/g, Id);
  output = output.replace(/{%COMPUTED%}/g, computed);
  return output;
};

module.exports = replaceTemplate;
