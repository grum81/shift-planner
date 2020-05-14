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
  startDate: string,
  pattern: string
}

export default class App extends Component<{}, AppState> {

  calendarComponentRef= React.createRef<FullCalendar>()

  constructor(props: {}) {
    super(props);
    
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handlePatternChange = this.handlePatternChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const lsStartDate = localStorage.getItem('startDate');
    const lsPattern = localStorage.getItem('pattern');
    const lsEvents = localStorage.getItem('events');

    this.state = {
      firstDayOfWeek: 1,
      events: lsEvents ? JSON.parse(lsEvents) : [],
      startDate: lsStartDate ? lsStartDate : '',
      pattern: lsPattern ? lsPattern : '3534'
    }
  }

  populateEvents(startDate: string, pattern: string) {
    const date = moment(startDate, 'YYYY-MM-DD');

    const shiftEvents: EventInput[] = [];

    console.log('Pattern:' + pattern);

    if (date.isValid()) {

      if (pattern === '3435') {        
        shiftEvents.push(
          {
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
          }
        );
      } else if (pattern === '3534') {        
        shiftEvents.push(
          {
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
            title: 'Home (5 weeks)', 
            allDay: true,
            color: 'green',
            rrule: {
              freq: 'weekly',
              interval: 15,
              dtstart: date.add(3, 'w').toISOString(),
            },
            duration: { weeks: 5 }
          },
          {
            title: 'Offshore', 
            allDay: true,
            color: 'red',
            rrule: {
              freq: 'weekly',
              interval: 15,
              dtstart: date.add(5, 'w').toISOString(),
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
          }
        );
      }
  }

    this.setState({
      ...this.state,
      events: shiftEvents
    });
    
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('pattern', pattern);
    localStorage.setItem('events', JSON.stringify(shiftEvents))
  }

  handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {   
    const startDate = event.target.value;
    this.setState({ ...this.state, startDate: startDate });
  }

  handlePatternChange(event: ChangeEvent<HTMLSelectElement>) {   
    const pattern = event.target.value;
    this.setState({ ...this.state, pattern: pattern });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();

    this.populateEvents(this.state.startDate, this.state.pattern)
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
                <input id="shiftStartDate" type="date" className="form-control form-control-sm mb-2 date-input" value={this.state.startDate} onChange={this.handleStartDateChange} />
              </div>
              <div className="col-auto">                
                <label htmlFor="shiftPattern" className="sr-only">Example select</label>
                <select className="form-control form-control-sm mb-2" id="shiftPattern" value={this.state.pattern} onChange={this.handlePatternChange}>
                  <option value="3534">3/5, 3/4</option>
                  <option value="3435">3/4, 3/5</option>
                </select>
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
