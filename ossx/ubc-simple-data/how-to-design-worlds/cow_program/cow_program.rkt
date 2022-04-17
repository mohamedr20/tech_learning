;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname cow_program) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

; 
; PROBLEM:
; 
; As we learned in the cat world programs, cats have a mind of their own. When they 
; reach the edge they just keep walking out of the window.
; 
; Cows on the other hand are docile creatures. They stay inside the fence, walking
; back and forth nicely.
; 
; Design a world program with the following behaviour:
;    - A cow walks back and forth across the screen.
;    - When it gets to an edge it changes direction and goes back the other way
;    - When you start the program it should be possible to control how fast a
;      walker your cow is.
;    - Pressing space makes it change direction right away.
;    
; To help you here are two pictures of the right and left sides of a lovely cow that 
; was raised for us at Brown University.
; 
; .     .
; 
; Once your program works here is something you can try for fun. If you rotate the
; images of the cow slightly, and you vary the image you use as the cow moves, you
; can make it appear as if the cow is waddling as it walks across the screen.
; 
; Also, to make it look better, arrange for the cow to change direction when its
; nose hits the edge of the window, not the center of its body.
; 

(require 2htdp/image)
(require 2htdp/universe)

;; Purpose: A cow program that walks across screen and changes direction when it reaches end

;; Constants

(define WIDTH 800)
(define HEIGHT 500)
(define CTR_Y (/ HEIGHT 2))
(define BACKGROUND (empty-scene WIDTH HEIGHT))
(define RCOW .)
(define LCOW .)
(define COW_SPEED 1)


;; Data definitions

(define-struct cow (x dx))
;; Cow is (Natural[0, WIDTH], Integer)
;; interp. (make-cow x dx) is a cow with x coordinate x and x velocity dx
;;         the x is the center of the cow
;;         x  is in screen coordinates (pixels)
;;         dx is in pixels per tick

(define C1 (make-cow 10  3)) ; at 10, moving left -> right
(define C2 (make-cow 20 -4)) ; at 20, moving left <- right
#;
(define (fn-for-cow c)
  (... (cow-x c)    ;Natural[0, WIDTH]
       (cow-dx c))) ;Integer

;; Template rules used:
;;  - compound: 2 fields

;; Cow -> Cow
;; start the world with initial position of the cow
;; 
(define (main c)
  (big-bang c                   ; Cow
            (on-tick   move-cow)     ; Cow -> Cow
            (to-draw   render-cow)   ; Cow -> Image
            (on-key  handle-key)))   ; Cow KeyEvent -> Cow


;; Cow -> Cow
;; interp. increase cow x by dx, until it reaches edge, then change direction

;(define (move-cow 0) 0) ; stub

(check-expect (move-cow (make-cow 20 3)) (make-cow (+ 20 3) 3))
(check-expect (move-cow (make-cow 20 -3)) (make-cow (- 20 3) -3))

(check-expect (move-cow (make-cow (- WIDTH 3) 3)) (make-cow WIDTH 3))
(check-expect (move-cow (make-cow 3 -3)) (make-cow 0 -3))

(check-expect (move-cow (make-cow (- WIDTH 3) 4)) (make-cow WIDTH -4))
(check-expect (move-cow (make-cow 3 -4)) (make-cow 0 4))

; <use template from data defintion for Cow>
(define (move-cow c)
  (cond [(> (+ (cow-x c) (cow-dx c)) WIDTH) (make-cow WIDTH (- (cow-dx c)))]
        [(< (+ (cow-x c) (cow-dx c)) 0) (make-cow 0 (- (cow-dx c)))]
        [else (make-cow (+ (cow-x c) (cow-dx c)) (cow-dx c))]))


;; Cow -> Image
;; interp. render the cow at the right place on the background

;(define (render-cow c) BACKGROUND) ; stub


(check-expect (render-cow (make-cow 10 3)) (place-image RCOW 10 CTR_Y BACKGROUND))
(check-expect (render-cow (make-cow 10 -3)) (place-image LCOW 10 CTR_Y BACKGROUND))

(define (render-cow c)
  (place-image (choose-img c) (cow-x c) CTR_Y BACKGROUND))

;; Cow -> Image
;; Produce RCOW if cow dx is positive, else produce LCOW

;(define (choose-img c) BACKGROUND) ; stub

(check-expect (choose-img (make-cow 10 3)) RCOW)
(check-expect (choose-img (make-cow 10 -3)) LCOW)
(check-expect (choose-img (make-cow 11 0)) LCOW)

(define (choose-img c)
  (if (> (cow-dx c) 0)
      RCOW
      LCOW))

;; Cow KeyEvent -> Cow
;; interp. increase the cow speed based on it's direction

;(define (handle-key c ke) c)

(check-expect (handle-key (make-cow 10 3) " ") (make-cow 10 -3))
(check-expect (handle-key (make-cow 10 -3) " ") (make-cow 10 3))
(check-expect (handle-key (make-cow 10 3) "a") (make-cow 10 3))

(define (handle-key c ke)
  (cond [(key=? ke " ") (make-cow (cow-x c) (- (cow-dx c)))]
        [else 
         (make-cow (cow-x c) (cow-dx c))]))


(main (make-cow 10 3))

