import React, {Component} from 'react';
import appStoreLogo from '../static/img/appStoreLogo.png';
import mainLogo from '../static/img/podo_main_no_margin.png';

export default class AppStoreDownloadPage extends Component {
  handleClickAppStoreLogo = () => {
    alert('app store 다운로드!');
  };
  // @TODO: app store 체크 하고 redirect
  render() {
    return (
      <div className="mobile-download-div">
        <img src={mainLogo} className="main-logo" alt="main logo" />
        <p>
          포도리스트를
          <br />
          AppStore에서 만나보세요!
        </p>
        <img src={appStoreLogo} className="appstore-logo" alt="app store logo" onClick={this.handleClickAppStoreLogo} />
      </div>
    );
  }
}
