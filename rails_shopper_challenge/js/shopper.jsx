const React = require('react');
const ReactDOM = require('react-dom');
const ApplicantForm = require('./components/newApplicantForm.jsx');

const FormWrapper = React.createClass({
  render() {
    return(
      <div>
        "This is the form wrapper!"
        <ApplicantForm />
      </div>
    );
  }
});


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <FormWrapper />,
    document.getElementById('form-wrapper')
  );
});
