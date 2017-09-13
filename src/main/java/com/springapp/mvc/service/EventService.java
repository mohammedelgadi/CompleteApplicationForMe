package com.springapp.mvc.service;

import com.springapp.model.Event;
import com.springapp.model.User;
import com.springapp.stream.api.CalendarInputs;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface EventService {

    Event addEvent(Event event);

    List<Event> getEventsByUser(User user);

    List<Event> getUserCalendarEvents(final User user, final CalendarInputs inputs);

}
