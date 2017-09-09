package com.springapp.util.mapper;

import com.springapp.form.UserForm;
import com.springapp.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserFormToUser {

    UserFormToUser INSTANCE = Mappers.getMapper(UserFormToUser.class);

    User userFormToUser(final UserForm userForm);
}
