import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../componentsReusable/Navbar';
import SelectInput from '../componentsReusable/SelectInput';
import NavButtons from '../componentsReusable/buttons/NavButtons';
import Modal from '../componentsReusable/Modal';
import {
  getJudgeList,
  getCompetitionGroupList,
} from '../redux/actions/appActions';
import { positions, teacherJudge } from '../utils/constants';

export default function Judges() {
  const dispatch = useDispatch();
  const [
    { judgeName: modalJudgeName },
    { judgeList, competitionGroupList },
  ] = useSelector((state) => [state.modals, state.inputs]);

  useEffect(() => {
    Promise.all([
      dispatch(getJudgeList()),
      dispatch(getCompetitionGroupList()),
    ]);
  }, [dispatch]);

  const judgeSelectInputs = [
    {
      name: 'Judge',
      variable: 'judge',
      inputs: judgeList,
    },
    {
      name: 'Position',
      variable: 'position',
      inputs: positions,
    },
    {
      name: 'Teacher Judge',
      variable: 'teacherJudge',
      inputs: teacherJudge,
    },
    {
      name: 'Competition Group',
      variable: 'competitionGroup',
      inputs: competitionGroupList,
    },
  ];

  const modalMessage = `${modalJudgeName && modalJudgeName.fname} ${
    modalJudgeName && modalJudgeName.lname
  } already has scores from this position for this tour date. If judges are being swapped, this is fine. Continue?`;

  return (
    <>
      <Modal
        location="judges"
        isShown={!!modalJudgeName}
        title="Alert"
        body={modalMessage}
        numButtons="2"
        button1="Cancel"
        button2="YES"
      />

      <Navbar text="judge information" />

      <div className="main-container">
        <div className="main-container__title">JUDGE INFORMATION</div>
        <div className="main-container__middle-container">
          {competitionGroupList &&
            judgeList &&
            judgeSelectInputs.map((i) => (
              <SelectInput
                name={i.name}
                variable={i.variable}
                // variable={toCamelCase(i.name)}
                inputs={i.inputs}
                key={i.name}
              />
            ))}
        </div>

        <NavButtons
          leftButtonText="BACK"
          rightButtonText="NEXT"
          location="judges"
          rightInitiallyDisabled
        />
      </div>
    </>
  );
}
