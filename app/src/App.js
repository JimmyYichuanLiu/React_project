import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    data: null,
    showDetail: false,
    nameFilter: "",
    searchFilter: "",
    detail: null,
  };

  async componentDidMount() {
    this.columns = ["id", "first_name", "last_name", "email", "phone"];
    const response = await fetch("/api/json");
    const body = await response.json();
    this.setState({
      data: body.customers,
    });
    this.data = body.customers;
  }

  clickDetail = (user) => {
    this.setState({
      showDetail: true,
      detail: user,
    });
  };

  close = () => {
    this.setState({
      showDetail: false,
    });
  };

  sortById = () => {
    const data = [...this.state.data];
    data.sort((a, b) => {
      return b.id - a.id;
    });
    this.setState({
      data,
    });
  };

  handleFilterTextChange = (event) => {
    this.setState({
      nameFilter: event.target.value,
    });
  };

  handleSearchTextChange = (event) => {
    this.setState({
      searchFilter: event.target.value,
    });
  };

  filterByName = () => {
    const data = [...this.state.data];
    const text = this.state.nameFilter;
    const names = data.filter((item) =>
        `${item.first_name}${item.last_name}`.includes(text)
    );
    this.setState({
      data: names,
      nameFilter: "",
    });
  };

  searchByEmail = () => {
    const data = [...this.state.data];
    const text = this.state.searchFilter;
    const names = data.filter((item) => item.email.includes(text));
    this.setState({
      data: names,
      searchFilter: "",
    });
  };

  reset = () => {
    this.setState({
      data: this.data,
    });
  };

  render() {
    const data = this.state.data;
    console.log(this.state);
    if (!data) {
      return <div />;
    }

    if (this.state.showDetail && this.state.detail) {
      const address = this.state.detail.address;
      return (
          <div style={{ padding: "10px", border: "1px solid #000" }}>
            <p className="title">address1</p>
            <p>{address.address1}</p>
            <p className="title">address2</p>
            <p>{address.address2}</p>
            <p className="title">State</p>
            <p>{address.state}</p>
            <p className="title">City</p>
            <p>{address.city}</p>
            <p className="title">ZipCode</p>
            <p>{address.zipcode}</p>
            <button onClick={this.close}>Close</button>
          </div>
      );
    }

    return (
        <div className="App">
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.sortById}>SortById</button>
          <div>
            <input
                value={this.state.nameFilter}
                onChange={this.handleFilterTextChange}
            />
            <button onClick={this.filterByName}>FilterByName</button>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
                value={this.state.searchFilter}
                onChange={this.handleSearchTextChange}
            />
            <button onClick={this.searchByEmail}>SearchByEmail</button>
          </div>
          <table border={2} cellPadding={5}>
            <thead>
            <tr>
              {this.columns.map((it) => (
                  <td>{it}</td>
              ))}
            </tr>
            </thead>
            <tbody>
            {data.map((it) => {
              return (
                  <tr onClick={this.clickDetail.bind(this, it)}>
                    {this.columns.map((column) => {
                      return <td>{it[column]}</td>;
                    })}
                  </tr>
              );
            })}
            </tbody>
          </table>
        </div>
    );
  }
}

export default App;
