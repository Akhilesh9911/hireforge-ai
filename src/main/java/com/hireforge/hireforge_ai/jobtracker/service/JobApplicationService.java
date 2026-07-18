package com.hireforge.hireforge_ai.jobtracker.service;

import com.hireforge.hireforge_ai.jobtracker.dto.JobApplicationRequest;
import com.hireforge.hireforge_ai.jobtracker.dto.JobApplicationResponse;
import com.hireforge.hireforge_ai.jobtracker.entity.JobApplication;
import com.hireforge.hireforge_ai.jobtracker.repository.JobApplicationRepository;
import com.hireforge.hireforge_ai.user.entity.User;
import com.hireforge.hireforge_ai.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public JobApplicationResponse addApplication(JobApplicationRequest request) {
        User currentUser = getCurrentUser();

        JobApplication application = new JobApplication();
        application.setCompanyName(request.getCompanyName());
        application.setJobTitle(request.getJobTitle());
        application.setStatus(request.getStatus());
        application.setAppliedDate(request.getAppliedDate());
        application.setNotes(request.getNotes());
        application.setUser(currentUser);

        JobApplication saved = jobApplicationRepository.save(application);
        return toResponse(saved);
    }

    public List<JobApplicationResponse> getAllApplications() {
        User currentUser = getCurrentUser();
        return jobApplicationRepository.findByUser(currentUser)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public JobApplicationResponse updateStatus(Long id, JobApplication.ApplicationStatus newStatus) {
        User currentUser = getCurrentUser();

        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized: This application does not belong to you");
        }

        application.setStatus(newStatus);
        JobApplication updated = jobApplicationRepository.save(application);
        return toResponse(updated);
    }

    public void deleteApplication(Long id) {
        User currentUser = getCurrentUser();

        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized: This application does not belong to you");
        }

        jobApplicationRepository.delete(application);
    }

    private JobApplicationResponse toResponse(JobApplication application) {
        return new JobApplicationResponse(
                application.getId(),
                application.getCompanyName(),
                application.getJobTitle(),
                application.getStatus(),
                application.getAppliedDate(),
                application.getNotes()
        );
    }
}