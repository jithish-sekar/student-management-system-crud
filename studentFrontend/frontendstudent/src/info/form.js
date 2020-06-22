import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      Name: "",
      Age: "",
      Location: "",
      Department: "",
      isEdit: false,
    };
  }

  infoChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  infoSubmit = (event) => {
    if (!this.state.isEdit) {
      let data = {
        isEdit: this.state.isEdit,
        Name: this.state.Name,
        Age: this.state.Age,
        Location: this.state.Location,
        Department: this.state.Department,
      };
      this.props.myData(data);
    } else {
      let data = {
        isEdit: this.state.isEdit,
        _id: this.state._id,
        Name: this.state.Name,
        Age: this.state.Age,
        Location: this.state.Location,
        Department: this.state.Department,
      };
      this.props.myData(data);
    }
  };

  componentWillReceiveProps(props) {
    // console.log(props.setForm._id);
    if (props.setForm._id != null) {
      this.setState({
        _id: props.setForm._id,
        isEdit: true,
        Name: props.setForm.Name,
        Age: props.setForm.Age,
        Location: props.setForm.Location,
        Department: props.setForm.Department,
      });
    }
  }

  render() {
    return (
      <div>
        <h2 className="header">Fill the Form</h2>
        <form onSubmit={this.infoSubmit} autoComplete="off">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={this.infoChange}
              name="Name"
              value={this.state.Name}
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="text"
              className="form-control"
              placeholder="age"
              onChange={this.infoChange}
              name="Age"
              value={this.state.Age}
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              className="form-control"
              placeholder="location"
              onChange={this.infoChange}
              name="Location"
              value={this.state.Location}
            />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              className="form-control"
              placeholder="department"
              onChange={this.infoChange}
              name="Department"
              value={this.state.Department}
            />
          </div>

          <button type="submit" className="button">
            {this.state.isEdit ? "Update" : "Create"}
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
