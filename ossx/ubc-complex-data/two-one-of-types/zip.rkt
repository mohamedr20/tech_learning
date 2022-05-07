;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-intermediate-reader.ss" "lang")((modname zip) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; zip-starter.rkt

; Problem:
; 
; Given the data definition below, design a function called zip that consumes two
; lists of numbers and produces a list of Entry, formed from the corresponding 
; elements of the two lists.
; 
; (zip (list 1 2 ...) (list 11 12 ...)) should produce:
; 
; (list (make-entry 1 11) (make-entry 2 12) ...)
; 
; Your design should assume that the two lists have the same length.
; 


;; =================
;; Data Definitions:

(define-struct entry (k v))
;; Entry is (make-entry Number Number)
;; Interp. an entry maps a key to a value
(define E1 (make-entry 3 12))

;; ListOfEntry is one of:
;;  - empty
;;  - (cons Entry ListOfEntry)
;; interp. a list of key value entries
(define LOE1 (list E1 (make-entry 1 11)))

#;(define (fn-for-loe loe)
    (cond [(empty? loe) (...)]
          [else
           (... (fn-for-e (first loe)
                          (fn-for-loe (rest loe))))]))

;; ==========
;; Functions:

;; ListOfNumber ListOfNumber -> ListOfEntry
;; Consumes two lists of numbers and produces a list of Entry


;(define (zip lon1 lon2) empty)


(check-expect (zip empty empty) empty)
(check-expect (zip (list 1 2) (list 11 12))
              (list (make-entry 1 11) (make-entry 2 12)))

(check-expect (zip (list 1 2) (list 11 12)) (list (make-entry 1 11) (make-entry 2 12)))

; CROSS PRODUCT OF TYPE COMMENTS TABLE  
; 
;                                      LON2
;                                     empty        (cons Number ListOfNumber) 
; 
; L   empty                           empty          empty                       
; O
; N  (cons Number ListOfNumber)       empty       (cons (make-entry (first lon1)
;                                                                   (first lon2))
;                                                       (zip (rest lon1) (rest lon2)))
; 1                                             


(define (zip lon1 lon2)
  (cond [(empty? lon1) empty]
        [
         else
         (cons
          (make-entry (first lon1) (first lon2))
          (zip (rest lon1) (rest lon2)))
         ]))

