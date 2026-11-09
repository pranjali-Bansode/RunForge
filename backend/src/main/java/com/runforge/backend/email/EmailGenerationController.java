
package com.runforge.backend.email;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailGenerationController {

    private final EmailGenerationService emailGenerationService;

    public EmailGenerationController(
            EmailGenerationService emailGenerationService
    ) {
        this.emailGenerationService = emailGenerationService;
    }

    @PostMapping("/generate")
    public EmailDraftResponse generateEmail(
            @Valid @RequestBody EmailDraftRequest request
    ) {
        return emailGenerationService.generateDraft(request);
    }
}
