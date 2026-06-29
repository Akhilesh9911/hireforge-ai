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
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    public String analyzeResume(String resumeText) {
        String prompt = "You are an ATS (Applicant Tracking System) expert. " +
                "Analyze the following resume and provide: " +
                "1. An ATS score out of 100. " +
                "2. A list of missing skills based on common industry requirements. " +
                "Resume text: " + resumeText;

        GeminiRequest.Part part = new GeminiRequest.Part(prompt);
        GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));
        GeminiRequest request = new GeminiRequest(List.of(content));

        GeminiResponse response = restClient.post()
                .uri(GEMINI_URL + "?key=" + apiKey)
                .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GeminiResponse.class);

        return response.getCandidates().get(0).getContent().getParts().get(0).getText();
    }

}