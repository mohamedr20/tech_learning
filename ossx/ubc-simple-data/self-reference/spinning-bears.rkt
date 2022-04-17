;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname spinning-bears) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
;; spinning-bears-starter.rkt

(require 2htdp/image)
(require 2htdp/universe)

; PROBLEM:
; 
; In this problem you will design another world program. In this program the changing 
; information will be more complex - your type definitions will involve arbitrary 
; sized data as well as the reference rule and compound data. But by doing your 
; design in two phases you will be able to manage this complexity. As a whole, this problem 
; will represent an excellent summary of the material covered so far in the course, and world 
; programs in particular.
; 
; This world is about spinning bears. The world will start with an empty screen. Clicking
; anywhere on the screen will cause a bear to appear at that spot. The bear starts out upright,
; but then rotates counterclockwise at a constant speed. Each time the mouse is clicked on the 
; screen, a new upright bear appears and starts spinning.
; 
; So each bear has its own x and y position, as well as its angle of rotation. And there are an
; arbitrary amount of bears.
; 
; To start, design a world that has only one spinning bear. Initially, the world will start
; with one bear spinning in the center at the screen. Clicking the mouse at a spot on the
; world will replace the old bear with a new bear at the new spot. You can do this part 
; with only material up through compound. 
; 
; Once this is working you should expand the program to include an arbitrary number of bears.
; 
; Here is an image of a bear for you to use: .


; Constants
(define WIDTH 800)
(define HEIGHT 500)
(define MTS (empty-scene WIDTH HEIGHT))
(define BEAR-IMG .)
(define ANGULAR_SPEED 12)

;; Data Definitions

(define-struct bear(x y deg))
;; Bear is (make-bear Number[0, WIDTH] Number[0, HEIGHT] Number[0, 360))
;; interp. the bear at position (x, y) on the screen as well as it's current rotational degree

(define BEAR_1 (make-bear 10 20 5))
(define BEAR_2 (make-bear 20 490 10))

#; (define (fn-for-bear b)
     (... (bear-x b)
          (bear-y b)
          (bear-deg b)))

;; Template rules used:
;; - one of three cases:
;; - atomic distinct: Number [0, WIDTH]
;; - atomic distinct: Number [0, HEIGHT]
;; - atomic distinct: Number [0, 360)

;; ListOfBear -> ListOfBear
;; is one of:
;; - empty
;; - (cons Bear ListOfBear)

(define LOB1 empty)
(define LOB2 (cons (make-bear 10 10 10) empty))
(define LOB3 (cons (make-bear 10 10 10) (cons (make-bear 20 20 20) empty)))

#; (define (fn-for-lob lob)
     (cond [(empty? lob) (...)]
           [else  fn-for-bear(first lob)
                 (fn-for-lob (rest lob))]))

;; Template rules used:
;; is one of
;; - atomic non-distinct: empty
;; - compound: (cons Bear ListOfBear)
;; - self-reference: (rest lob) is ListOfBear
;; - reference: (first lob) is Bear
                         
;; =================
;; Functions:

;; BearState -> BearState
;; start the world with (main (make-bear 0 0))
;; 
(define (main b)
  (big-bang b                  ; BS
            (on-tick   move-bears)   ; BS -> BS
            (to-draw   render-bears) ; BS -> Image
            (on-mouse  handle-mouse))) ; BS Integer Integer MouseEvent -> BS


;; ListOfBears -> ListOfBears
;; interp. rotate the bears based on the ANGULAR SPEED for each tick

;; (define (move-bears (cons (make-bear 0 0 0)) 0)

(check-expect (move-bears empty) empty)
(check-expect (move-bears (cons (make-bear 10 10 10) (cons (make-bear 20 20 20) empty)))
              (cons (make-bear 10 10 (- 10 ANGULAR_SPEED)) (cons (make-bear 20 20 (- 20 ANGULAR_SPEED)) empty)))
(check-expect (move-bears (cons (make-bear 10 10 10) empty))
              (cons (make-bear 10 10 (- 10 ANGULAR_SPEED)) empty))

(define (move-bears lob)
  (cond [(empty? lob) empty]
        [else
         (cons (move-bear (first lob))
               (move-bears (rest lob)))]))

;; BearState -> BearState
;; interp. rotate the bear based on the ANGULAR SPEED for each tick

;(define (move-bear b) (make-bear 0 0)) ; stub

(check-expect (move-bear (make-bear 0 0 12)) (make-bear 0 0 (- 12 ANGULAR_SPEED)))
(check-expect (move-bear (make-bear 10 10 25)) (make-bear 10 10 (- 25 ANGULAR_SPEED)))

 (define (move-bear b)
     (make-bear (bear-x b) (bear-y b) ( - (bear-deg b) ANGULAR_SPEED)))


;; ListOfBear -> Image
;; interp. render the list of bears onto the background

(check-expect (render-bears empty) MTS)
(check-expect (render-bears (cons (make-bear 0 0 0) empty))
              (place-image (rotate 0 BEAR-IMG) 0 0 MTS))
(check-expect (render-bears 
               (cons (make-bear 0 0 0)
                     (cons (make-bear (/ WIDTH 2) (/ HEIGHT 2) 90) 
                           empty)))
              (place-image (rotate 0 BEAR-IMG) 0 0 
                           (place-image (rotate 90 BEAR-IMG) (/ WIDTH 2) (/ HEIGHT 2)
                                        MTS)))

(define (render-bears lob)
  (cond [(empty? lob) MTS]
        [else 
         (render-bear-on (first lob) (render-bears (rest lob)))]))

;; Bear Image -> Image
;; render an image of the bear on the given image

(check-expect (render-bear-on (make-bear 0 0 0) MTS) (place-image (rotate 0 BEAR-IMG) 0 0 MTS))
(check-expect (render-bear-on (make-bear (/ WIDTH 2) (/ HEIGHT 2) 90) MTS)
              (place-image (rotate 90 BEAR-IMG) (/ WIDTH 2) (/ HEIGHT 2) MTS))

;(define (render-bear-on b img) MTS)

;; Took Template from Bear w/ added atomic parameter
(define (render-bear-on b img)
  (place-image (rotate (modulo (bear-deg b) 360) BEAR-IMG) (bear-x b) (bear-y b) img))

;; ListOfBear Integer Integer MouseEvent -> ListOfBear
;; On mouse-click, adds a bear with 0 rotation to the list at the x, y location
(check-expect (handle-mouse empty 5 4 "button-down") (cons (make-bear 5 4 0) empty))
(check-expect (handle-mouse empty 5 4 "move") empty)

;(define (handle-mouse lob x y mev) empty)

;; Templated according to MouseEvent large enumeration.
(define (handle-mouse lob x y mev)
  (cond [(mouse=? mev "button-down") (cons (make-bear x y 0) lob)]
        [else lob]))

(main empty)