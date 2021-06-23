import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"

const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    monday.listen("settings", res => {
      this.setState({ settings: res.data });
    })
  }

  render() {
    return <div
      className="App"
      style={{ background: (this.state.settings.background) }}
    >
      <AttentionBox
        title="Hello Monday Apps!"
        text="Testing"
        type="success"
      />
      <h2>
        Hello
      </h2>
    </div>;
  }
}

export default App;
