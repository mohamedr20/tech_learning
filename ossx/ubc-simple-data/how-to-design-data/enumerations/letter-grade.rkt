;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname letter-grade) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; letter-grade-starter.rkt

; 
; PROBLEM:
; 
; As part of designing a system to keep track of student grades, you
; are asked to design a data definition to represent the letter grade 
; in a course, which is one of A, B or C.
;   


;; LetterGrade is one of:
;; - "A"
;; - "B"
;; - "C"
;; interp. the letter grade in a course
;; <examples are redundant for enumeration>

(define (fn-for-letter-grade lg)
  (cond [(string=? lg "A") (...)]
        [(string=? lg "B") (...)]
        [(string=? lg "C") (...)]
        [else (...)]))

;; Template rules used:
;; - one of: 3 cases
;; - atomic distinct values: "A"
;; - atomic distinct values: "B"
;; - atomic distinct values: "C"

;; Functions:

;; LetterGrade -> LetterGrade
;; product next highest letter grade (no change for A)

;; Test
(check-expect (bump-up "A") "A")
(check-expect (bump-up "B") "A")
(check-expect (bump-up "C") "B")

;; Implement
;; <taken from LetterGrade data defintion

(define (bump-up lg)
  (cond [(string=? lg "A") "A"]
        [(string=? lg "B") "A"]
        [(string=? lg "C") "B"]))