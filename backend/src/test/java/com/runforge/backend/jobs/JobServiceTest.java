
package com.runforge.backend.jobs;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JobServiceTest {

    private JobService jobService;

    @BeforeEach
    void setUp() {
        jobService = new JobService();
    }

    @Test
    void shouldCreateJobWithQueuedStatus() {
        JobRequest request = new JobRequest(
                "SEND_EMAIL",
                Map.of("recipient", "demo@example.com")
        );

        JobResponse job = jobService.createJob(request);

        assertNotNull(job.id());
        assertEquals("SEND_EMAIL", job.type());
        assertEquals(JobStatus.QUEUED, job.status());
        assertEquals(
                "demo@example.com",
                job.payload().get("recipient")
        );
        assertNotNull(job.createdAt());
    }

    @Test
    void shouldRetrieveExistingJob() {
        JobRequest request = new JobRequest(
                "SEND_EMAIL",
                Map.of("recipient", "demo@example.com")
        );

        JobResponse created = jobService.createJob(request);

        JobResponse retrieved =
                jobService.getJob(created.id());

        assertEquals(created.id(), retrieved.id());
        assertEquals(created.type(), retrieved.type());
        assertEquals(created.status(), retrieved.status());
    }

    @Test
    void shouldThrowNotFoundForUnknownJob() {
        UUID unknownId = UUID.randomUUID();

        ResponseStatusException exception =
                assertThrows(
                        ResponseStatusException.class,
                        () -> jobService.getJob(unknownId)
                );

        assertEquals(404, exception.getStatusCode().value());
    }
}
