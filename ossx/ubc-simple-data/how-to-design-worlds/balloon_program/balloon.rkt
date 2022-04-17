;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname balloon) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; water-balloon-starter.rkt

; PROBLEM:
; 
; In this problem, we will design an animation of throwing a water balloon.  
; When the program starts the water balloon should appear on the left side 
; of the screen, half-way up.  Since the balloon was thrown, it should 
; fly across the screen, rotating in a clockwise fashion. Pressing the 
; space key should cause the program to start over with the water balloon
; back at the left side of the screen. 
; 
; NOTE: Please include your domain analysis at the top in a comment box. 
; 
; Use the following images to assist you with your domain analysis:
; 
; 
; 1)
; 2).
; .
; 3)
; .
; 4)
; 
; .
;     
; 
; Here is an image of the water balloon:
; (define WATER-BALLOON.)
; 
; 
; 
; NOTE: The rotate function wants an angle in degrees as its first 
; argument. By that it means Number[0, 360). As time goes by your balloon 
; may end up spinning more than once, for example, you may get to a point 
; where it has spun 362 degrees, which rotate won't accept. 
; 
; The solution to that is to use the modulo function as follows:
; 
; (rotate (modulo ... 360) (text "hello" 30 "black"))
; 
; where ... should be replaced by the number of degrees to rotate.
; 
; NOTE: It is possible to design this program with simple atomic data, 
; but we would like you to use compound data.


(require 2htdp/image)
(require 2htdp/universe)

;; Constants

(define BALLOON_IMG .)
(define HEIGHT 500)
(define WIDTH 800)
(define CTR_Y (/ HEIGHT 2))
(define SPEED 1)
(define ANGULAR_SPEED 20)
(define BACKGROUND (empty-scene WIDTH HEIGHT))

;; Data definitions

(define-struct balloon (x deg))
;; Balloon is (make-balloon Number Number[0, 360)
;; interp. the balloon at it's current position (x)
;; the balloon's current degree of rotation (deg)

(define BALLOON_1 (make-balloon 10 3))
(define BALLOON_2 (make-balloon 50 300))

#; (define (fn-for-balloon b)
     (... (balloon-x b) ; Number
          (balloon-deg b))) ; Number [0, 360)

; Template rules used:
;; - compound: 2 fields
;;   - Number
;;   - Number [0, 360)

;; Functions

;; =================
;; Functions:

;; Balloon -> Balloon
;; start the world with (main (make-balloon (balloon-x b) (balloon-deg b))
;; 
(define (main b)
  (big-bang b                   ; Balloon
            (on-tick   move-balloon)   ; Balloon -> Balloon
            (to-draw   render-balloon)  ; Balloon -> Image
            (on-key    handle-key)))   ; Balloon KeyEvent -> Balloon

;; Balloon -> Balloon
;; interp. move the balloon across the screen for each second tick as well as well as rotate the ballon 

;(define (move-balloon b) 0) ; stub

(check-expect (move-balloon (make-balloon 1 12))
              (make-balloon (+ 1 SPEED) (- 12 ANGULAR_SPEED)))

(define (move-balloon b)
     (make-balloon (+ (balloon-x b) SPEED) (- (balloon-deg b) ANGULAR_SPEED)))

;; Balloon -> Image
;; interp. render the balloon at the appropriate place on the background

;(define (render-balloon b) BACKGROUND) ; stub

(check-expect (render-balloon (make-balloon 1 12))
              (place-image (rotate 12 BALLOON_IMG) 1 CTR_Y BACKGROUND))
(check-expect (render-balloon (make-balloon 10 30))
              (place-image (rotate 30 BALLOON_IMG) 10 CTR_Y BACKGROUND))

(define (render-balloon b)
  (place-image (rotate(modulo (balloon-deg b) 360)BALLOON_IMG)
               (balloon-x b)
               CTR_Y BACKGROUND))
;; Balloon KeyEvent -> Balloon
;; interp. reset the balloon to initial position when user press space bar

;(define (handle-key b key) 0)

(check-expect (handle-key (make-balloon 50 30) " ") (make-balloon 0 30))
(check-expect (handle-key (make-balloon 50 30) "a") (make-balloon 50 30))

(define (handle-key b ke)
  (cond [(key=? ke " ") (make-balloon 0 (balloon-deg b))]
        [else (make-balloon (balloon-x b) (balloon-deg b))]))

(main (make-balloon 150 0))

