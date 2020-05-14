import React, { Component, ChangeEvent, FormEvent } from 'react';
import FullCalendar from '@fullcalendar/react'  
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import bootstrapPlugin from '@fullcalendar/bootstrap'
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

    const lsStartDate = localStorage.getItem('startDate');
    const lsEvents = localStorage.getItem('events');

    this.state = {
      firstDayOfWeek: 1,
      events: lsEvents ? JSON.parse(lsEvents) : [],
      startDate: lsStartDate ? lsStartDate : ''
    }
  }

  populateEvents(startDate: string) {
    const date = moment(startDate, 'YYYY-MM-DD');

    const shiftEvents: EventInput[] = [];

    if (date.isValid()) {
    console.log(date.format('YYYY-MM-DD'));
        
      shiftEvents.push({
          title: 'Offshore', 
          allDay: true,
          color: 'red',
          rrule: {
            freq: 'weekly',
            interval: 15,
            dtstart: date.toISOString(),
          },
          duration: { weeks: 3 }
        },{
          title: 'Home (4 weeks)', 
          allDay: true,
          color: 'green',
          rrule: {
            freq: 'weekly',
            interval: 15,
            dtstart: date.add(3, 'w').toISOString(),
          },
          duration: { weeks: 4 }
        },
        {
          title: 'Offshore', 
          allDay: true,
          color: 'red',
          rrule: {
            freq: 'weekly',
            interval: 15,
            dtstart: date.add(4, 'w').toISOString(),
          },
          duration: { weeks: 3 }
        },{
          title: 'Home (5 weeks)', 
          allDay: true,
          color: 'green',
          rrule: {
            freq: 'weekly',
            interval: 15,
            dtstart: date.add(3, 'w').toISOString(),
          },
          duration: { weeks: 5 }
        });
    }

    this.setState({
      ...this.state,
      events: shiftEvents
    });
    
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('events', JSON.stringify(shiftEvents))
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {   
    const startDate = event.target.value;
    this.setState({ ...this.state, startDate: startDate });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();

    this.populateEvents(this.state.startDate)
  }

  render() {
    return (
      <>
      <nav className="navbar navbar-light bg-light border-bottom shadow-sm">
        <div className="container">
          <span className="navbar-brand">
            <img src="/helicopter.svg" width="90" height="65" className="d-inline-block align-top" alt="" loading="lazy" />
            Shift Planner
          </span>
        </div>
      </nav>
        <div className="calendar-container">
          <div className="calendar">
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin, rrulePlugin, bootstrapPlugin ]} 
              firstDay={this.state.firstDayOfWeek}
              events={this.state.events}
              eventTextColor="white"
            />
          </div>
          <div className="bottom">
            <form className="form-row align-items-center" onSubmit={this.handleSubmit}>
              <div className="col-auto">
                <label htmlFor="shiftStartDate" className="form-label">Start Date:</label>
              </div>
              <div className="col-auto">
                <input id="shiftStartDate" type="date" className="form-control form-control-sm mb-2" value={this.state.startDate} onChange={this.handleChange} />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-outline-dark btn-sm mb-2">Update</button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }

}
