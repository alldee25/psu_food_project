import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navitem extends Component {
  render() {
    return (
      <li id={this.props.item}>
        <Link to={this.props.tolink} onClick={this.props.active.bind(this, this.props.item)}
        >
            <div className="it">
                 <div className="icon">{this.props.icon}</div>
                <div className="text">{this.props.item}</div>
            </div>
         
          
        </Link>
      </li>
    );
  }
}
export default Navitem;
