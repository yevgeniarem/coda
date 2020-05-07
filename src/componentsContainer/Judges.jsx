import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Navbar from '../componentsReusable/Navbar';
import SelectInput from '../componentsReusable/SelectInput';
import NavButtons from '../componentsReusable/buttons/NavButtons';
import Modal from '../componentsReusable/Modal';
import { updateJudgeList } from '../redux/actions/appActions';
import CONST from '../utils/constants';

export default function Judges() {
  const dispatch = useDispatch();
  const { judgeName: modalJudgeName } = useSelector((state) => state.modals);
  const { judgeList } = useSelector((state) => state.inputs);
  const [competitionGroup, setCompetitionGroup] = useState();

  useEffect(() => {
    axios
      .get(`${CONST.API}/coda/judges`)
      .then((d) => {
        dispatch(
          updateJudgeList(
            d.data.map((judge) => ({
              judge: `${judge.fname} ${judge.lname}`,
              id: judge.id,
              default_notes: judge.default_notes,
            })),
          ),
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });

    axios
      .get(`${CONST.API}/coda/competition-groups`)
      .then((groups) => {
        setCompetitionGroup(
          groups.data.map((group) => ({
            competitionGroup: group.name,
            id: group.id,
          })),
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [dispatch]);

  const positions = [
    { id: 1, position: 1 },
    { id: 2, position: 2 },
    { id: 3, position: 3 },
    { id: 4, position: 4 },
  ];

  const teacherJudge = [
    { id: true, teacherJudge: 'IS Teacher Judge' },
    { id: false, teacherJudge: 'IS NOT Teacher Judge' },
  ];

  const selectInputs = [
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
      inputs: competitionGroup,
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
          {competitionGroup &&
            judgeList[0] &&
            selectInputs.map((i) => (
              <SelectInput
                name={i.name}
                variable={i.variable}
                inputs={i.inputs}
                key={i.name}
              />
            ))}
        </div>

        <NavButtons
          button1="BACK"
          button2="NEXT"
          location="judges"
          disabled="disabled"
        />
      </div>
    </>
  );
}
