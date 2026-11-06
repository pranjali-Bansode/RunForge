package com.runforge.backend.jobs;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private JobService jobService;

    @Test
    void shouldCreateJobWithQueuedStatus() {
        JobRequest request = new JobRequest(
                "SEND_EMAIL",
                Map.of("recipient", "demo@example.com")
        );

        when(jobRepository.save(any(JobEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        JobResponse job = jobService.createJob(request);

        assertNotNull(job.id());
        assertEquals("SEND_EMAIL", job.type());
        assertEquals(JobStatus.QUEUED, job.status());
        assertEquals("demo@example.com", job.payload().get("recipient"));
        assertNotNull(job.createdAt());

        verify(jobRepository).save(any(JobEntity.class));
    }

    @Test
    void shouldRetrieveExistingJob() {
        UUID id = UUID.randomUUID();

        JobEntity entity = new JobEntity(
                id,
                "SEND_EMAIL",
                Map.of("recipient", "demo@example.com"),
                JobStatus.QUEUED,
                Instant.now()
        );

        when(jobRepository.findById(id)).thenReturn(Optional.of(entity));

        JobResponse retrieved = jobService.getJob(id);

        assertEquals(id, retrieved.id());
        assertEquals("SEND_EMAIL", retrieved.type());
        assertEquals(JobStatus.QUEUED, retrieved.status());
    }

    @Test
    void shouldUpdateJobStatus() {
        UUID id = UUID.randomUUID();

        JobEntity entity = new JobEntity(
                id,
                "SEND_EMAIL",
                Map.of("recipient", "demo@example.com"),
                JobStatus.QUEUED,
                Instant.now()
        );

        when(jobRepository.findById(id)).thenReturn(Optional.of(entity));
        when(jobRepository.save(any(JobEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        JobResponse updated = jobService.updateStatus(id, JobStatus.RUNNING);

        assertEquals(JobStatus.RUNNING, updated.status());
        verify(jobRepository).save(entity);
    }

    @Test
    void shouldThrowNotFoundForUnknownJob() {
        UUID unknownId = UUID.randomUUID();

        when(jobRepository.findById(unknownId)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> jobService.getJob(unknownId)
        );

        assertEquals(404, exception.getStatusCode().value());
    }

    @Test
    void shouldRejectInvalidStatusTransition() {
        UUID id = UUID.randomUUID();

        JobEntity entity = new JobEntity(
                id,
                "SEND_EMAIL",
                Map.of("recipient", "demo@example.com"),
                JobStatus.QUEUED,
                Instant.now()
        );

        when(jobRepository.findById(id)).thenReturn(Optional.of(entity));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> jobService.updateStatus(id, JobStatus.COMPLETED)
        );

        assertEquals(409, exception.getStatusCode().value());
        verify(jobRepository, never()).save(any(JobEntity.class));
    }
}