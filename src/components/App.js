import React from "react";

import weather from "../apis/weather";
const API_KEY = "0ffd023cfc8b3d1b4e19f030b092b472";

class App extends React.Component {
  state = { weatherData: null, errorMessage: "" };
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      pos => this.getCurrentWeather(pos),
      err => this.setState({ errorMessage: err.message })
    );
  }

  getCurrentWeather = async pos => {
    const response = await weather.get("/onecall", {
      params: {
        lat: `${pos.coords.latitude}`,
        lon: `${pos.coords.longitude}`,
        units: "metric",
        exclude: "hourly,daily",
        appid: `${API_KEY}`
      }
    });

    this.setState({
      weatherData: response.data
    });
  };

  renderWeather = () => {
    if (this.state.weatherData === null && this.state.errorMessage === "") {
      return <div class="ui active centered inline loader"></div>;
    } else if (this.state.errorMessage !== "") {
      return (
        <div className="ui negative message">
          <div className="header">We're sorry we can't get any data</div>
          <ul className="list">
            <li>{this.state.errorMessage}</li>
            <li>Please allow your geolocation setting to view weather data</li>
          </ul>
        </div>
      );
    } else {
      console.log(this.state.weatherData);
      return (
        <div>
          <h2>{this.state.weatherData.timezone}</h2>
          <h3>{this.state.weatherData.current.temp} °C</h3>
          <h4>{this.state.weatherData.current.weather[0].main}</h4>
        </div>
      );
    }
  };
  render() {
    return (
      <div
        style={{ textAlign: "center", height: "100%" }}
        className="ui container"
      >
        <h1>Mini Weather App</h1>
        {this.renderWeather()}
      </div>
    );
  }
}

export default App;
