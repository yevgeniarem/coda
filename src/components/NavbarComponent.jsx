import React from 'react';
import classNames from 'classnames';
import { Navbar, Image } from 'react-bootstrap';

const NavbarComponent = ({ type, text, subtext, menu, judgeInfo }) => {
  const navClassNames = {
    chooseYourEvent: 'navbar--choose-your-event',
    chooseYourCity: 'navbar--choose-your-city',
    scoreSheet: 'navbar--scoreSheet'
  };

  const renderMenu = () => {
    if (menu) {
      return <i className="fas fa-bars icon icon--menu"></i>;
    }
  };

  const renderJudgeProfile = () => {
    if (judgeInfo) {
      return (
        <div className="navbar__judge-profile container">
          <div className="row align-items-center">
            <div className="col col-auto navbar__col navbar__judge-profile-text">
              {judgeInfo}
            </div>
            <Image
              className="col col-auto navbar__col img--judge"
              src="./images/judge.png"
              roundedCircle
            />
            <i class="col col-auto navbar__col navbar__col--last fas fa-caret-down"></i>
          </div>
        </div>
      );
    }
  };

  return (
    <Navbar className={classNames('navbar', navClassNames[type])}>
      <div>{renderMenu()}</div>
      <div className="navbar__main-header">
        <h1 className="navbar__text">{text}</h1>
        <h2 className="navbar__subtext">{subtext}</h2>
      </div>
      <div>{renderJudgeProfile()}</div>
    </Navbar>
  );
};

export default NavbarComponent;
