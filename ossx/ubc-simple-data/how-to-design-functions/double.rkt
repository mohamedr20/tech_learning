#lang racket
(require lang/htdp-beginner)

; Problem:
; Design a function that takes in a number and produces twice that number
; Call your function double. Follow the HDTP recipe and show the stub and
; test

;; Number -> Number
;; produce twice the given number

(check-expect (double 3) 6)
(check-expect (double 4) 8)

;;(define (double n) 0) ; this is the stub

(define (double n)
    (* 2 n))

(print (double 4))




