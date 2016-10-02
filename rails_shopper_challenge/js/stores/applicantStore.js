const ApplicantConstants = {

};

// const ApplicantStore = new Store(Dispatcher);

let _errors = [], _handlers = [];
const ApplicantStore = {

  addListener(callback) {
    _handlers.push(callback);
    console.log("added callback!");
    console.log(_handlers);
  },

  removeListener(callback) {
    let idx = _handlers.indexOf(callback);
    _handlers.splice(idx, 1);
    console.log("removed callback!");
    console.log(_handlers);
  },

  registerError(response) {
    _errors.push(response);
    _handlers.forEach((callback) => {
      callback();
    });
  },

  errors() {
    return _errors;
  }
};
module.exports = ApplicantStore;
