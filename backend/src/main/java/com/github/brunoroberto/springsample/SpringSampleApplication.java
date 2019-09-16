package com.github.brunoroberto.springsample;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.github.brunoroberto.springsample.model.Authority;
import com.github.brunoroberto.springsample.model.AuthorityName;
import com.github.brunoroberto.springsample.repository.AuthorityRepository;

@SpringBootApplication
public class SpringSampleApplication {

	@Autowired
	private AuthorityRepository authRepository;

	@Bean
	public CommandLineRunner run() throws Exception {
		return args -> {
			Optional<Authority> opAuth = this.authRepository.findByName(AuthorityName.ROLE_USER);
			if (opAuth == null || !opAuth.isPresent()) {
				Authority userAuthority = new Authority(AuthorityName.ROLE_USER);
				this.authRepository.save(userAuthority);
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringSampleApplication.class, args);
	}

}
