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
  const { judgeName: modalJudgeName } = useSelector((state) => state.modals);
  const { judgeList, competitionGroupList } = useSelector(
    (state) => state.inputs,
  );

  useEffect(() => {
    dispatch(getJudgeList());
    dispatch(getCompetitionGroupList());
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

  return (
    <>
      <Modal
        location="judges"
        isShown={!!modalJudgeName}
        title="Alert"
        body={`${modalJudgeName.fname} ${modalJudgeName.lname} already has scores
        from this position for this tour date. If judges are being swapped,
        this is fine. Continue?`}
        numButtons="2"
        button1="Cancel"
        button2="YES"
      />

      <Navbar text="judge information" />

      <div className="main-container">
        <div className="main-container__title">JUDGE INFORMATION</div>
        <div className="main-container__middle-container">
          {competitionGroupList[0] &&
            judgeList[0] &&
            judgeSelectInputs.map((i) => (
              <SelectInput
                name={i.name}
                variable={i.variable}
                inputs={i.inputs}
                key={i.name}
              />
            ))}
        </div>

        <NavButtons button1="BACK" button2="NEXT" location="judges" disabled />
      </div>
    </>
  );
}
