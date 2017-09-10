package com.springapp.mvc.service;


import com.springapp.form.model.UserForm;
import com.springapp.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserService{

    void addUser(UserForm userForm);

    User getUserByEmail(final String email);

    User getUserByEmailAndPassword(final String email, final String password);
}
