package com.springapp.mvc.service.impl;

import com.springapp.model.Event;
import com.springapp.model.User;
import com.springapp.mvc.service.EventService;
import com.springapp.repository.EventRepository;
import com.springapp.stream.api.CalendarInputs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getEventsByUser(User user) {
        return eventRepository.findAllByUser(user);
    }

    @Override
    public List<Event> getUserCalendarEvents(User user, CalendarInputs inputs) {
        return eventRepository.findAllByUserAndStartAfterAndEndBefore(user, inputs.getStart(), inputs.getEnd());
    }
}
