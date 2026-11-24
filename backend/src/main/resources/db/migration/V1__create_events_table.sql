CREATE TABLE events (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    start_date  DATE         NOT NULL,
    end_date    DATE,
    start_time  TIME,
    end_time    TIME,
    status      VARCHAR(12)  NOT NULL
                CHECK (status IN ('planned', 'in_progress', 'completed')),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_start_date ON events (start_date);
CREATE INDEX idx_events_status     ON events (status);
