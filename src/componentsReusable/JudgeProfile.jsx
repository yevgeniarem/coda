import React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';

import Dropdown from './Dropdown';
import CONST from '../utils/constants';

export default function JudgeProfile() {
  const { judge: judgeId, position, judgeList } = useSelector(
    (state) => state.inputs,
  );

  const findJudgeNameById = () => {
    const index = judgeList.map((judge) => judge.id === judgeId).indexOf(true);
    const currentJudge = judgeList[index] || {};
    return currentJudge.judge.toUpperCase();
  };

  return (
    <>
      <div className="navbar--judge-profile-container">
        <div className="row align-items-center">
          <div className="col col-auto navbar__col navbar--judge-profile-text">
            {`#${position} ${findJudgeNameById()}`}
          </div>
          <Image
            className="col col-auto navbar__col img--judge"
            src={`${CONST.ASSETS_URL}/staff/50x50/${judgeId}.jpg`}
            roundedCircle
          />
          <Dropdown />
        </div>
      </div>
    </>
  );
}
