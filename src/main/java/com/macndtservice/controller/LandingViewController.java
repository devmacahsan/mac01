package com.macndtservice.controller;

import com.macndtservice.services.LandingViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by muhammadahsan on 8/27/16.
 */
@RestController
@RequestMapping("/Home")
public class LandingViewController {

    @Autowired
    private LandingViewService landingViewService;

    @RequestMapping (method = RequestMethod.GET , produces = ("application/json"))
    public String landingViewInit() {return  landingViewService.landingViewInit();}

}
