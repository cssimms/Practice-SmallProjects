const React = require('react'),
ApplicantStore = require('../stores/applicantStore'),
ApplicantActions = require('../actions/applicantActions');

const ApplicantForm = React.createClass({

  getInitialState: function() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      errors: ""
    };
  },

  componentDidMount() {
    ApplicantStore.addListener(this._onChange);
    this._onChange();
  },

  componentWillUnmount() {
    ApplicantStore.removeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      errors: ApplicantStore.errors()
    });
  },

  firstNameChange(event) {
    this.setState({
      firstname: event.target.value
    });
  },

  lastNameChange(event) {
    this.setState({
      lastname: event.target.value
    });
  },

  emailChange(event) {
    this.setState({
      email: event.target.value
    });
  },

  phoneChange(event) {
    this.setState({
      phone: event.target.value
    });
  },

  validateInfo() {

    return true;
  },

  errors() {
    if (this.state.errors){
      return (
        this.state.errors.map(function (err, i) {
          return <li key={i}>{err}</li>;
        })
      );
    } else {
      return;
    }
  },

  handleSubmit(event) {
    var applicantInfo = {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      phone: this.props.phone,
      errors: this.props.errors
    };
    console.log(this.props);
    if (this.validateInfo(applicantInfo)){
      ApplicantActions.submitApplication(applicantInfo);
    }
  },

  render() {
    return(
        <div className='applicant-form-container'>
          <h3>Apply to be a Shopper!</h3>
          <h4>{this.errors()}</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='firstname' className='invis'>First Name</label>
              <input className='user-form-input' id='firstname' type='text'
                onChange={this.firstNameChange}
                placeholder='First Name'/>
              <br/><br/>
            <label htmlFor='lastname' className='invis'>Last Name</label>
              <input className='user-form-input' id='lastname' type='text'
                onChange={this.lastNameChange}
                placeholder='Password'/><br/><br/>
            <label htmlFor='email' className='invis'>Email</label>
              <input className='user-form-input' id='email' type='text'
                onChange={this.emailChange}
                placeholder='Email Address'/><br/><br/>
              <label htmlFor='phone' className='invis'>Phone</label>
            <input className='user-form-input' id='phone' type='text'
              onChange={this.phoneChange}
              placeholder='Phone Number'/><br/><br/>
            <input className='submit-button' type='submit' />
          </form><br/>
      </div>
    );
  }

});

module.exports = ApplicantForm;
