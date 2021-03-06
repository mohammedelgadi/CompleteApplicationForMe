package com.springapp.repository;

import com.springapp.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    User findByEmail(final String email);

    User findUserByEmailAndPassword(final String email, final String password);
}
