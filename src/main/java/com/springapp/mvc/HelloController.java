package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HelloController {
    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "hello";
    }

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String gethello(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "website/index";
    }

    @RequestMapping(value = "/ajax/morris", method = RequestMethod.GET)
    public String getMorris(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "website/content/morris";
    }

    @RequestMapping(value = "/ajax/calendar", method = RequestMethod.GET)
    public String getCalendarPage(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "website/content/calendar";
    }

    @RequestMapping(value = "/ajax/widget", method = RequestMethod.GET)
    public String getWidgetPage(ModelMap model) {
        model.addAttribute("message", "Hello world!");
        return "website/content/widgets";
    }


}