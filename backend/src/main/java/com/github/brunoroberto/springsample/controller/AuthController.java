package com.github.brunoroberto.springsample.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.brunoroberto.springsample.model.Authority;
import com.github.brunoroberto.springsample.model.AuthorityName;
import com.github.brunoroberto.springsample.model.User;
import com.github.brunoroberto.springsample.model.api.Credential;
import com.github.brunoroberto.springsample.model.api.SignUpForm;
import com.github.brunoroberto.springsample.model.api.response.JwtResponse;
import com.github.brunoroberto.springsample.model.api.response.ResponseMessage;
import com.github.brunoroberto.springsample.repository.AuthorityRepository;
import com.github.brunoroberto.springsample.repository.UserRepository;
import com.github.brunoroberto.springsample.security.JwtProvider;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	AuthorityRepository authorityRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtProvider jwtProvider;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody Credential loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateJwtToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("There is another user using the same email"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("There is another user using the same username"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getEmail(), signUpRequest.getUsername(),
				encoder.encode(signUpRequest.getPassword()));

		Authority userAuthority = authorityRepository.findByName(AuthorityName.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Authority not found."));
		user.addAuthority(userAuthority);

		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully"), HttpStatus.OK);
	}

}
