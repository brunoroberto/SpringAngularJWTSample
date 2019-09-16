package com.github.brunoroberto.springsample.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.github.brunoroberto.springsample.model.User;
import com.github.brunoroberto.springsample.model.UserDetailsImp;
import com.github.brunoroberto.springsample.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final String USER_NOT_FOUND_MSG = "Cannot find a user with username = %s";

	@Autowired
	private UserRepository repository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> opUser = this.repository.findByUsername(username);
		if (!opUser.isPresent())
			throw new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, username));
		return UserDetailsImp.build(opUser.get());
	}

}
