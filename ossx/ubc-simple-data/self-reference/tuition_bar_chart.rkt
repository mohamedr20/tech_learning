;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname tuition_bar_chart) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; tuition-graph-starter.rkt  (just the problem statements)
(require 2htdp/image)
; 
; PROBLEM:
; 
; Eva is trying to decide where to go to university. One important factor for her is 
; tuition costs. Eva is a visual thinker, and has taken Systematic Program Design, 
; so she decides to design a program that will help her visualize the costs at 
; different schools. She decides to start simply, knowing she can revise her design
; later.
; 
; The information she has so far is the names of some schools as well as their 
; international student tuition costs. She would like to be able to represent that
; information in bar charts like this one:
; 
; 
;         .
;         
; (A) Design data definitions to represent the information Eva has.
; (B) Design a function that consumes information about schools and their
;     tuition and produces a bar chart.
; (C) Design a function that consumes information about schools and produces
;     the school with the lowest international student tuition.
; 


; Constants

(define BAR-COLOR "lightblue")
(define BAR-WIDTH 50)
(define FONT-SIZE 16)
(define FONT-COLOR "black")
(define HEIGHT 500)
(define WIDTH 800)
(define Y-SCALE 1/200)

; Data Definitions
(define-struct school (name tuition))
;; School is (make-school String Natural)
;; interp. the name of the school and the cost of tuition in USD

(define S1 (make-school "Havard" 40000))
(define S2 (make-school "Yale" 32000))
(define S3 (make-school "George Mason" 20000))

#; (define (fn-for-school s)
     (... (school-name s) ; String
          (school-tuition s) ; Natural
          ))

;; Template rules used:
;; - one of two cases:
;; - atomic non-distinct: String
;; - atomic non-distinct: Natural


;; ListOfSchool is one of:
;; - empty
;; - (cons School ListOfSchool)
;; interp. a list of schools

(define LOS1 empty)
(define LOS2 (cons S1 empty))
(define LOS3 (cons S1 (cons S2 empty)))

#; (define (fn-for-los los)
     (cond [(empty? los) (...)]
           [else (fn-for-school (first los))
                 (fn-for-los (rest los))]))

;; Template rules used:
;; - one of four cases;
;; - atomic non-distinct: empty
;; - compound: (cons School ListOfSchool)
;; - self-reference: (rest los) is ListOfSchool
;; - reference: (first los) is School

;; Functions

;; ListOfSchool -> Image
;; produce a bar chart showing names and tuitions of given schools




(check-expect (render-chart empty) (square 0 "solid" "white"))
(check-expect (render-chart (cons (make-school "S1" 8000) empty))
              (beside/align "bottom"
                            (overlay/align "center" "bottom"
                                           (rotate 90 (text "S1" FONT-SIZE FONT-COLOR))
                                           (rectangle BAR-WIDTH (* 8000 Y-SCALE) "outline" "black")
                                           (rectangle BAR-WIDTH (* 8000 Y-SCALE) "solid" BAR-COLOR))
                            (square 0 "solid" "white")))

(check-expect (render-chart (cons (make-school "S2" 12000) (cons (make-school "S1" 8000) empty)))
              (beside/align "bottom"
                            (overlay/align "center" "bottom"
                                           (rotate 90 (text "S2" FONT-SIZE FONT-COLOR))
                                           (rectangle BAR-WIDTH (* 12000 Y-SCALE) "outline" "black")
                                           (rectangle BAR-WIDTH (* 12000 Y-SCALE) "solid" BAR-COLOR))
                            (overlay/align "center" "bottom"
                                           (rotate 90 (text "S1" FONT-SIZE FONT-COLOR))
                                           (rectangle BAR-WIDTH (* 8000 Y-SCALE) "outline" "black")
                                           (rectangle BAR-WIDTH (* 8000 Y-SCALE) "solid" BAR-COLOR))
                            (square 0 "solid" "white")))
(define (render-chart los)
     (cond [(empty? los) (square 0 "solid" "white")]
           [else
            (beside/align "bottom" 
                  (render-bar (first los))
                  (render-chart (rest los)))]))

;; School -> Image
;; Create a bar given a school's information

(check-expect (render-bar (make-school "GMU" 20000))
                          (overlay/align "center" "bottom"
                                         (rotate 90 (text "GMU" FONT-SIZE FONT-COLOR))
                                         (rectangle BAR-WIDTH (* 20000 Y-SCALE) "outline" "black")
                                         (rectangle BAR-WIDTH (* 20000 Y-SCALE) "solid" BAR-COLOR)))
                             
(define (render-bar s)
  (overlay/align "center" "bottom"
                 (rotate 90 (text (school-name s) FONT-SIZE FONT-COLOR))
                 (rectangle BAR-WIDTH (* (school-tuition s) Y-SCALE) "outline" "black")
                 (rectangle BAR-WIDTH (* (school-tuition s) Y-SCALE) "solid" BAR-COLOR)))
