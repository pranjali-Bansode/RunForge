package com.runforge.backend.email;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailSendingController {

    private final EmailSendingService emailSendingService;

    public EmailSendingController(
            EmailSendingService emailSendingService
    ) {
        this.emailSendingService = emailSendingService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendEmail(
            @Valid @RequestBody EmailSendRequest request
    ) {

        emailSendingService.sendEmail(request);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Email sent successfully!",
                        "recipient",
                        request.recipient()
                )
        );
    }
}