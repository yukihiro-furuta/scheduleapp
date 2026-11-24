package com.scheduleapp.dto;

import com.scheduleapp.entity.Event;
import com.scheduleapp.entity.EventStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

public class EventResponse {

    private UUID id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private EventStatus status;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public static EventResponse from(Event e) {
        EventResponse r = new EventResponse();
        r.id = e.getId();
        r.title = e.getTitle();
        r.description = e.getDescription();
        r.startDate = e.getStartDate();
        r.endDate = e.getEndDate();
        r.startTime = e.getStartTime();
        r.endTime = e.getEndTime();
        r.status = e.getStatus();
        r.createdAt = e.getCreatedAt();
        r.updatedAt = e.getUpdatedAt();
        return r;
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public EventStatus getStatus() { return status; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
