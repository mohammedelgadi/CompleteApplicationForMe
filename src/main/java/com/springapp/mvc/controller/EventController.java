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
import com.springapp.repository.EventRepository;
import com.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * User: MELGADI
 * Date: 12/09/2017
 */
@RestController
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;


    @RequestMapping("/event")
    public List<Event> getListEvent() {
        User user = userRepository.findByEmail("mohelgadi@gmail.com");

        if (user != null) {
            Event event = new Event();
            event.setUser(user);
            eventRepository.save(event);
        }
        return eventRepository.findAll();
    }
}
