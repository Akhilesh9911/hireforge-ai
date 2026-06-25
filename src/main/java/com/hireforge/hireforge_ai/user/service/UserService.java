package com.hireforge.hireforge_ai.user.service;

import com.hireforge.hireforge_ai.security.JwtUtil;
import com.hireforge.hireforge_ai.user.dto.RegisterRequest;
import com.hireforge.hireforge_ai.user.dto.RegisterResponse;
import com.hireforge.hireforge_ai.user.entity.User;
import com.hireforge.hireforge_ai.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public RegisterResponse register(RegisterRequest request){

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(newUser);

        String token = jwtUtil.generateToken(savedUser.getEmail());
        return new RegisterResponse(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), token);
    }
}
