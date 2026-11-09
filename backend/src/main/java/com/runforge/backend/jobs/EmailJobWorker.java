
package com.runforge.backend.jobs;

import com.runforge.backend.email.EmailSendRequest;
import com.runforge.backend.email.EmailSendingService;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailJobWorker {

    private final JobRepository jobRepository;
    private final JobService jobService;
    private final EmailSendingService emailSendingService;

    public EmailJobWorker(
            JobRepository jobRepository,
            JobService jobService,
            EmailSendingService emailSendingService
    ) {
        this.jobRepository = jobRepository;
        this.jobService = jobService;
        this.emailSendingService = emailSendingService;
    }

    @Scheduled(fixedDelay = 5000)
    public void processEmailJobs() {

        var optionalJob =
                jobRepository.findFirstByTypeAndStatusOrderByCreatedAtAsc(
                        "SEND_EMAIL",
                        JobStatus.QUEUED
                );

        if (optionalJob.isEmpty()) {
            return;
        }

        JobEntity job = optionalJob.get();

        try {
            // Mark job as running
            jobService.updateStatus(
                    job.getId(),
                    JobStatus.RUNNING
            );

            var payload = job.getPayload();

            String recipient = (String) payload.get("recipient");
            String subject = (String) payload.get("subject");
            String body = (String) payload.get("message");

            EmailSendRequest request =
                    new EmailSendRequest(recipient, subject, body);

            // Send actual email
            emailSendingService.sendEmail(request);

            // Mark job completed
            jobService.updateStatus(
                    job.getId(),
                    JobStatus.COMPLETED
            );

        } catch (Exception exception) {

            System.err.println(
                    "Email job failed: " + job.getId()
                            + " - " + exception.getMessage()
            );

            try {
                if (jobService.getJob(job.getId()).status()
                        == JobStatus.RUNNING) {
                    jobService.updateStatus(
                            job.getId(),
                            JobStatus.FAILED
                    );
                }
            } catch (Exception statusException) {
                System.err.println(
                        "Could not update failed job status: "
                                + statusException.getMessage()
                );
            }
        }
    }
}
