package com.hireforge.hireforge_ai.interview.controller;

import com.hireforge.hireforge_ai.interview.dto.InterviewResponse;
import com.hireforge.hireforge_ai.interview.service.InterviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping("/generate")
    public ResponseEntity<InterviewResponse> generateQuestions(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobRole") @NotBlank(message = "Job role is required") String jobRole
    ) throws IOException {
        InterviewResponse response = interviewService.generateQuestions(file, jobRole);
        return ResponseEntity.ok(response);
    }

}