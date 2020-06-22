import React, { Component } from "react";
import Form from "./form";
import Table from "./table";
import Csv from "./csv";
import axios from "axios";
import "../App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editData: [],
    };
  }
  create = (data) => {
    if (!data.isEdit) {
      axios.post("http://localhost:5000/info", data).then((res) => {
        this.getAll();
      });
    } else {
      axios.put("http://localhost:5000/info/update", data).then((res) => {
        this.getAll();
      });
    }
  };

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    axios.get("http://localhost:5000/info").then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data,
      });
    });
  }

  update = (data) => {
    console.log(data);
    this.setState({
      editData: data,
    });
  };

  del = (data) => {
    var option = window.confirm(`Are you sure want to delete ${data.Name}`);
    if (option) {
      axios.delete(`http://localhost:5000/info/del/${data._id}`).then((res) => {
        console.log(res);
        this.getAll();
      });
    }
  };
  render() {
    return (
      <div className="mainContent">
        <div className="imageContainer">
          <img className="studentImage" src="student.png" />
          <h3>Students Management System</h3>
        </div>
        <div className="container">
          <div>
            <div className="formDetails"></div>
            <Form myData={this.create} setForm={this.state.editData} />
            <Csv />
          </div>
          <div className="infoDetails">
            <Table
              getData={this.state.data}
              setData={this.update}
              del={this.del}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
