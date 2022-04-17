;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname cat_program) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; cat-starter.rkt

; 
; PROBLEM:
; 
; Use the How to Design Worlds recipe to design an interactive
; program in which a cat starts at the left edge of the display 
; and then walks across the screen to the right. When the cat
; reaches the right edge it should just keep going right off 
; the screen.
; 
; Once your design is complete revise it to add a new feature,
; which is that pressing the space key should cause the cat to
; go back to the left edge of the screen. When you do this, go
; all the way back to your domain analysis and incorporate the
; new feature.
; 
; To help you get started, here is a picture of a cat, which we
; have taken from the 2nd edition of the How to Design Programs 
; book on which this course is based.

(require 2htdp/image)
(require 2htdp/universe)

;; A cat that walks from left to right across the screen

;; Constants

(define SCREEN_HEIGHT 500)
(define SCREEN_WIDTH 800)
(define CAT_IMG .)
(define CAT_Y_POSITION (/ SCREEN_HEIGHT 2))
(define BACKGROUND_IMG (empty-scene SCREEN_WIDTH SCREEN_HEIGHT))
(define CAT_SPEED 10)



;; Data Definitions

;; Cat is Natural
;; interp. the position of the cat as it walks across the screen

(define CAT_1 0)
(define CAT_2 (/ SCREEN_WIDTH 2))
(define CAT_3 SCREEN_WIDTH)

#; (define (fn-for-cat c)
     (... c))

;; Template rules used:
;; - atomic non-distinct: Natural

;; Functions

;; Cat -> Cat
;; start the world with zero to initialize the cat's position

(define (main c)
  (big-bang c                   ; Cat
            (on-tick   move-cat)     ; Cat -> Cat
            (to-draw   render-cat) ; Cat -> Image
            (on-key reset-cat-program) ; Cat KeyEvent -> Cat
            (stop-when stop-cat-program?))) ; Cat -> Boolean 


;; Cat -> Cat
;; Move the cat x distance upon each tick
;; !!!

;; (define (move-cat c) 0) ;stub

(check-expect (move-cat 2) (+ 2 CAT_SPEED))
(check-expect (move-cat 3) (+ 3 CAT_SPEED))

; <use template from Cat data-defintion>
(define (move-cat c)
     (+ c CAT_SPEED))


;; Cat -> Image
;; render the cat on the background image
;; !!!

;;(define (render-cat c) BACKGROUND_IMG) ; stub

(check-expect (render-cat 4) (place-image CAT_IMG 4 CAT_Y_POSITION BACKGROUND_IMG))
(check-expect (render-cat 0) (place-image CAT_IMG 0 CAT_Y_POSITION BACKGROUND_IMG))
(check-expect (render-cat 100) (place-image CAT_IMG 100 CAT_Y_POSITION BACKGROUND_IMG))

;; <use template from Cat data-defintion>

(define (render-cat c)
     (place-image CAT_IMG c CAT_Y_POSITION BACKGROUND_IMG))


;; Cat KeyEvent -> Cat
;; interp. when pressing the space bar, reset cat position to zero

;(define (reset-cat-program 0 " ") 0) ; stub

(check-expect (reset-cat-program 10 "q") 10)
(check-expect (reset-cat-program 20 "a") 20)
(check-expect (reset-cat-program 100 " ") 0)
(check-expect (reset-cat-program 200 " ") 0)

(define (reset-cat-program c kevt)
  (cond [(key=? " " kevt) 0]
        [else c]))
 
;; Cat -> Boolean
;; interp. stop program when cat reaches end of the screen

;(define (stop-cat-program? c) false)

(check-expect (stop-cat-program? 100) false)
(check-expect (stop-cat-program? 0) false)
(check-expect (stop-cat-program? SCREEN_WIDTH) true)

; <use template from data defintion for Cat>
(define (stop-cat-program? c)
     (= c SCREEN_WIDTH))






  


