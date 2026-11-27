ALTER TABLE events
    ADD COLUMN category VARCHAR(10) NOT NULL DEFAULT 'other'
        CHECK (category IN ('work', 'private', 'other'));

CREATE INDEX idx_events_category ON events (category);

UPDATE events SET category = 'other' WHERE category IS NULL;
