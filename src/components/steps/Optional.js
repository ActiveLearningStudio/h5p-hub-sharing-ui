import React from 'react';
import PropTypes from 'prop-types';
import Keywords from '../generic/keywords/Keywords';
import FormElement from '../generic/form/Element';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import ImagePreview from '../generic/form/ImagePreview';
import Dropdown from '../generic/dropdown/Dropdown';
import {optionalDefinition} from '../../utils/helpers';

import './Optional.scss';

const Optional = ({ optionalInfo, setOptionalInfo }) => {

  const l10n = React.useContext(TranslationContext);
  const metadata = React.useContext(MetadataContext);

  /**
   * Set data in optionalInfo
   * @param {string} data
   * @param {string} type
   */
  const setInfo = (data, type) => {
    setOptionalInfo(() => ({
      ...optionalInfo,
      [type]: data
    }));
  }

  return (
    <div className='optional-page'>
      <div className='keywords'>
        <FormElement label={l10n.keywords}>
          <Keywords chips={optionalInfo.keywords} setChips={(chips) => setInfo(chips, 'keywords')}></Keywords>
        </FormElement>
      </div>
      <div className='form-element row dropdowns'>
        <div className='dropdown-element-wrapper'>
          <FormElement label={l10n.language}>
            <Dropdown
              options={metadata.languages}
              onChange={(e) => setInfo(e.target.value, 'language')}
              selected={optionalInfo.language}>
            </Dropdown>
          </FormElement>
        </div>
        <div className='dropdown-element-wrapper'>
          <FormElement label={l10n.level}>
            <Dropdown
            options={metadata.levels}
            onChange={(e) => setInfo(e.target.value, 'level')}
            selected={optionalInfo.level}>
            </Dropdown>
          </FormElement>
        </div>
      </div>
      <div className='form-element columns'>
        <div className='column'>
          <FormElement label={l10n.shortDescription}>
            <textarea
              value={optionalInfo.shortDescription ? optionalInfo.shortDescription : ''}
              id="short-description"
              placeholder={l10n.shortDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'shortDescription')}
              className='short-description'>
            </textarea>
          </FormElement>
          <FormElement label={l10n.description}>
            <textarea
              value={optionalInfo.longDescription ? optionalInfo.longDescription : ''}
              id="long-description"
              placeholder={l10n.longDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'longDescription')}>
            </textarea>
          </FormElement>
        </div>
        <div className='column'>
            <FormElement label={l10n.icon} description={l10n.iconDescription}>
              <ImagePreview/>
            </FormElement>
          <FormElement label={l10n.screenshots} description={l10n.screenshotsDescription}>
            <div id='screenshots'>
              {optionalInfo.screenshots.map((element, i) =>
                <ImagePreview key={i}></ImagePreview>
              )}
            </div>
          </FormElement>
        </div>
      </div>
    </div >
  );
};

Optional.propTypes = {
  optionalInfo: optionalDefinition,
  setOptionalInfo: PropTypes.func.isRequired
}

export default Optional;