package com.springapp.mvc.service;


import com.springapp.stream.form.UserForm;
import com.springapp.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService{

    void addUser(UserForm userForm);

    User getUserByEmail(final String email);

    User getUserByEmailAndPassword(final String email, final String password);
}
