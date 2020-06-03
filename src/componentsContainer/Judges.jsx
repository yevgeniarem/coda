import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../componentsReusable/Navbar';
import SelectInput from '../componentsReusable/SelectInput';
import NavButtons from '../componentsReusable/buttons/NavButtons';
import Modal from '../componentsReusable/Modal';
import {
  getJudgeList,
  getCompetitionGroupList,
  tryJudgeCheck,
  runJudgeModal,
} from '../redux/actions/appActions';
import { positions, teacherJudge } from '../utils/constants';
import { toCamelCase } from '../utils/helpers';

export default function Judges() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    { judgeName: modalJudgeName },
    { judgeList, competitionGroupList, tourDateId, position },
  ] = useSelector((state) => [state.modals, state.inputs]);

  useEffect(() => {
    Promise.all([
      dispatch(getJudgeList()),
      dispatch(getCompetitionGroupList()),
    ]);
    // eslint-disable-next-line
  }, []);

  const checkJudge = async () => {
    const response = await dispatch(
      tryJudgeCheck({
        tourDateId,
        position,
      }),
    );
    if (response.data) {
      dispatch(runJudgeModal(response.data));
    }
  };

  const handlers = {
    onJudgeCheckConfirmed: () => {
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

  const modalMessage =
    modalJudgeName &&
    `${modalJudgeName.fname} ${modalJudgeName.lname} already has scores from this position for this tour date. If judges are being swapped, this is fine. Continue?`;

  return (
    <>
      <Modal
        title="Alert"
        body={modalMessage}
        button1="Cancel"
        button2="YES"
        confirm={handlers.onJudgeCheckConfirmed}
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
          handleClick={checkJudge}
        />
      </div>
    </>
  );
}
