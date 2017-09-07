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
package com.springapp.mvc;

import com.springapp.factory.UserFactory;
import com.springapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * User: MELGADI
 * Date: 07/09/2017
 */
@Controller
public class UserController {

    @Autowired
    UserFactory userFactory;

    @RequestMapping(value = "/user",method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
    @ResponseBody
    public User getUser(ModelMap model) {
        return userFactory.getUser();
    }


    @RequestMapping(value = "/users",method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
    @ResponseBody
    public List<User> getUsers(ModelMap model) {
        return userFactory.getUsers();
    }

}
