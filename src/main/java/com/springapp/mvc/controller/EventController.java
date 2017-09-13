/**
 * Copyright (c) 2010, vsc-technologies - www.voyages-sncf.com
 * All rights reserved.
 * <p>
 * Les presents codes sources sont proteges par le droit d'auteur et
 * sont la propriete exclusive de VSC Technologies.
 * Toute representation, reproduction, utilisation, exploitation, modification,
 * adaptation de ces codes sources sont strictement interdits en dehors
 * des autorisations formulees expressement par VSC Technologies,
 * sous peine de poursuites penales.
 * <p>
 * Usage of this software, in source or binary form, partly or in full, and of
 * any application developed with this software, is restricted to the
 * customer.s employees in accordance with the terms of the agreement signed
 * with VSC-technologies.
 */
package com.springapp.mvc.controller;

import com.springapp.model.Event;
import com.springapp.model.User;
import com.springapp.mvc.service.EventService;
import com.springapp.mvc.service.UserService;
import com.springapp.mvc.service.impl.AuthenticationServiceImpl;
import com.springapp.stream.api.CalendarInputs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * User: MELGADI
 * Date: 12/09/2017
 */
@RestController
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationServiceImpl authenticationService;


    @RequestMapping(value = "/event/add", method = RequestMethod.POST, headers = "Accept=application/json")
    public Event addEvent(Event event) {
        event.setUser((User) authenticationService.getAuthentication().getPrincipal());
        return eventService.addEvent(event);
    }

    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public List<Event> getConnectedUserEvents(CalendarInputs calendarInputs) {

        User user = (User) authenticationService.getAuthentication().getPrincipal();
        return eventService.getUserCalendarEvents(user, calendarInputs);
    }
}
