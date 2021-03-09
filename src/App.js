import React from "react";
import Instructions from "./components/Instructions";
import Mode from "./components/Mode";
import TrafficLight from "./components/TrafficLight";
import Change from "./components/Change";
import Reset from "./components/Reset";

import FetchLight from "./fetch-light";

import "./App.css";

export default class App extends React.Component {
  state = {
    active: false,
    color: "white",
    mode: "random"
  };

  handleMode = (mode) => {
    const selectedMode = mode;
    const drivingModeBtn = document.getElementById("driving");
    const randomModeBtn = document.getElementById("random");

    this.setState({ mode: selectedMode });

    if (selectedMode === "driving") {
      drivingModeBtn.setAttribute("class", "selected");
      randomModeBtn.classList.remove("selected");
    } else if (selectedMode === "random") {
      randomModeBtn.setAttribute("class", "selected");
      drivingModeBtn.classList.remove("selected");
    }
  };

  switchLights = (color) => {
    const circles = document.getElementsByClassName("circles");
    let previousColor = this.state.color;
    let previousLight = document.getElementById(previousColor);
    let activeLight = document.getElementById(color);

    this.setState({ color: color });

    for (let i = 0; i < circles.length; i++) {
      circles[i].classList.add("inactive");
    }

    activeLight.classList.remove("inactive");
    activeLight.classList.add(color);

    if (previousLight) previousLight.classList.remove(previousColor);
    if (previousLight === activeLight) activeLight.classList.add(color);
  };

  handleStart = () => {
    if (this.state.mode === "random") {
      const randomModeBtn = document.getElementById("random");
      randomModeBtn.setAttribute("class", "selected");
    }

    if (!this.state.active) {
      this.setState({ active: true });
      FetchLight()
        .then((color) => this.switchLights(color))
        .catch((err) => console.log(err));
    }
  };

  handleChange = () => {
    if (this.state.mode === "driving" && this.state.active) {
      let currentColor = this.state.color;
      let nextColor = "white";

      if (currentColor === "red") nextColor = "green";
      else if (currentColor === "yellow") nextColor = "red";
      else if (currentColor === "green") nextColor = "yellow";

      this.switchLights(nextColor);
    }

    if (this.state.mode === "random" && this.state.active) {
      let previousColor = this.state.color;
      FetchLight()
        .then((color) => {
          this.switchLights(color);
          if (previousColor === color) this.handleChange();
        })
        .catch((err) => console.log(err));
    }
  };

  handleReset = () => {
    this.setState({ active: false, color: "white", mode: "random" });
    const drivingModeBtn = document.getElementById("driving");
    const randomModeBtn = document.getElementById("random");

    this.state.mode === "driving"
      ? drivingModeBtn.classList.remove("selected")
      : randomModeBtn.classList.remove("selected");

    let color = this.state.color;
    let activeLight = document.getElementById(color);
    if (color !== "white") {
      activeLight.classList.remove(color);
      activeLight.classList.add("inactive");
    }
  };

  render() {
    return (
      <div className="page">
        <Instructions />
        <Mode mode={this.state.mode} handleMode={this.handleMode} />
        <TrafficLight
          active={this.state.active}
          mode={this.state.mode}
          handleStart={this.handleStart}
        />
        <Change
          active={this.state.active}
          color={this.state.color}
          mode={this.state.mode}
          handleChange={this.handleChange}
        />
        <Reset handleReset={this.handleReset} />
      </div>
    );
  }
}
