import React, { Component } from "react";
import styles from "./App.module.css";
import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/index";

class App extends Component {
  state = {
    data: {},
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    console.log(this.state.data);
  }
  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}

export default App;
