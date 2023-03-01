("use strict");

const addressData = [
  {
    street: "123 sick street",
    state: "CA",
    zip: "9678",
  },
  {
    street: "woah",
    state: "CA",
    zip: "9678",
  },
  {
    street: "amazing",
    state: "CA",
    zip: "9678",
  },
  {
    street: "123 sick street",
    state: "CA",
    zip: "9678",
  },
  {
    street: "999999 sick street",
    state: "CA",
    zip: "9678",
  },
  {
    street: "123 dope street",
    state: "CA",
    zip: "9678",
  },
  {
    street: "123 sick street",
    state: "CA",
    zip: "9678",
  },
  {
    street: "123 sick street",
    state: "CA",
    zip: "9678",
  },
  {
    street: "123 awesome street",
    state: "CA",
    zip: "9678",
  },
];

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

class Address extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = props.data;
    // this.street = props.data.street;
  }

  render() {
    return e("p", { className: "address" }, this.state.street);
  }
}

class AddressPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 4,
      data: addressData,
      currentlyDisplayed: [],
    };
    this.handlePageBackward = this.handlePageBackward.bind(this);
    this.handlePageForward = this.handlePageForward.bind(this);
  }

  componentDidMount() {
    this.updateCurrentPage();
  }

  calculatePageContent(pageNumber) {
    const currentStartIndex = pageNumber * this.state.pageSize;
    const currentEndIndex = currentStartIndex + this.state.pageSize;
    console.log("page", pageNumber);
    console.log("size", this.state.pageSize);
    console.log("start indx", currentStartIndex);
    console.log("end indx", currentEndIndex);
    const currentPageContent = this.state.data.slice(
      currentStartIndex,
      currentEndIndex
    );
    console.log("calculated new page:", currentPageContent);
    return currentPageContent;
  }

  updateCurrentPage() {
    // here we would fetch for the data, or maybe on component load
    const currentPageContent = this.calculatePageContent(this.state.page);
    this.setState({ currentlyDisplayed: currentPageContent });
  }

  handlePageForward(e) {
    e.preventDefault();
    // check that the page doesn't go over max page
    if (this.state.page > this.state.data.length / this.state.pageSize) {
      return;
    } else {
      this.setState((previousState) => {
        const nextPage = previousState.page + 1;
        const currentPageContent = this.calculatePageContent(nextPage);
        return {
          page: nextPage,
          currentlyDisplayed: currentPageContent,
        };
      });
    }
  }

  handlePageBackward(e) {
    e.preventDefault();
    if (this.state.page === 0) {
      return;
    } else {
      const previousPage = this.state.page - 1;
      const currentPageContent = this.calculatePageContent(previousPage);
      this.setState((previousState) => {
        return {
          page: previousPage,
          currentlyDisplayed: currentPageContent,
        };
      });
    }
  }

  getPaginationButtons() {
    const buttonElements = [
      e(
        "button",
        {
          key: "pageForward",
          className: "page-backward",
          onClick: this.handlePageBackward,
        },
        "<-"
      ),
      e("p", { key: "pageNumber", className: "page-number" }, this.state.page),
      e(
        "button",
        {
          key: "pageBackward",
          className: "page-forward",
          onClick: this.handlePageForward,
        },
        "->"
      ),
    ];
    return e("div", { className: "button-container" }, buttonElements);
  }

  getAddresses() {
    return this.state.currentlyDisplayed.map((address, index) => {
      return e(Address, { key: index, data: address }, null);
    });
  }

  getContent() {
    const addressData = this.getAddresses();
    const buttons = this.getPaginationButtons();
    const content = addressData.concat(buttons);

    return e("div", { className: "address-container" }, content);
  }

  render() {
    const addys = this.getContent();
    console.log("rendering address page, addys:", addys);
    return e("div", { className: "address-page" }, addys);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e("div", {}, e(AddressPage));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const domContainer = document.querySelector("#like_button_container");
  const root = ReactDOM.createRoot(domContainer);
  root.render(e(App));
});
