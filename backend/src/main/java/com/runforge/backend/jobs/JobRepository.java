
package com.runforge.backend.jobs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, UUID> {

    List<JobEntity> findAllByOrderByCreatedAtDesc();

    Optional<JobEntity> findFirstByTypeAndStatusOrderByCreatedAtAsc(
            String type,
            JobStatus status
    );
}
