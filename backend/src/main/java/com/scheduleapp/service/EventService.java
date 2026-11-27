package com.scheduleapp.service;

import com.scheduleapp.dto.EventRequest;
import com.scheduleapp.dto.EventResponse;
import com.scheduleapp.entity.Event;
import com.scheduleapp.entity.EventCategory;
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

    public List<EventResponse> findAll(String status, String month, String category) {
        List<Event> events;

        EventStatus s = status != null ? EventStatus.fromDbValue(status) : null;
        EventCategory c = category != null ? EventCategory.fromDbValue(category) : null;

        if (s != null && c != null && month != null) {
            YearMonth ym = YearMonth.parse(month);
            events = repository.findByStartDateBetweenAndStatusAndCategory(ym.atDay(1), ym.atEndOfMonth(), s, c);
        } else if (s != null && c != null) {
            events = repository.findByStatusAndCategory(s, c);
        } else if (s != null && month != null) {
            YearMonth ym = YearMonth.parse(month);
            events = repository.findByStartDateBetweenAndStatus(ym.atDay(1), ym.atEndOfMonth(), s);
        } else if (c != null && month != null) {
            YearMonth ym = YearMonth.parse(month);
            events = repository.findByStartDateBetweenAndCategory(ym.atDay(1), ym.atEndOfMonth(), c);
        } else if (s != null) {
            events = repository.findByStatus(s);
        } else if (c != null) {
            events = repository.findByCategory(c);
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
        e.setCategory(req.getCategory() != null ? req.getCategory() : EventCategory.OTHER);
    }
}
