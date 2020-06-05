import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../componentsReusable/Navbar';
import SelectInput from '../componentsReusable/SelectInput';
import NavButtons from '../componentsReusable/buttons/NavButtons';
import {
  getJudgeList,
  getCompetitionGroupList,
  tryModalJudgeCheck,
  runModal,
} from '../redux/actions/appActions';
import { positions, teacherJudge } from '../utils/constants';
import { toCamelCase } from '../utils/helpers';

export default function Judges() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { judgeList, competitionGroupList, tourDateId, position } = useSelector(
    (state) => state.inputs,
  );

  useEffect(() => {
    Promise.all([
      dispatch(getJudgeList()),
      dispatch(getCompetitionGroupList()),
    ]);
    // eslint-disable-next-line
  }, []);

  const handlers = {
    onModalJudgeCheckConfirmed: () => {
      history.push('/scoring');
    },
  };

  const judgeSelectInputs = [
    {
      name: 'Judge',
      inputs: judgeList,
    },
    {
      name: 'Position',
      inputs: positions,
    },
    {
      name: 'Teacher Judge',
      inputs: teacherJudge,
    },
    {
      name: 'Competition Group',
      inputs: competitionGroupList,
    },
  ];

  const checkModalJudge = async () => {
    const response = await dispatch(
      tryModalJudgeCheck({
        tourDateId,
        position,
      }),
    );
    if (response.data) {
      dispatch(
        runModal({
          isModalShown: true,
          modalInfo: {
            title: 'Alert',
            body: `${response.data.fname} ${response.data.lname} already has scores from this position for this tour date. If judges are being swapped, this is fine. Continue?`,
            button1: 'Cancel',
            button2: 'YES',
            confirm: handlers.onModalJudgeCheckConfirmed,
          },
        }),
      );
    } else {
      history.push('/scoring');
    }
  };

  return (
    <>
      <Navbar text="judge information" />

      <div className="main-container">
        <div className="main-container__title">JUDGE INFORMATION</div>
        <div className="main-container__middle-container">
          {competitionGroupList &&
            judgeList &&
            judgeSelectInputs.map((i) => (
              <SelectInput
                name={i.name}
                variable={toCamelCase(i.name)}
                inputs={i.inputs}
                key={i.name}
              />
            ))}
        </div>

        <NavButtons
          leftButtonText="BACK"
          rightButtonText="NEXT"
          location="judges"
          handleClick={checkModalJudge}
        />
      </div>
    </>
  );
}
