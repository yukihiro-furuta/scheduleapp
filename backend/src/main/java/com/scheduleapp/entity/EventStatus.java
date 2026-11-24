package com.scheduleapp.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EventStatus {
    PLANNED, IN_PROGRESS, COMPLETED;

    @JsonValue
    public String toDbValue() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static EventStatus fromDbValue(String value) {
        if (value == null) return null;
        return valueOf(value.toUpperCase());
    }
}
