const ApplicantStore = require('../stores/applicantStore');

module.exports = {
  submitApplication: (applicantInfo) => {
    $.ajax({
      url: "applicant",
      type: "POST",
      data: { applicant: applicantInfo },
      success: (response) => {

        console.log(response);
      },
      error: (response) => {
        ApplicantStore.registerError(response);
        console.log(response);
      }
    });
  }
};
