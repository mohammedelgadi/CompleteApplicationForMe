package com.springapp.util.mapper;

import com.springapp.form.model.UserForm;
import com.springapp.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Mapper(imports = {BCryptPasswordEncoder.class})
public interface UserFormToUser {

    UserFormToUser INSTANCE = Mappers.getMapper(UserFormToUser.class);

    //@Mapping(target = "password",expression = "java(new BCryptPasswordEncoder().encode(userForm.getPassword()))")
    User userFormToUser(final UserForm userForm);
}
