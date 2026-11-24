package com.scheduleapp.repository;

import com.scheduleapp.entity.Event;
import com.scheduleapp.entity.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {

    List<Event> findByStatus(EventStatus status);

    List<Event> findByStartDateBetween(LocalDate start, LocalDate end);

    List<Event> findByStartDateBetweenAndStatus(LocalDate start, LocalDate end, EventStatus status);
}
