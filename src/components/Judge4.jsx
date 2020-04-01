import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import SelectInputComponent from './SelectInputComponent';
import NavButtonsComponent from './NavButtonsComponent';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { runModal } from '../redux/actions/appActions';
import { useHistory } from 'react-router-dom';

const Judge4 = () => {
  const [judge, setJudge] = useState();
  const [competitionGroup, setCompetitionGroup] = useState();
  const modalJudgeName = useSelector(state => state.modals.judgeName);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://api.d360test.com/api/coda/judges`)
      .then(function(judge) {
        setJudge(
          judge.data.map(judge => {
            return {
              judge: `${judge.fname} ${judge.lname}`,
              id: judge.id
            };
          })
        );
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get(`https://api.d360test.com/api/coda/competition-groups`)
      .then(function(groups) {
        setCompetitionGroup(
          groups.data.map(group => {
            return {
              competitionGroup: group.name,
              id: group.id
            };
          })
        );
      });
  }, []);

  const positions = [
    { id: 1, position: 1 },
    { id: 2, position: 2 },
    { id: 3, position: 3 },
    { id: 4, position: 4 }
  ];
  const teacherJudge = [
    { id: 1, teacherJudge: 'IS Teacher Judge' },
    { id: 2, teacherJudge: 'IS NOT Teacher Judge' }
  ];

  return (
    <div>
      <Modal
        className="modal"
        show={!!modalJudgeName}
        onHide={() => dispatch(runModal(''))}
        centered
      >
        <Modal.Header className="modal__header">
          <Modal.Title className="modal__title">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          {`${modalJudgeName.fname} ${modalJudgeName.lname}`} already has scores
          from this position for this tour date. If judges are being swapped,
          this is fine. Continue?
        </Modal.Body>
        <Modal.Footer className="modal__footer">
          <Button
            variant="secondary"
            onClick={() => dispatch(runModal(''))}
            className="button action-button--navigation action-button--grey"
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(runModal(''));
              history.push('/Judge5');
            }}
            className="button action-button--navigation action-button--blue"
          >
            YES
          </Button>
        </Modal.Footer>
      </Modal>

      <NavbarComponent type="judgeInformation" text="JUDGE INFORMATION" />

      <div className="main-container">
        <div className="main-container__title">JUDGE INFORMATION</div>
        <div className="main-container__middle-container">
          <SelectInputComponent
            inputs={judge}
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
          location="judge4"
          disabled="disabled"
        />
      </div>
    </div>
  );
};

export default Judge4;
