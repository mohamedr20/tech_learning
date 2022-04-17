;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname countdown) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require 2htdp/image)
;; countdown-starter.rkt

; 
; PROBLEM:
; 
; Consider designing the system for controlling a New Year's Eve
; display. Design a data definition to represent the current state 
; of the countdown, which falls into one of three categories: 
; 
;  - not yet started
;  - from 10 to 1 seconds before midnight
;  - complete (Happy New Year!)
; 


;; Data Definition

;; Countdown is an Itemization and is one of:
;; - false
;; - Integer [1,10]
;; - "complete"
;; interp.
;; false means countdown has not started
;; Integer [1,10] means countdown is running and how many second
;; "complete" means countdown is over

(define CD1 false)
(define CD2 1)
(define CD3 10)
(define CD4 "complete")

(define (fn-for-countdown cd)
  (cond [(false? cd) (...)]
        [(and (number? cd) (>= cd 1) (<= cd 10))  (...)]
        [else "complete"]
        ))

;; Template rules used:
;; one of three cases:
;; - atomic distinct: false
;; - atomic non-distinct: Integer[1,10]
;; - atomic distinct: 'complete'


;; Functions:

;; Countdown -> Image
;; produce image of current state of countdown

;; Test

(check-expect (countdown-to-image CD1) (square 0 "solid" "white"))
(check-expect (countdown-to-image CD2) (square 5 "solid" "yellow"))
(check-expect (countdown-to-image CD3) (square 5 "solid" "yellow"))
(check-expect (countdown-to-image CD4) (square 5 "solid" "green"))

;; Implement
;; <template from Countdown data defintion>
(define (countdown-to-image cd)
  (cond [(false? cd) (square 0 "solid" "white")]
        [(and (number? cd) (>= cd 1) (<= cd 10))  (square 5 "solid" "yellow")]
        [else (square 5 "solid" "green")]
        ))