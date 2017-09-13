package com.springapp.mvc.service;

import org.springframework.security.core.Authentication;

public interface IAuthenticationService {
    Authentication getAuthentication();
}
