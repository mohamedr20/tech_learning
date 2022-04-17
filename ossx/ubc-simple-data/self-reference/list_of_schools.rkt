;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname list_of_schools) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; quidditch-starter.rkt

; 
; PROBLEM:
; 
; Imagine that you are designing a program that will keep track of
; your favorite Quidditch teams. (http://iqasport.org/).
; 
; Design a data definition to represent a list of Quidditch teams. 
;    



;; ListOfString is one of:
;; - empty
;; - (cons String ListOfString)

(define LOS1 empty)
(define LOS2 (cons "UBC" empty))
(define LOS3 (cons "UBC" (cons "Havard" empty)))
(define LOS4 (cons "Yale" (cons "Havard" empty)))

#;(define (fn-for-los los)
  (cond [(empty? los) (...)]
        [ else (first los)
               (fn-for-los (rest-los))]))

;; Template rules used:
;; - atomic non-distinct: empty
;; - compound: (cons String ListOfString)
;; - self-reference: (rest los) is ListOfString


; 
; PROBLEM:
; 
; We want to know whether your list of favorite Quidditch teams includes
; UBC! Design a function that consumes ListOfString and produces true if 
; the list includes "UBC".
; 


;; ListOfString -> Boolean
;; produce true if los includes "UBC"

;(define (contains-ubc? empty) false) ; stub

(check-expect (contains-ubc? LOS1) false)
(check-expect (contains-ubc? LOS2) true)
(check-expect (contains-ubc? LOS3) true)
(check-expect (contains-ubc? LOS4) false)

; <use template from ListOfString>

(define (contains-ubc? los)
  (cond [(empty? los) false]
        [else
         (if (string=? (first los) "UBC")
             true
             (contains-ubc? (rest los)))]))