
package com.runforge.backend.email;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class EmailGenerationService {

    private final JsonMapper objectMapper;
    private final RestClient restClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.model}")
    private String model;

   public EmailGenerationService(JsonMapper objectMapper) {
    this.objectMapper = objectMapper;
    this.restClient = RestClient.create();
}

    public EmailDraftResponse generateDraft(EmailDraftRequest request) {

        String prompt = """
        You are an expert professional email writing assistant.

        Write a COMPLETE, polished, ready-to-send professional email.

        Requirements:

        Recipient: %s
        Purpose: %s
        Tone: %s
        Additional instructions: %s

        Email writing rules:
        1. Write a meaningful and specific subject line.
        2. Start with an appropriate professional greeting.
        3. Write 3 to 5 well-developed paragraphs.
        4. Clearly explain the purpose of the email.
        5. Include relevant details based on the user's instructions.
        6. Maintain natural, human-like language.
        7. End with a professional closing.
        8. Do not use placeholders such as [Your Name].
        9. Never invent qualifications, experience or achievements.
        10. The email body should generally contain 150-250 words.
        11. Return the COMPLETE email, never use "..." or summaries.

        Return ONLY valid JSON with these two string fields:
        {
          "subject": "Complete email subject",
          "body": "Complete email body"
        }

        Do not include Markdown code fences.
        """.formatted(
        request.recipient(),
        request.purpose(),
        request.tone(),
        request.additionalInstructions() == null
                ? "None"
                : request.additionalInstructions()
);
        String endpoint =
                "https://generativelanguage.googleapis.com/v1beta/models/"
                        + model + ":generateContent";

        Map<String, Object> geminiRequest = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", prompt)
                                }
                        )
                },
                "generationConfig", Map.of(
                        "responseMimeType", "application/json"
                )
        );

        try {
            JsonNode response = restClient.post()
                    .uri(endpoint)
                    .header("x-goog-api-key", apiKey)
                    .header("Content-Type", "application/json")
                    .body(geminiRequest)
                    .retrieve()
                    .body(JsonNode.class);

            if (response == null) {
                throw new IllegalStateException(
                        "Gemini returned an empty response."
                );
            }

            JsonNode candidates = response.path("candidates");

            if (!candidates.isArray() || candidates.isEmpty()) {
                throw new IllegalStateException(
                        "Gemini did not generate an email draft."
                );
            }

            String generatedText = candidates
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText("");

            if (generatedText.isBlank()) {
                throw new IllegalStateException(
                        "Generated email content is empty."
                );
            }

            JsonNode draft = objectMapper.readTree(generatedText);

            String subject = draft.path("subject").asText("");
            String body = draft.path("body").asText("");

            if (subject.isBlank() || body.isBlank()) {
                throw new IllegalStateException(
                        "Gemini returned an incomplete email draft."
                );
            }

            return new EmailDraftResponse(
                    request.recipient(),
                    subject,
                    body
            );

        } catch (RestClientResponseException ex) {
            System.err.println(
                    "Gemini API returned HTTP " + ex.getStatusCode()
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Email generation service returned an error."
            );

        } catch (Exception ex) {
            if (ex instanceof ResponseStatusException responseException) {
                throw responseException;
            }

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Unable to generate email draft."
            );
        }
    }
}
