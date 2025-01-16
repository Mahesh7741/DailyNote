package com.karana.DailyNote.repo;

import com.karana.DailyNote.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepo extends JpaRepository<Diary, Integer> {

}
