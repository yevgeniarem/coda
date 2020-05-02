import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import SelectInputComponent from './SelectInputComponent';
import NavButtonsComponent from './NavButtonsComponent';
import ModalComponent from './ModalComponent';
import { updateJudgeList, closeSidebar } from '../redux/actions/appActions';

export default function Judges() {
  const [competitionGroup, setCompetitionGroup] = useState();
  const modalJudgeName = useSelector((state) => state.modals.judgeName);
  const judgeList = useSelector((state) => state.inputs.judgeList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('https://api.d360test.com/api/coda/judges')
      .then((data) => {
        dispatch(
          updateJudgeList(
            data.data.map((judge) => ({
              judge: `${judge.fname} ${judge.lname}`,
              id: judge.id,
              default_notes: judge.default_notes,
            })),
          ),
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    axios
      .get('https://api.d360test.com/api/coda/competition-groups')
      .then((groups) => {
        setCompetitionGroup(
          groups.data.map((group) => ({
            competitionGroup: group.name,
            id: group.id,
          })),
        );
      });

    dispatch(closeSidebar());
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

  return (
    <div>
      <ModalComponent
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

      <NavbarComponent type="judgeInformation" text="JUDGE INFORMATION" />

      <div className="main-container">
        <div className="main-container__title">JUDGE INFORMATION</div>
        <div className="main-container__middle-container">
          <SelectInputComponent
            inputs={judgeList}
            formatType="oneVar"
            variable="judge"
            name="Judge"
          />
          <SelectInputComponent
            inputs={positions}
            formatType="oneVar"
            variable="position"
            name="Position"
          />
          <SelectInputComponent
            inputs={teacherJudge}
            formatType="oneVar"
            variable="teacherJudge"
            name="Teacher Judge"
          />
          <SelectInputComponent
            inputs={competitionGroup}
            formatType="oneVar"
            variable="competitionGroup"
            name="Competition Group"
          />
        </div>

        <NavButtonsComponent
          button1="BACK"
          button2="NEXT"
          location="judges"
          disabled="disabled"
        />
      </div>
    </div>
  );
}
