package com.karana.DailyNote.controller;

import com.karana.DailyNote.service.DiaryService;
import com.karana.DailyNote.model.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
    @Autowired
    private DiaryService diaryService;

    @GetMapping("/add")
    public Diary createDiary(@RequestBody Diary diary) {
        return diaryService.saveProduct(diary);
    }

    @GetMapping("/")
    public List<Diary> getAllDiary() {
        List<Diary> diaries = diaryService.findAll();
        System.out.println(diaries); // Debugging purpose
        return diaries;
    }


    @GetMapping("/getById/{id}")
    public Diary getDiaryById(@PathVariable int id) {
        return diaryService.findById(id);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Diary> updateDiary(@PathVariable int id, @RequestBody Diary updatedDiary) {
        try {
            Diary diary = diaryService.updateDiary(id, updatedDiary);
            return ResponseEntity.ok(diary);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @PostMapping("/add")
    public Diary addDiary(@RequestBody Diary diary) {
        return diaryService.saveProduct(diary);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDiary(@PathVariable int id) {
        diaryService.deleteProduct(id);
        return "Diary deleted";
    }
}
