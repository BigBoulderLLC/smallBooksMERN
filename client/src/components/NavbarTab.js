import React, {Component} from 'react';

class NavbarTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    }
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  handleClick() {
    if (this.props.clickAction === null) {

    }
  }

  render() {
    const liClass = this.state.isHovered ? "navbar-tab-hover" : "";
    return(
      <li className={`navbar-tab ${liClass}`} onClick={this.props.clickAction} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <p>{this.props.tabName}</p>
      </li>
    );
  }
}

export default NavbarTab;