import { connect } from 'react-redux';
import { selectFile, updateError, clearFile } from '../../actions/publish';
import { selectAsset } from '../../selectors/show';
import View from './view';
import siteConfig from '@config/siteConfig.json';
import createCanonicalLink from '@globalutils/createCanonicalLink';

const {
  assetDefaults: { thumbnail: defaultThumbnail },
} = siteConfig;

const mapStateToProps = ({ show, publish: { file, thumbnail, error, isUpdate } }) => {
  const fileError = error.file;
  const obj = { file, thumbnail, fileError, isUpdate };
  let asset, name, claimId, fileExt, outpoint, sourceUrl;
  if (isUpdate) {
    asset = selectAsset(show);
    const { claimData } = asset;
    if (asset) {
      obj.fileExt = claimData.contentType.split('/')[1];
      if (obj.fileExt === 'mp4') {
        obj.sourceUrl = claimData.thumbnail ? claimData.thumbnail : defaultThumbnail;
      } else {
        ({ fileExt, outpoint } = claimData);
        obj.sourceUrl = `${createCanonicalLink({ asset: claimData })}.${fileExt}?${outpoint}`;
      }
    }
  }
  return obj;
};

const mapDispatchToProps = dispatch => {
  return {
    selectFile: file => {
      dispatch(selectFile(file));
    },
    setFileError: value => {
      dispatch(clearFile());
      dispatch(updateError('file', value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
