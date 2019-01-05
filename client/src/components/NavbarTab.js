import React, {Component} from 'react'

class NavbarTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false
    }
    this.handleHover = this.handleHover.bind(this)
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  render() {
    const liClass = this.state.isHovered ? "navbar-tab-hover" : ""
    return(
      <li className={`navbar-tab ${liClass}`} onClick={this.props.onClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <a href={this.props.navbarLink.link}><p>{this.props.navbarLink.tabName}</p></a>
      </li>
    )
  }
}

export default NavbarTab