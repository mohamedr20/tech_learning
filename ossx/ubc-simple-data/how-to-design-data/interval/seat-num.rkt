;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname seat-num) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; seat-num-starter.rkt

; 
; PROBLEM:
; 
; Imagine that you are designing a program to manage ticket sales for a
; theatre. (Also imagine that the theatre is perfectly rectangular in shape!) 
; 
; Design a data definition to represent a seat number in a row, where each 
; row has 32 seats. (Just the seat number, not the row number.)
;  


;; SeatNum is an Integer [1, 32]
;; interp. seat numbers in the row, 1 & 32 are aisle seats

(define SN1 1) ; aisle
(define SN2 32) ; aisle
(define SN3 16) ; middle
(define SN4 33) ; aisle
(define SN5 0) ; middle

(define (fn-for-seat-num sn)
  ...)

;; Template rules used:
;; - atomic non-distinct: Integer [1,32]

;; Functions:

;  PROBLEM:
; 
; Using the SeatNum data definition design a function
; that products true if the given seat number is in the aisle.


;; Functions:

;; SeatNum -> Boolean
;; Return true if the seat num is an aisle seat, 1 or 32

; Stub
;; (define (check-seat sn) false)

(check-expect (check-seat? SN1) true)
(check-expect (check-seat? SN2) true)
(check-expect (check-seat? SN3) false)
(check-expect (check-seat? SN4) false)
(check-expect (check-seat? SN5) false)

;; Template
;; <taken from SeatNum data definition>


(define (check-seat? sn)
  (or (= sn 1)
      (= sn 32)))
