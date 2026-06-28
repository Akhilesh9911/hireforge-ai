package com.hireforge.hireforge_ai.resume.controller;

import com.hireforge.hireforge_ai.resume.service.ResumeService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;


    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file) throws IOException, java.io.IOException {
        String fileName = file.getOriginalFilename();
        String extractedText;

        if (fileName != null && fileName.toLowerCase().endsWith(".pdf")) {
            extractedText = resumeService.extractTextFromPdf(file);
        } else if (fileName != null && fileName.toLowerCase().endsWith(".docx")) {
            extractedText = resumeService.extractTextFromDocx(file);
        } else {
            return ResponseEntity.badRequest().body("Unsupported file type. Please upload PDF or DOCX.");
        }

        return ResponseEntity.ok(extractedText);
    }

}