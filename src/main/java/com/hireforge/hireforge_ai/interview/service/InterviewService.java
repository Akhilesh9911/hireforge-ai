package com.hireforge.hireforge_ai.interview.service;

import com.hireforge.hireforge_ai.interview.dto.InterviewResponse;
import com.hireforge.hireforge_ai.resume.dto.GeminiRequest;
import com.hireforge.hireforge_ai.resume.dto.GeminiResponse;
import com.hireforge.hireforge_ai.resume.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class InterviewService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    @Autowired
    private ResumeService resumeService;

    public InterviewResponse generateQuestions(MultipartFile file, String jobRole) throws IOException {

        String resumeText = extractText(file);

        String prompt = "You are an expert technical interviewer with 10+ years of experience. " +
                "Based on the candidate's resume and the job role they are applying for, " +
                "generate 10 highly relevant interview questions. " +
                "Job Role: " + jobRole + ". " +
                "Include: " +
                "- 6 technical questions specific to the job role and candidate's skills " +
                "- 4 behavioral questions based on their experience " +
                "Format: Numbered list (1. 2. 3. etc). " +
                "Make questions specific to the candidate's background, not generic. " +
                "Resume: " + resumeText;

        GeminiRequest.Part part = new GeminiRequest.Part(prompt);
        GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));
        GeminiRequest.GenerationConfig config = new GeminiRequest.GenerationConfig(0.3);
        GeminiRequest request = new GeminiRequest(List.of(content), config);

        GeminiResponse response = restClient.post()
                .uri(GEMINI_URL + "?key=" + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GeminiResponse.class);

        String questions = response.getCandidates()
                .get(0).getContent().getParts().get(0).getText();

        return new InterviewResponse(jobRole, questions);
    }

    private String extractText(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.toLowerCase().endsWith(".pdf")) {
            return resumeService.extractTextFromPdf(file);
        } else if (fileName != null && fileName.toLowerCase().endsWith(".docx")) {
            return resumeService.extractTextFromDocx(file);
        } else {
            throw new RuntimeException("Unsupported file type. Please upload PDF or DOCX.");
        }
    }

}