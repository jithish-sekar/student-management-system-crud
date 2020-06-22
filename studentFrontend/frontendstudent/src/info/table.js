import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className="header">Form Details</h2>
        <table className="table">
          <thead className="tableHead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Location</th>
              <th scope="col">Department</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>

            </tr>
          </thead>
          <tbody>
            {this.props.getData.length > 0 ? (
              this.props.getData.map(e=> 
                <tr className="tableRow" key={e._id}>
                  <td>{e.Name}</td>
                  <td>{e.Age}</td>
                  <td>{e.Location}</td>
                  <td>{e.Department}</td>
                  <td><button className="button"
                  onClick={event=>{
                      this.props.setData(e)
                  }}
                  >Edit</button></td>
                  <td><button className="button"
                  onClick={event=>{
                    this.props.del(e)
                }}
                  >Delete</button></td>

                </tr>
              )
            ) : (
              <tr>
                <td>Data undefined</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Table;
