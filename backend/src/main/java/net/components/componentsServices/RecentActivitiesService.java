package net.components.componentsServices;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.components.RecentActivities;
import net.components.componentsRepository.RecentActivitiesRepository;

@Service
@RequiredArgsConstructor
public class RecentActivitiesService {

    private final RecentActivitiesRepository recentActivitiesRepository;

    public List<RecentActivities> getRecentActivites() {
        return recentActivitiesRepository.findAll();
    }

}
