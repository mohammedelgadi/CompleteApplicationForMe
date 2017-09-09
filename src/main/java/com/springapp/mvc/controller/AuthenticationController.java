package com.springapp.mvc.controller;


import com.springapp.form.UserForm;
import com.springapp.model.User;
import com.springapp.mvc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    UserService userService;


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginPage(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "authentification/login";
    }

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String getRegistrationPage(ModelMap model) {
        model.addAttribute("userForm", new UserForm());
        return "authentification/register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String addUser(@Valid final UserForm userForm) {
        userService.addUser(userForm);
        return "redirect:" + "/register";
    }
}
