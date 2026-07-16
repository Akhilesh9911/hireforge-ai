package com.hireforge.hireforge_ai.interview.dto;

public class InterviewResponse {

    private String jobRole;
    private String questions;

    public InterviewResponse(String jobRole, String questions) {
        this.jobRole = jobRole;
        this.questions = questions;
    }

    public String getJobRole() {
        return jobRole;
    }

    public String getQuestions() {
        return questions;
    }

}