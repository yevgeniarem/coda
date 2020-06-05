// eslint-disable-next-line import/prefer-default-export
export class Event {
  constructor(event) {
    this.id = event.id;
    this.name = event.name;
    this.seasonId = event.current_season_id;
  }
}
