package com.hireforge.hireforge_ai.jobtracker.controller;

import com.hireforge.hireforge_ai.jobtracker.dto.JobApplicationRequest;
import com.hireforge.hireforge_ai.jobtracker.dto.JobApplicationResponse;
import com.hireforge.hireforge_ai.jobtracker.entity.JobApplication;
import com.hireforge.hireforge_ai.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> addApplication(
            @Valid @RequestBody JobApplicationRequest request) {
        return ResponseEntity.status(201).body(jobApplicationService.addApplication(request));
    }

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications() {
        return ResponseEntity.ok(jobApplicationService.getAllApplications());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<JobApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam JobApplication.ApplicationStatus status) {
        return ResponseEntity.ok(jobApplicationService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        jobApplicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

}