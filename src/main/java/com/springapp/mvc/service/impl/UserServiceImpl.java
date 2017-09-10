package com.springapp.mvc.service.impl;


import com.springapp.form.model.UserForm;
import com.springapp.model.User;
import com.springapp.mvc.service.UserService;
import com.springapp.repository.UserRepository;
import com.springapp.util.mapper.UserFormToUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    @Qualifier("encrypter")
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void addUser(UserForm userForm) {

        User user = UserFormToUser.INSTANCE.userFormToUser(userForm);

        user.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));

        if (user != null) {
            userRepository.save(user);
        }
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) {
        return userRepository.findUserByEmailAndPassword(email, password);
    }
}
