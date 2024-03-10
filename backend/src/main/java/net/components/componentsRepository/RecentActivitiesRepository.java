package net.components.componentsRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.components.RecentActivities;

@Repository
public interface RecentActivitiesRepository extends JpaRepository<RecentActivities, Long> {

}
