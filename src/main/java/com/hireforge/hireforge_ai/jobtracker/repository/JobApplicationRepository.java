package com.hireforge.hireforge_ai.jobtracker.repository;

import com.hireforge.hireforge_ai.jobtracker.entity.JobApplication;
import com.hireforge.hireforge_ai.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByUser(User user);

}