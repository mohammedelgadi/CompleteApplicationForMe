package com.springapp.util;

public enum  GenderEnum {

    MALE("male"),
    FEMALE("female"),
    UNKNOW("none");

    private String meaning;

    GenderEnum(String meaning) {
        this.meaning = meaning;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }
}
