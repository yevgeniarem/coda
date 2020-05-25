export default {
  API: 'https://api.d360test.com/api',
  ASSETS_URL: 'https://assets.dance360.com',
};

export const positions = [
  { id: 1, position: 1 },
  { id: 2, position: 2 },
  { id: 3, position: 3 },
  { id: 4, position: 4 },
];

export const teacherJudge = [
  { id: true, teacherJudge: 'IS Teacher Judge' },
  { id: false, teacherJudge: 'IS NOT Teacher Judge' },
];

export const buttonCategories = [
  { name: 'foundationButtons', id: 11 },
  { name: 'performanceButtons', id: 12 },
  { name: 'creativeButtons', id: 13 },
];

export const formInputs = [
  {
    name: 'name',
    registerOptions: { required: 'Username is required' },
    controlId: 'formBasicEmail',
  },
  {
    name: 'password',
    registerOptions: { required: 'Password is required' },
    controlId: 'formBasicPassword',
  },
];

export const dropdownItems = [
  { name: 'CHANGE JUDGE INFO', info: 'change-judge', path: '/Judges' },
  { name: 'SIGN OUT', info: 'sign-out', path: '/Login' },
];

export const loginIconClasses = {
  name: ['far', 'envelope'],
  password: ['fas', 'lock'],
};

export const allButtonsInfo = [
  {
    type: 'headerButton',
    name: 'header_name',
    className: 'button--header-level',
    clickable: false,
  },
  {
    type: 'level3Button',
    name: 'level_3_name',
    className: 'button--scoring',
    clickable: true,
  },
  {
    type: 'level4Button',
    name: 'level_4_name',
    className: 'button--scoring',
    clickable: true,
  },
];
