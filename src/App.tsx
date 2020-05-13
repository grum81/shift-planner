import React, { Component, ChangeEvent, FormEvent } from 'react';
import FullCalendar from '@fullcalendar/react'  
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'

import './App.scss';

interface AppState {
  firstDayOfWeek: number,
  events: EventInput[],
  startDate: string
}

export default class App extends Component<{}, AppState> {

  calendarComponentRef= React.createRef<FullCalendar>()

  constructor(props: {}) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstDayOfWeek: 1,
      events: [],
      startDate: ''
    }
  }

  populateEvents(startDate: string) {
    const date = moment(startDate, 'YYYY-MM-DD');

    const shiftEvents: EventInput[] = [];

    if (date.isValid()) {
    console.log(date.format('YYYY-MM-DD'));

    shiftEvents.push({
        title: 'Offshore', 
        start: date.toDate(),
        end: date.add(3, 'w').toDate(),
        allDay: true,
        color: 'red'
      });

      shiftEvents.push({
        title: 'Home (4 weeks)', 
        start: date.toDate(),
        end: date.add(4, 'w').toDate(),
        allDay: true,
        color: 'green'
      });
      
      shiftEvents.push({
        title: 'Offshore', 
        start: date.toDate(),
        end: date.add(3, 'w').toDate(),
        allDay: true,
        color: 'red'
      });
      
      shiftEvents.push({
        title: 'Home (5 weeks)', 
        start: date.toDate(),
        end: date.add(5, 'w').toDate(),
        allDay: true,
        color: 'green'
      });
    }

    this.setState({
      ...this.state,
      events: shiftEvents
    });

  }  

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({startDate: event.target.value});
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.populateEvents(this.state.startDate)
  }

  render() {
    return (
      <div className="container"> 
        <div className="top">
          <form onSubmit={this.handleSubmit}>
            <label>
              Shift Pattern Start:
              <input id="shiftStartDate" type="date" value={this.state.startDate} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Update" />          
          </form>
        </div>  
        <div className="calendar"> 
          <FullCalendar 
            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin ]} 
            firstDay={this.state.firstDayOfWeek}
            events={this.state.events}
          />
        </div>
      </div>
    )
  }

}
