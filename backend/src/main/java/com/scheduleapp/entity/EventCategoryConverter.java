package com.scheduleapp.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EventCategoryConverter implements AttributeConverter<EventCategory, String> {

    @Override
    public String convertToDatabaseColumn(EventCategory attribute) {
        return attribute == null ? "other" : attribute.toDbValue();
    }

    @Override
    public EventCategory convertToEntityAttribute(String dbData) {
        return EventCategory.fromDbValue(dbData);
    }
}
