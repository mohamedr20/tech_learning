;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-intermediate-reader.ss" "lang")((modname concat) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; concat-starter.rkt

; Problem:
; 
; Given the data definition below, design a function called concat that
; consumes two ListOfString and produces a single list with all the elements 
; of lsta preceding lstb.
; 
; (concat (list "a" "b" ...) (list "x" "y" ...)) should produce:
; 
; (list "a" "b" ... "x" "y" ...)
; 
; You are basically going to design the function append using a cross product 
; of type comments table. Be sure to simplify your design as much as possible. 
; 
; Hint: Think carefully about the values of both lists. You might see a way to 
; change a cell's content so that 2 cells have the same value.
; 


;; =================
;; Data Definitions:

;; ListOfString is one of:
;;  - empty
;;  - (cons String ListOfString)
;; interp. a list of strings
(define LOS1 empty)
(define LOS2 (cons "a" (cons "b" empty)))

;; ==========
;; Functions:

; ListOfString ListOfString -> ListOfString
;; Produce a list of strings, where the list elements are arranged in a way
;; where the elements in los1 are first and the los2 elements are second

; CROSS PRODUCT OF TYPE COMMENTS TABLE  
; 
;       los2                   empty                        (cons String ListOfString)
;   los1       
; empty                        los1                          los2  
;  
; (cons String ListOfString)   los1                         (cons (first a)
; a                                                          (concat (rest a) b))
;                                        
; NOTE: The l2 in the upper left corner of the table was originally
;       empty. But then the table had no simplifications. Thinking
;       about the cases carefully leads to the conclusion that the
;       empty could be replaced by l2, since l2 is in fact empty
;       in that case. Now the table supports simplification.



(define (concact los1 los2) empty)

(check-expect (concat empty empty) empty)
(check-expect (concat (list "a" "b") empty) (list "a" "b"))
(check-expect (concat empty (list "d" "e")) (list "d" "e"))
(check-expect (concat (list "a" "b") (list "d" "e")) (list "a" "b" "d" "e"))


(define (concat los1 los2)
  (cond [(empty? los2) los1]
        [(empty? los1) los2]
        [
         else
         (cons (first los1) (concat (rest los1) los2))
         ]))

