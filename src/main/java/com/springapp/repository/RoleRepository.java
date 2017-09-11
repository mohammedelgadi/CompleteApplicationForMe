/**
 * Copyright (c) 2010, vsc-technologies - www.voyages-sncf.com
 * All rights reserved.
 * <p>
 * Les presents codes sources sont proteges par le droit d'auteur et
 * sont la propriete exclusive de VSC Technologies.
 * Toute representation, reproduction, utilisation, exploitation, modification,
 * adaptation de ces codes sources sont strictement interdits en dehors
 * des autorisations formulees expressement par VSC Technologies,
 * sous peine de poursuites penales.
 * <p>
 * Usage of this software, in source or binary form, partly or in full, and of
 * any application developed with this software, is restricted to the
 * customer.s employees in accordance with the terms of the agreement signed
 * with VSC-technologies.
 */
package com.springapp.repository;

import com.springapp.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * User: MELGADI
 * Date: 11/09/2017
 */
@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByName(final String name);
}
