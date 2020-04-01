import React from 'react';
import NavbarComponent from './NavbarComponent';

const Judge5 = () => {
  // const danceInfo = [
  //   {
  //     id: 51,
  //     number: 101,
  //     name: 'ALL THAT JAZZ (AB)',
  //     ageGroup: 'Teen',
  //     type: 'Lyrical Solo',
  //     technique: {
  //       GENERAL: {
  //         none: [
  //           'Overall Control',
  //           'Overall Balance',
  //           'Overall Alignment',
  //           'Foot Work',
  //           'Ability to Travel',
  //           'Direction Change',
  //           'Ability to Transfer Weight',
  //           'Clear Isolations',
  //           'Transitions'
  //         ],
  //         'FLOOR WORK': ['Transitions To', 'Transitions From']
  //       },
  //       VOCABULARY: {
  //         TURNS: ['Preparation', 'Balance'],
  //         EXTENSIONS: ['Supporting Leg', 'Working Leg', 'Alignment'],
  //         'CONNECTION TO BALLET': ['Technique']
  //       },
  //       'HEAD AND SHOULDERS': {
  //         'GENERAL PLACEMENT': ['Head', 'Chin', 'Neck', 'Shoulders']
  //       },
  //       ARMS: {
  //         none: ['Shape and Line', 'Strength', 'Quality of Movement'],
  //         'GENERAL PLACEMENT': ['Wrists', 'Flexibility']
  //       },
  //       'RIB CAGE': {
  //         none: ['General Placement']
  //       },
  //       'CORE/ABDOMEN': {
  //         none: ['General Placement', 'Engagement', 'Strength']
  //       },
  //       HIPS: {
  //         none: ['General Placement', 'Length out of Hips', 'Flexibility'],
  //         ROTATION: ['Internal', 'External', 'Clear Use of Parallel']
  //       },
  //       LEGS: {
  //         none: [
  //           'General Placement',
  //           'Use of Plie',
  //           'General Placement',
  //           'Articulation',
  //           'Use of Transitions'
  //         ],
  //         'CLARITY OF SHAPE': ['Flex', 'Pointe', 'Bevel', 'Parallel']
  //       },
  //       OVERALL: {
  //         none: [
  //           'Technical Execution',
  //           'Placement of Arms',
  //           'Spotting',
  //           'Supporting Leg',
  //           'Working Leg'
  //         ],
  //         'JUMPS/LEAPS': [
  //           'Preparation',
  //           'Clarity of Position',
  //           'Landing',
  //           'Elbows',
  //           'Hands',
  //           'Fingers'
  //         ]
  //       },
  //       'BACK AND SPINE': {
  //         none: [
  //           'General Placement',
  //           'Length of Spine',
  //           'Engagement Through Arms',
  //           'Strength',
  //           'Use in Transitions',
  //           'Strength',
  //           'Flexibility',
  //           'Clarity of Line and Shape'
  //         ],
  //         LENGTH: ['Back of Knee', 'Quadricep']
  //       },
  //       FEET: {
  //         'EXTENSIONS PRIMARY': ['Supporting Leg'],
  //         EXTENSIONS: ['Supporting Leg', 'Working Leg', 'Alignment'],
  //         'CONNECTION TO BALLET': ['Technique']
  //       },
  //       'HEAD AND SHOULDERS ': {
  //         'GENERAL PLACEMENT': [
  //           'Head',
  //           'Chin',
  //           'Neck',
  //           'Shoulders',
  //           'Knees',
  //           'Toes'
  //         ]
  //       }
  //     }
  //   }
  // ];

  return (
    <div>
      <NavbarComponent
        type="scoreSheet"
        text="#101 - ALL THAT JAZZ (AB)"
        subtext="Teen · Lyrical Solo"
        menu="true"
        judgeInfo="#1 PETER KIM"
      />
    </div>
  );
};

export default Judge5;
