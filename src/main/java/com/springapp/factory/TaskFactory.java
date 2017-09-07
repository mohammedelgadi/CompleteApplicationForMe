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
package com.springapp.factory;

import com.springapp.model.Task;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * User: MELGADI
 * Date: 07/09/2017
 */
@Component
public class TaskFactory {

    public Task getTask() {
        return new Task();
    }

    public List<Task> getTasks() {
        return Arrays.asList(new Task(), new Task(), new Task(), new Task());

    }
}
