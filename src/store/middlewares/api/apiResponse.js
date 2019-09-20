export default class ApiResponse {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  failure = (error, action, delay) => {
    if (!error.response) return console.error(`ApiResponse: ${error.message}`);
    setTimeout(() => {
      this.dispatch(action({ ...error.response.data }));
    }, delay);
  };

  success = (data, action, delay) => {
    setTimeout(() => {
      this.dispatch(action({ ...data }));
    }, delay);
  };
}
