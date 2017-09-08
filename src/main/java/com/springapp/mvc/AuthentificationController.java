package com.springapp.mvc;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/auth")
public class AuthentificationController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginPage(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "authentification/login";
    }

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String getRegistrationPage(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "authentification/register";
    }
}
