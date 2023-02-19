import React from 'react';
import PropTypes from 'prop-types';

export default class DropdownItem extends React.Component {
    static propTypes = {
        activeItem: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const {label, onClick } = this.props;
        onClick(label)
    }

    render() {
        const {
          onClick,
          props: {
            activeItem,
            label,
          },
        } = this;
    
        let className = 'dropdown-item';
    
        if (activeItem === label) {
          className += ' dropdown-active';
        }
    
        return (
          <li
            className={className}
            onClick={onClick}
          >
            {label}
          </li>
        );
      }
}