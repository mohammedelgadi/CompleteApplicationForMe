package com.springapp.mvc.controller;


import com.springapp.mvc.service.UserService;
import com.springapp.stream.form.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.security.Principal;

@Controller
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    UserService userService;


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginPage(Principal principal) {
        if (principal != null) {
            return "redirect:" + "/hello";
        }
        return "authentication/login";
    }

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String getRegistrationPage(Principal principal, ModelMap model) {
        if (principal != null) {
            return "redirect:" + "/hello";
        }
        model.addAttribute("userForm", new UserForm());
        return "authentication/register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String addUser(@Valid final UserForm userForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "authentication/register";
        }
        userService.addUser(userForm);
        return "redirect:" + "/register";
    }

}
