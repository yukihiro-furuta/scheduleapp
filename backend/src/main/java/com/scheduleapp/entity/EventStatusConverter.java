package com.scheduleapp.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EventStatusConverter implements AttributeConverter<EventStatus, String> {

    @Override
    public String convertToDatabaseColumn(EventStatus attribute) {
        return attribute == null ? null : attribute.toDbValue();
    }

    @Override
    public EventStatus convertToEntityAttribute(String dbData) {
        return EventStatus.fromDbValue(dbData);
    }
}
