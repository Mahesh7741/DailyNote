package com.karana.DailyNote.service;

import com.karana.DailyNote.model.Diary;
import com.karana.DailyNote.repo.DiaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {
    @Autowired
    private DiaryRepo repo;
    public Diary saveProduct(Diary diary) {
        return repo.save(diary);
    }

    public List<Diary> findAll() {
        return repo.findAll();
    }

    public Diary findById(int id) {
        return repo.findById(id).orElse(null);
    }
    public Diary updateDiary(int id, Diary updatedDiary) {
        Optional<Diary> existingDiary = repo.findById(id);
        if (existingDiary.isPresent()) {
            Diary diary = existingDiary.get();
            diary.setTitle(updatedDiary.getTitle());
            diary.setContent(updatedDiary.getContent());
            diary.setDate(updatedDiary.getDate());
            return repo.save(diary);
        } else {
            throw new RuntimeException("Diary entry not found with id: " + id);
        }
    }
    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
}
