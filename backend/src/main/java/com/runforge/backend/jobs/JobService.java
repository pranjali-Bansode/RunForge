
package com.runforge.backend.jobs;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

import java.time.Instant;
import java.util.UUID;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Transactional
    public JobResponse createJob(JobRequest request) {

        JobEntity entity = new JobEntity(
                UUID.randomUUID(),
                request.type(),
                request.payload(),
                JobStatus.QUEUED,
                Instant.now()
        );

        JobEntity savedJob = jobRepository.save(entity);

        return toResponse(savedJob);
    }

    @Transactional(readOnly = true)
    public JobResponse getJob(UUID id) {

        JobEntity job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Job not found: " + id
                        )
                );

        return toResponse(job);
    }

    @Transactional
    public JobResponse updateStatus(
            UUID id,
            JobStatus newStatus
    ) {

        JobEntity currentJob = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Job not found: " + id
                        )
                );

        boolean validTransition = switch (currentJob.getStatus()) {

            case QUEUED -> newStatus == JobStatus.RUNNING;

            case RUNNING ->
                    newStatus == JobStatus.COMPLETED
                    || newStatus == JobStatus.FAILED;

            case COMPLETED, FAILED -> false;
        };

        if (!validTransition) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Invalid job status transition: "
                            + currentJob.getStatus()
                            + " -> " + newStatus
            );
        }

        currentJob.setStatus(newStatus);

        JobEntity updatedJob = jobRepository.save(currentJob);

        return toResponse(updatedJob);
    }

@Transactional(readOnly = true)
public List<JobResponse> getAllJobs() {

    return jobRepository.findAllByOrderByCreatedAtDesc()
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
}

    private JobResponse toResponse(JobEntity job) {

        return new JobResponse(
                job.getId(),
                job.getType(),
                job.getPayload(),
                job.getStatus(),
                job.getCreatedAt()
        );
    }
}
