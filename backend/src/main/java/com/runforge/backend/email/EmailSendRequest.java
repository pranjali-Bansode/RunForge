package com.runforge.backend.email;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailSendRequest(

        @NotBlank
        @Email
        String recipient,

        @NotBlank
        String subject,

        @NotBlank
        String body

) {}