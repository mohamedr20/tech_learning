;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname city-name) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; city-name-starter.rkt

; 
; PROBLEM:
; 
; Imagine that you are designing a program that, among other things, 
; has information about the names of cities in its problem domain.
; 
; Design a data definition to represent the name of a city. 
;    


;; Data definitions:

;; CityName is a String
;; interp. the name of a city

(define CN1 "Boston")
(define CN2 "Miami")

(define (fn-for-city-name cn)
  (... cn))

;; Template rules used:
;; - atomic non-distinct: String


; PROBLEM:
; 
; Using the CityName data definition below design a function
; that produces true if the given city is the best in the world. 
; (You are free to decide for yourself which is the best city 
; in the world.)
; 


;; Functions:

;; CityName -> Boolean
;; product true if the given city is the best in the world

; Stub
;;(define (best? cn) false)

;; Test

(check-expect (best? "Vancouver") false)
(check-expect (best? "DC") true)
(check-expect (best? "Miami") false)

(define (best? cn)(string=? cn "DC"))



              
