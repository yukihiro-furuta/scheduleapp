package com.scheduleapp.service;

import com.scheduleapp.dto.EventRequest;
import com.scheduleapp.dto.EventResponse;
import com.scheduleapp.entity.Event;
import com.scheduleapp.entity.EventStatus;
import com.scheduleapp.exception.EventNotFoundException;
import com.scheduleapp.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.YearMonth;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class EventService {

    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public List<EventResponse> findAll(String status, String month) {
        List<Event> events;

        if (status != null && month != null) {
            EventStatus s = EventStatus.fromDbValue(status);
            YearMonth ym = YearMonth.parse(month);
            events = repository.findByStartDateBetweenAndStatus(ym.atDay(1), ym.atEndOfMonth(), s);
        } else if (status != null) {
            events = repository.findByStatus(EventStatus.fromDbValue(status));
        } else if (month != null) {
            YearMonth ym = YearMonth.parse(month);
            events = repository.findByStartDateBetween(ym.atDay(1), ym.atEndOfMonth());
        } else {
            events = repository.findAll();
        }

        return events.stream().map(EventResponse::from).collect(Collectors.toList());
    }

    public EventResponse findById(UUID id) {
        return EventResponse.from(repository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id)));
    }

    @Transactional
    public EventResponse create(EventRequest request) {
        return EventResponse.from(repository.save(toEntity(request)));
    }

    @Transactional
    public EventResponse update(UUID id, EventRequest request) {
        Event event = repository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        applyRequest(event, request);
        return EventResponse.from(repository.save(event));
    }

    @Transactional
    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new EventNotFoundException(id);
        }
        repository.deleteById(id);
    }

    private Event toEntity(EventRequest req) {
        Event e = new Event();
        applyRequest(e, req);
        return e;
    }

    private void applyRequest(Event e, EventRequest req) {
        e.setTitle(req.getTitle());
        e.setDescription(req.getDescription());
        e.setStartDate(req.getStartDate());
        e.setEndDate(req.getEndDate());
        e.setStartTime(req.getStartTime());
        e.setEndTime(req.getEndTime());
        e.setStatus(req.getStatus());
    }
}
