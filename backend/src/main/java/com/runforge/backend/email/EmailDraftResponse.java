
package com.runforge.backend.email;

public record EmailDraftResponse(
        String recipient,
        String subject,
        String body
) {}
