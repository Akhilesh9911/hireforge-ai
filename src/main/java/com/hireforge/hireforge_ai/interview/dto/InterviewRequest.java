package com.hireforge.hireforge_ai.interview.dto;

import jakarta.validation.constraints.NotBlank;

public class InterviewRequest {

    @NotBlank(message = "Job role is required")
    private String jobRole;

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

}