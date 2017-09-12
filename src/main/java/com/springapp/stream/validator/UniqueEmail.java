package com.springapp.stream.validator;

import com.springapp.stream.validator.impl.UniqueEmailValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueEmailValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmail {
    String message() default "Email exist in database";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
