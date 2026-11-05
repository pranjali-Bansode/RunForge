
package com.runforge.backend.jobs;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public record JobResponse(
        UUID id,
        String type,
        Map<String, Object> payload,
        JobStatus status,
        Instant createdAt
) {}
