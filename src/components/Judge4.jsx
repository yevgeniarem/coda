import React from 'react';
import NavbarComponent from './NavbarComponent';
import SelectInputComponent from './SelectInputComponent';
import NavButtonsComponent from './NavButtonsComponent';

const Judge4 = () => {
  const judges = [
    { id: 11, judge: 'Allen Page' },
    { id: 12, judge: 'Cynthia Rodriguez' },
    { id: 13, judge: 'Kirsten Roland' },
    { id: 14, judge: 'Samantha Arnold' },
    { id: 15, judge: 'Hector Pierce' },
    { id: 16, judge: 'Jordan Amerson' }
  ];
  const judgePositions = [
    { id: 21, judgePosition: 'Head Judge' },
    { id: 22, judgePosition: 'Secondary Judge' },
    { id: 23, judgePosition: 'Assistant Judge' }
  ];
  const teacherJudge = [
    { id: 31, teacherJudge: 'Yes' },
    { id: 32, teacherJudge: 'No' }
  ];
  const finals = [
    { id: 41, finals: 'Quarterfinals' },
    { id: 42, finals: 'Semifinals' },
    { id: 43, finals: 'Finals' }
  ];
  return (
    <div>
      <NavbarComponent type="judgeInformation" text="JUDGE INFORMATION" />

      <div className="main-container">
        <div className="main-container__title">JUDGE INFORMATION</div>
        <div className="main-container__middle-container">
          <SelectInputComponent
            options={judges}
            formatType="oneVar"
            variable="judge"
            name="JUDGE"
          />
          <SelectInputComponent
            options={judgePositions}
            formatType="oneVar"
            variable="judgePosition"
            name="JUDGE POSITION"
          />
          <SelectInputComponent
            options={teacherJudge}
            formatType="oneVar"
            variable="teacherJudge"
            name="TEACHER JUDGE"
          />
          <SelectInputComponent
            options={finals}
            formatType="oneVar"
            variable="finals"
            name="FINALS"
          />
        </div>

        <NavButtonsComponent button1="BACK" button2="NEXT" />
      </div>
    </div>
  );
};

export default Judge4;
