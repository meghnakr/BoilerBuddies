import React from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './DropdownItem';

export default class Dropdown extends React.Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
        title: PropTypes.string.isRequired,
      }

    
      constructor(props) {
        super(props);
    
        this.state = {
          activeItem: this.props.children[0].props.label,
          open: false,
        };
      }
    
      onClickItem = (item) => {
        this.setState({ activeItem: item });
      }

      handleOpen = () => {
        this.setState( {open: !this.state.open});
      }
    
      render() {
        const {
          onClickItem,
          handleOpen,
          props: {
            children,
            title
          },
          state: {
            activeItem,
            open
          }
        } = this;

    
        return (
          <div className="dropdown">
            <button className='default-btn-white' onClick={handleOpen}>{title} <i>&#9660;</i>
            </button>
            {open ? (
                <div className='dropdown-content'>
                    <ul>
                    {children.map((child) => {
                        const {label} = child.props;
                        return  (
                            <li><button onClick={onClickItem}>{label}</button></li>
                        );
                    })
                    }
                    </ul>
                </div>
            ) : null}
            {/*
            {open ? (
                <ol className="dropdown-list">
                {children.map((child) => {
                  const { label } = child.props;
      
                  return (
                    <DropdownItem
                      activeItem={activeItem}
                      key={label}
                      label={label}
                      onClick={onClickItem}
                    />
                  );
                })}
              </ol>
            ) : null }
            
            <div className="dropdown-content">
              {children.map((child) => {
                if (child.props.label !== activeItem) return undefined;
                return child.props.children;
              })}
            </div> 
            */}
          </div>
        );
      }
}