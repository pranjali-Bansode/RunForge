
package com.runforge.backend.email;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailDraftRequest(
        @NotBlank
        @Email
        String recipient,

        @NotBlank
        String purpose,

        @NotBlank
        String tone,

        String additionalInstructions
) {}
