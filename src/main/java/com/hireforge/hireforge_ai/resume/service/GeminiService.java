package com.hireforge.hireforge_ai.resume.service;

import com.hireforge.hireforge_ai.resume.dto.GeminiRequest;
import com.hireforge.hireforge_ai.resume.dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

    public String analyzeResume(String resumeText) {
        String prompt = """
                You are an expert ATS (Applicant Tracking System) analyst and career coach.
                Analyze the resume below and return your response in EXACTLY this markdown format.
                Do NOT deviate from this structure. Do NOT add extra sections.

                ## ATS Score: [X]/100

                [One sentence explaining the score]

                ## Strengths

                1. **[Strength title]** — [Brief explanation]
                2. **[Strength title]** — [Brief explanation]
                3. **[Strength title]** — [Brief explanation]

                ## Areas for Improvement

                1. **[Area]** — [What to fix and why]
                2. **[Area]** — [What to fix and why]
                3. **[Area]** — [What to fix and why]

                ## Missing Skills (Based on Industry Standards)

                1. **[Skill]** — [Why it is important]
                2. **[Skill]** — [Why it is important]
                3. **[Skill]** — [Why it is important]
                4. **[Skill]** — [Why it is important]
                5. **[Skill]** — [Why it is important]

                ## Recommendations

                1. [Specific actionable recommendation]
                2. [Specific actionable recommendation]
                3. [Specific actionable recommendation]

                ---
                Resume:
                """ + resumeText;

        GeminiRequest.Part part = new GeminiRequest.Part(prompt);
        GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));
        GeminiRequest.GenerationConfig generationConfig = new GeminiRequest.GenerationConfig(0.2);
        GeminiRequest request = new GeminiRequest(List.of(content), generationConfig);

        GeminiResponse response = restClient.post()
                .uri(GEMINI_URL + "?key=" + apiKey)
                .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GeminiResponse.class);

        return response.getCandidates().get(0).getContent().getParts().get(0).getText();
    }
}
