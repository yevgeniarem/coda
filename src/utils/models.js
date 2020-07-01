/* eslint-disable max-classes-per-file */

import { formatTourDate } from './helpers';

export class Event {
  constructor({ id, name, current_season_id }) {
    this.id = id;
    this.name = name;
    this.seasonId = current_season_id;
  }
}

export class TourDate {
  constructor({ id, event_city, start_date, end_date }) {
    this.id = id;
    this.eventCity = event_city.name;
    this.startDate = start_date;
    this.endDate = end_date;
  }
}

export class Button {
  constructor({ id, level_1_id, good }) {
    this.level_4_id = id;
    this.level_1_id = level_1_id;
    this.good = good;
  }
}

export class Modal {
  constructor({ isModalShown, modalInfo }) {
    this.isModalShown = isModalShown;
    this.modalInfo = {
      title: modalInfo.title,
      body: modalInfo.body,
      cancel: modalInfo.cancel && {
        text: modalInfo.cancel.text,
        func: modalInfo.cancel.func,
      },
      confirm: { text: modalInfo.confirm.text, func: modalInfo.confirm.func },
    };
  }
}

export class Judge {
  constructor({ fname, lname, id, default_notes }) {
    this.judge = `${fname} ${lname}`;
    this.default_notes = default_notes;
    this.id = id;
  }
}

export class CompetitionGroup {
  constructor({ name, id }) {
    this.competitionGroup = name;
    this.id = id;
  }
}

export class Score {
  constructor({
    competitionGroup,
    currentRoutine,
    currentEvent,
    tourDateId,
    currentJudge,
    finalNote,
    score,
    not_friendly,
    i_choreographed,
    position,
    teacherJudge,
    is_coda,
    buttons,
    strongest_level_1_id,
    weakest_level_1_id,
  }) {
    this.isTabulator = false;
    this.competition_group_id = competitionGroup;
    this.date_routine_id = currentRoutine.date_routine_id;
    this.event_id = currentEvent.id;
    this.tour_date_id = tourDateId;
    this.data = {
      online_scoring_id: currentRoutine.online_scoring_id,
      staff_id: currentJudge,
      note: finalNote,
      score,
      not_friendly,
      i_choreographed,
      position,
      teacher_critique: teacherJudge,
      is_coda,
      buttons,
      strongest_level_1_id,
      weakest_level_1_id,
    };
  }
}

export class Input {
  constructor(input) {
    this.id = input.id;
    this.tourDateId = formatTourDate(input);
  }
}
