package com.springapp.mvc.service.impl;


import com.springapp.form.UserForm;
import com.springapp.model.User;
import com.springapp.mvc.service.UserService;
import com.springapp.repository.UserRepository;
import com.springapp.util.mapper.UserFormToUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public void addUser(UserForm userForm) {
        User user = UserFormToUser.INSTANCE.userFormToUser(userForm);
        if (user != null) {
            userRepository.save(user);
        }
    }
}
