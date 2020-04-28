import React from 'react';
import PropTypes from 'prop-types';
import { isChecked, descendantsChecked, boldTextNotMatching } from '../filters';
import Checkbox from '../Checkbox/Checkbox';

import './CategoryList.scss';

const CategoryList = React.forwardRef(({
  onChecked,
  checkedParents,
  checked,
  filter,
  focused,
  parent,
  listRefId,
  getDescendants,
  tabIndex,
  categoryList,
  searchValue,
  categoryRefId,
  dictionary }, ref) => {

  /**
   * Return a list of checboxElements with span as children
   * @param  {Object[]} checkboxList
   */
  const getCheckboxes = (checkboxList) => checkboxList.map(element =>
    <div key={parent + element.id}>
      <Checkbox
        key={parent + element.id}
        id={element.id}
        label={element.name}
        checked={isChecked(element.id, checked)}
        filter={filter}
        onChecked={onChecked}
        focused={focused === element.id}
        parent={parent}
        descendantsChecked={descendantsChecked(getDescendants(element), checked, checkedParents)}
        ref={ref && ref[element.id]}
        tabIndex={tabIndex}
      >
        {searchValue.length > 1 && boldTextNotMatching(element.name, searchValue)}
      </Checkbox>
    </div>
  );

  return (
    <ul
      className="checkbox-list"
      id='checkbox-list'
      role='group'
      aria-labelledby={filter.name}
      ref={ref && ref[listRefId]}>
      {
        categoryList.map(category => {
          return (
            <div key={'headers-' + category.id} className={!category.noLine ? 'bottom-line' : ''}>
              <div>{category.catNoParent !== null ? getCheckboxes([category.catNoParent]) : null}</div>
              {category.children &&
                <>
                  <div
                    key={category}
                    ref={ref[categoryRefId + category.id]}
                    className='category-header'>
                    {dictionary.in} {category.name}
                  </div>
                  {getCheckboxes(category.children)}
                </>
              }
            </div>
          );
        })
      }
    </ul>
  );
});

CategoryList.propTypes = {
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.string,
  parent: PropTypes.string,
  listRefId: PropTypes.string.isRequired,
  tabIndex: PropTypes.string,
  categoryRefId: PropTypes.string.isRequired,
  checkedParents: PropTypes.array,
  getDescendants: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  searchValue: PropTypes.string.isRequired,
  dictionary: PropTypes.object.isRequired
};

export default CategoryList;