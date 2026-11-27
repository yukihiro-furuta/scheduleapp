package com.scheduleapp.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EventCategory {
    WORK, PRIVATE, OTHER;

    @JsonValue
    public String toDbValue() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static EventCategory fromDbValue(String value) {
        if (value == null) return OTHER;
        return switch (value.toLowerCase()) {
            case "work"    -> WORK;
            case "private" -> PRIVATE;
            default        -> OTHER;
        };
    }
}
