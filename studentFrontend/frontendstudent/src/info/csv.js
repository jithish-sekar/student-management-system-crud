import React, { Component } from "react";
import "../App.css";
import axios from "axios";

export default class csv extends Component {
  readFile = async (fileUpload) => {
    if (
      fileUpload &&
      fileUpload.value.length &&
      fileUpload.value.toLowerCase().indexOf(".csv") !== -1
    ) {
      if (typeof FileReader != "undefined") {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = function (e) {
            if (e.target && e.target.result) resolve(e.target.result);
          };
          reader.onerror = () => {
            reader.abort();
            reject("Failed");
          };
          reader.readAsText(fileUpload.files[0]);
        });
      }
    }
  };

  upload = async (e) => {
    e.preventDefault();
    const data = await this.readFile(e.target);
    this.saveData(data);
  };

  saveData(data) {
    debugger;
    console.log("dsad: " + data);
    data = data.split("\n");
    axios.post("http://localhost:5000/info/csvUpload", data).then((res) => {
      // this.getAll();
      // document.getElementById("csvUploader").value = null;
      window.location.reload();
    });
  }

  getAll() {
    axios.get("http://localhost:5000/info").then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data,
      });
    });
  }

  render() {
    return (
      <div className="csvForm">
        <h3>Add csv file:</h3>
        <form>
          <input
            className="inputFile"
            id="csvUploader"
            type="file"
            name="uploaded_file"
            onChange={(e) => {
              this.upload(e);
            }}
          ></input>
        </form>
      </div>
    );
  }
}
