
package com.runforge.backend.jobs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record JobRequest(
        @NotBlank String type,
        @NotNull Map<String, Object> payload
) {}
