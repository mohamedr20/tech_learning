;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname less-than-five) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; less-than-five-starter.rkt

; 
; PROBLEM:
; 
; DESIGN function that consumes a string and determines whether its length is
; less than 5.  Follow the HtDF recipe and leave behind commented out versions 
; of the stub and template.
; 


;; String -> Boolean
;; Takes in a string and if the string is less than 5, returns true

;; Stub
;; (define (less-than-five s) false)

;; Test

(check-expect (less-than-five? "Hello") false)
(check-expect (less-than-five? "Hi") true)
(check-expect (less-than-five? "Mohamed") false)

;; Template

(define (less-than-five? s)
  (< (string-length s) 5))



