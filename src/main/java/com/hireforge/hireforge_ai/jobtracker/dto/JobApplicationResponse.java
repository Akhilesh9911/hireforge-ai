package com.hireforge.hireforge_ai.jobtracker.dto;

import com.hireforge.hireforge_ai.jobtracker.entity.JobApplication.ApplicationStatus;

import java.time.LocalDate;

public class JobApplicationResponse {

    private Long id;
    private String companyName;
    private String jobTitle;
    private ApplicationStatus status;
    private LocalDate appliedDate;
    private String notes;

    public JobApplicationResponse(Long id, String companyName, String jobTitle,
                                  ApplicationStatus status, LocalDate appliedDate,
                                  String notes) {
        this.id = id;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.status = status;
        this.appliedDate = appliedDate;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public String getNotes() {
        return notes;
    }
}