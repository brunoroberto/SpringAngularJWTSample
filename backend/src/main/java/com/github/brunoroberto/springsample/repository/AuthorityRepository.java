package com.github.brunoroberto.springsample.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.github.brunoroberto.springsample.model.Authority;
import com.github.brunoroberto.springsample.model.AuthorityName;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

	Optional<Authority> findByName(AuthorityName name);
}
