import React from 'react';
import PropTypes from 'prop-types';

import Tip from '../../../generic/tip/Tip';

import './Checkbox.scss';

const Checkbox = React.forwardRef(({
  id,
  errorMessage,
  label,
  checked,
  filter,
  onChecked,
  focused,
  checkboxChildren,
  navigateToChildren,
  parent,
  descendantsChecked,
  tabIndex,
  children}, ref) => {

  /**
   * Checkes of current checkbox if you use enter or space
   * @param  {event} e
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key == ' ') {
      onChecked(filter, id, !checked);
      e.preventDefault();
    }
  };

  /**
   * Stop propagation so click only check of checkbox and don't navigate
   * @param  {string} filter
   * @param  {string} id
   * @param  {bool} checked
   * @param  {event} e
   */
  const onCheckedClick = (filter, id, checked, e) => {
    e.stopPropagation();
    onChecked(filter, id, checked, parent);
  };

  return (
    <li
      ref={ref}
      id={'h5p-hub-' + id}
      key={filter + id}
      className={`h5p-hub-checkbox ${checked ? 'h5p-hub-checked ' : ''} ${focused ? 'h5p-hub-highlighted' : ''} ${checkboxChildren ? 'h5p-hub-parent' : ''}`}
      role='checkbox'
      aria-checked={checked}
      onClick={() =>
        checkboxChildren ? navigateToChildren(id, checkboxChildren) : onChecked(filter, id, !checked)
      }
      tabIndex={tabIndex ? tabIndex : '0'}
      onKeyDown={handleKeyDown}>
      <div className='h5p-hub-content' key={'label' + id}>
        <div className='h5p-hub-icon'
          onClick={(e) =>
            checkboxChildren ? onCheckedClick(filter, id, !checked, e) : {}
          }
        />
        <div className='h5p-hub-label-text'>
          {children ? children : label}
          {descendantsChecked > 0 && ` (${descendantsChecked})`}
        </div>
        <Tip text={errorMessage} open={errorMessage != undefined} className='h5p-hub-checkbox-error-tip' />
      </div>
    </li>
  );
});

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  children: PropTypes.any,
  checkboxChildren: PropTypes.array,
  navigateToChildren: PropTypes.func,
  parent: PropTypes.string,
  tabIndex: PropTypes.string,
  descendantsChecked: PropTypes.any,
};

export default Checkbox;