
package com.runforge.backend.jobs;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JobService {

    private final Map<UUID, JobResponse> jobs =
            new ConcurrentHashMap<>();

    public JobResponse createJob(JobRequest request) {
        UUID id = UUID.randomUUID();

        JobResponse job = new JobResponse(
                id,
                request.type(),
                request.payload(),
                JobStatus.QUEUED,
                Instant.now()
        );

        jobs.put(id, job);
        return job;
    }

    public JobResponse getJob(UUID id) {
        JobResponse job = jobs.get(id);

        if (job == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Job not found: " + id
            );
        }

        return job;
    }
    
public JobResponse updateStatus(UUID id, JobStatus newStatus) {
    JobResponse currentJob = getJob(id);

    boolean validTransition = switch (currentJob.status()) {
        case QUEUED -> newStatus == JobStatus.RUNNING;
        case RUNNING -> newStatus == JobStatus.COMPLETED
                || newStatus == JobStatus.FAILED;
        case COMPLETED, FAILED -> false;
    };

    if (!validTransition) {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Invalid job status transition: "
                        + currentJob.status() + " -> " + newStatus
        );
    }

    JobResponse updatedJob = new JobResponse(
            currentJob.id(),
            currentJob.type(),
            currentJob.payload(),
            newStatus,
            currentJob.createdAt()
    );

    jobs.put(id, updatedJob);
    return updatedJob;
}

}
