package com.hireforge.hireforge_ai.user.repository;

import com.hireforge.hireforge_ai.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
