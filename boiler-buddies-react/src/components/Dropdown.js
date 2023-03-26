import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default class Dropdown extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  

  render() {
    const {
      handleOpen,
      props: { children, title },
      state: { open },
    } = this;

    return (
      <div className="dropdown">
        <button
          className="default-btn-white"
          style={{ marginTop: "3vmin" }}
          onClick={handleOpen}
        >
          {title} <i>&#9660;</i>
        </button>
        {open ? (
          <div className="dropdown-content">
            <ul>
              {children.map((child, idx) => {
                const label = child.props.label;
                const route = child.props.route;
                const navigate = child.props.navigation;
                const onClick = child.props.onClick;
                return (
                  <li key={idx}>
                    <button
                      className="dropdown-link"
                      onClick={() => {
                        onClick()
                        this.setState({ open: false });
                      }}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
