
package com.runforge.backend.jobs;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobResponse createJob(
            @Valid @RequestBody JobRequest request
    ) {
        return jobService.createJob(request);
    }

    @GetMapping("/{id}")
    public JobResponse getJob(@PathVariable UUID id) {
        return jobService.getJob(id);
    }

    @GetMapping
public java.util.List<JobResponse> getAllJobs() {
    return jobService.getAllJobs();
}
    
@PatchMapping("/{id}/status")
public JobResponse updateStatus(
        @PathVariable UUID id,
        @RequestParam JobStatus status
) {
    return jobService.updateStatus(id, status);
}

}
