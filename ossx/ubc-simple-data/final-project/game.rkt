;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname game) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
; There are many different versions of Space Invaders. For this project,
; your Space Invaders game should have the following behaviour:
; 
; The tank should move right and left at the bottom of the screen when you press the arrow keys.
; If you press the left arrow key, it will continue to move left at a constant speed until you press the right arrow key.
; 
; The tank should fire missiles straight up from its current position when you press the space bar.
; 
; The invaders should appear randomly along the top of the screen and move at a 45 degree angle.
; When they hit a wall they will bounce off and continue at a 45 degree angle in the other direction.
; When an invader reaches the bottom of the screen, the game is over. 



.

(require 2htdp/image)
(require 2htdp/universe)

;; Constants

(define WIDTH 400)
(define HEIGHT 900)
(define BACKGROUND (empty-scene WIDTH HEIGHT))

(define INVADER
  (overlay/xy (ellipse 10 15 "outline" "blue")              ;cockpit cover
              -5 6
              (ellipse 20 10 "solid"   "blue")))            ;saucer

(define TANK
  (overlay/xy (overlay (ellipse 28 8 "solid" "black")       ;tread center
                       (ellipse 30 10 "solid" "green"))     ;tread outline
              5 -14
              (above (rectangle 5 10 "solid" "black")       ;gun
                     (rectangle 20 10 "solid" "black"))))   ;main body

(define MISSILE (ellipse 5 15 "solid" "red"))
(define TANK_FIRING_POINT (/ 2 (image-height TANK)))

(define TANK-SPEED 2)
(define INVADE-RATE 30)      ;0 means - no new invaders per tick; 100 means - new invader every tick 
(define MISSILE-SPEED 2)
(define INVADER-X-SPEED 5.5)
(define INVADER-Y-SPEED 5.5)


;; Data Definitions

;==== Tank ===========;
(define-struct tank(x dx))
;; Tank is (make-tank Number Number)
;; interp. x is the tank's current x position
;; dx is the tank's current direction

(define TANK1 (make-tank (/ WIDTH 2) 1))
(define TANK2 (make-tank (- 10 WIDTH) 2))
(define TANK3 (make-tank 0 1))

(define (fn-for-tank t)
  (... (tank-x t)
       (tank-dx t)))

;; Template rules used:
;; - compound: 2 fields


;==== Invader ===========;
(define-struct invader(x y dx))
;; Invader is (make-invader Number Number Number)
;; interp. (x,y) is the current x and y position of the invader
;; dx is the invader's current direction

(define INVADER1 (make-invader 200 10 3))
(define INVADER2 (make-invader 300 20 3))

#;(define (fn-for-invader i)
    (... (invader-x i)
         (invader-y i)
         (invader-dx i)))

;; Template rules used:
;; - compound: 2 fields

;==== Invaders ===========;
;; Invaders is one of:
;; - empty
;; - (cons Invader empty)
;; interp. a list of invaders to come down the screen

(define LOI1 empty)
(define LOI2 (list INVADER1))

#;(define (fn-for-loi loi)
    (cond [(empty? loi) (...)]
          [else
           (... (fn-for-invader (first invaders)
                                (fn-for-invaders (rest invaders))))]))
;; Template rules used:
;; - atomic non-distinct: empty
;; - compound: (cons Invader empty)
;; - reference: (first loi) is an Invader
;; - self-reference: (rest loi)





;==== Missile ===========;
(define-struct missile(x y))
;; Missile is (make-invader Number Number)
;; interp. (x,y) is the current x and y position of the invader
;; the missile x position is dependent to the tank's x position

(define MISSILE1 (make-missile 20 30))
(define MISSILE2 (make-missile 50 60))

#;(define (fn-for-missile m)
    (... (missile-x m)
         (missile-y m)))

;; Template rules used:
;; - compound: 2 fields


;==== Missiles ===========;
;; Missiles is one of:
;; - empty
;; - (cons Missile empty)

(define LOM1 empty)
(define LOM2 (list MISSILE1))
(define LOM3 (list MISSILE1 MISSILE2))

#;(define (fn-for-missiles missiles)
    (cond [(empty? lom) (...)]
          [(else
            (...(fn-for-m(first missiles)
                         (fn-for-lom (rest missiles)))))]))

;; Template rules used:
;; - atomic non-distinct: empty
;; - compound: (cons Missile empty)
;; - reference: (first lom) is Missile
;; - self-reference: (rest lom) is ListOfMissile
                 
            
         
(define-struct game(invaders missiles tank))
;; Game is (make-game ListOfInvaders Tank ListOfMissiles)
;; interp. the groups of invaders that will spawn on each tick
;; A tank which fires a group of missiles up to hit the invaders

(define GAME0 (make-game empty empty (make-tank (- (/ WIDTH 2) (/ (image-width TANK) 2)) 0)))
(define GAME1 (make-game empty empty (make-tank (/ WIDTH 2) 0)))
(define GAME2 (make-game (list INVADER1 INVADER2) (list MISSILE1 MISSILE2) (make-tank (/ WIDTH 2) 0)))
(define GAME4 (make-game (list INVADER1 INVADER2) empty (make-tank (/ WIDTH 2) 0)))

#; (define (fn-for-game g)
     (... (fn-for-invaders (game-invaders g))
          (fn-for-tank (game-tank g))
          (fn-for-missiles (game-missiles g))))

;; Template rules used:
;; compound: 3 fields


;; =================
;; Functions:

;; Game -> Game
;; start the world with (main (make-game empty TANK1 empty))
;; 
(define (main g)
  (big-bang g                 ; Game
    (on-tick   move-game)     ; Game -> Game
    (to-draw   render-game)   ; Game -> Image
    (stop-when end-game)      ; Game -> Boolean
    (on-key    handle-key))) ; Game KeyEvent -> Game

;; Game KeyEvent -> Game
;; interp. handle key events for the game

;(define (handle-key g "up") (make-game empty TANK1 empty))

(check-expect (handle-key GAME1 "up") (make-game empty empty (make-tank (/ WIDTH 2) 0)))

;; Handle tank movement
;(check-expect (handle-key GAME1 "right") (make-game empty  empty (make-tank (+ (/ WIDTH 2) 2)  TANK-SPEED))) 
;(check-expect (handle-key GAME1 "left") (make-game empty  empty  (make-tank (+ (/ WIDTH 2) -2) TANK-SPEED))) 

(define (handle-key g kevt)  
  (cond [(key=? kevt "left") (make-game (game-invaders g) (game-missiles g) (make-tank (tank-x (game-tank g)) -5))]
        [(key=? kevt "right")(make-game (game-invaders g) (game-missiles g) (make-tank (tank-x (game-tank g)) 5))]
        [(key=? kevt " ") (make-game (game-invaders g)
                                     (shoot-missiles (game-tank g) (game-missiles g))
                                     (make-tank (tank-x (game-tank g)) (tank-dx (game-tank g))))] ;; Handle missile firing
        [else g]))


;; Tank Missiles -> Missiles
;; Creates a missile at the current tank's location
;(define (shoot-missiles t lom) empty)

(check-expect (shoot-missiles (make-tank (/ WIDTH 2) 0) empty) (list (make-missile (/ WIDTH 2) 0)))


;; (align center-x of missile with center-x of tank) and add to list of missiles
(define (shoot-missiles t missiles)
  (cons (make-missile (+ (tank-x t) (/ (image-width TANK) 2)) (- HEIGHT (image-height MISSILE))) missiles))



;; Game -> Game
;; move all the pieces in the game

(define (move-game g)
  (make-game 
             (advance-invaders (destroy-invaders (spawn-invaders (game-invaders g)) (game-missiles g)))
             (move-missiles (destroy-missiles (game-missiles g) (game-invaders g)))
             (move-tank (game-tank g))))

;; Invaders Missiles -> Invaders
;; Filter out invaders who are hit by a missile
(define (destroy-invaders loi lom)
  (cond [(empty? loi) empty]
        [(empty? lom) loi]
        [else
         (if (hit-invader? (first loi) lom)
             (destroy-invaders (rest loi) lom)
             (cons (first loi) (destroy-invaders (rest loi) lom)))]))

;; Invader Missiles -> Boolean
;; Given list of missiles and an invader, return true if their coordinates collide

(define (hit-invader? i lom)
  (cond [(empty? lom) false]
        [else
         (if (and
              (and (>= (+ (missile-x (first lom)) (image-width MISSILE)) (invader-x i))
                   (<= (missile-x (first lom)) (+ (invader-x i) (image-width INVADER))))
              (and (<= (- (missile-y (first lom)) (image-height MISSILE)) (invader-y i))
                   (>= (missile-y (first lom)) (- (invader-y i) (image-height INVADER)))))
             true
             (hit-invader? i (rest lom)))]))


;; Missiles Invaders -> Missiles
;; Filter out missiles that have hit an invader

(define (destroy-missiles lom loi)
  (cond [(empty? lom) empty]
        [(empty? loi) lom]
        [else
         (if (hit-missile? (first lom) loi)
             (destroy-missiles (rest lom) loi)
             (cons (first lom) (destroy-missiles (rest lom) loi)))]))

;; Missile Invader -> Boolean
;; Given a missile, return true if it's coordinates collide with an invader

(define (hit-missile? m loi)
  (cond [(empty? loi) false]
        [else
         (if (and
              (and (>= (+ (missile-x m) (image-width MISSILE)) (invader-x (first loi)))
                   (<= (missile-x m) (+ (invader-x (first loi)) (image-width INVADER))))
              (and (<= (- (missile-y m) (image-height MISSILE)) (invader-y (first loi)))
                   (>= (missile-y m) (- (invader-y (first loi)) (image-height INVADER)))))
             true
             (hit-missile? m (rest loi)))]))

;; Invaders -> Invaders
;; Create invaders from random positions on the screen

(define (spawn-invaders loi)
  (cond [(< (random 100) INVADE-RATE)
         (cons (make-invader (random WIDTH) 0 (* (list-ref (list 1 -1) (random 2)) INVADER-X-SPEED)) loi)]
        [else loi]))


;; Invaders -> Invaders
;; Move the invaders in the correct manner on the screen
; !!!

(check-expect (advance-invaders (list (make-invader 100 50 1))) (list (make-invader (+ 100 INVADER-X-SPEED) (+ 50 INVADER-Y-SPEED) 1)))
(check-expect (advance-invaders (list (make-invader 100 50 1) (make-invader 200 120 1)))
              (list (make-invader (+ 100 INVADER-X-SPEED) (+ 50 INVADER-Y-SPEED) 1)
                    (make-invader (+ 200 INVADER-X-SPEED) (+ 120 INVADER-Y-SPEED) 1)))

(define (advance-invaders invaders)
  (cond [(empty? invaders) empty]
        [else
         (cons (advance-invader (first invaders))
               (advance-invaders (rest invaders)))]))

;; Invader -> Invader
;; Move a single invader down the screen

(check-expect (advance-invader (make-invader 100 50 1)) (make-invader (+ 100 INVADER-X-SPEED) (+ 50 INVADER-Y-SPEED) 1))

(define (advance-invader i)
  (cond [(invaderInBounds? i)
         (make-invader (+ (invader-x i) (* -1 (invader-dx i))) (+ (invader-y i) INVADER-Y-SPEED) (* -1 (invader-dx i)))]
        [else 
         (make-invader (+ (invader-x i) (invader-dx i)) (+ (invader-y i) INVADER-Y-SPEED) (invader-dx i))]))

;; Invader -> Boolean

(define (invaderInBounds? i)
  (or (> (+ (invader-x i) (invader-dx i)) (- WIDTH (image-height INVADER)))
             (< (+ (invader-x i) (invader-dx i)) (image-width INVADER)))) 

        
;; Missiles -> Missiles
;; Move the missiles in the correct manner on the screen

;(define (move-missiles missiles) missiles)

(define (move-missiles missiles)
  (cond [(empty? missiles) empty]
        [else
         (cons (move-missile (first missiles))
               (move-missiles (rest missiles)))]))


(define (move-missile m)
  (make-missile (missile-x m) (- (missile-y m) MISSILE-SPEED)))

;; Tank -> Tank
;; Move the tank at a constant speed, depending on what the dx(direction) is

(check-expect (move-tank (make-tank (/ WIDTH 2) 1)) (make-tank (+ (/ WIDTH 2) 1) 1)) ; Tank moving to the right
(check-expect (move-tank (make-tank (/ WIDTH 2) -1)) (make-tank (+ (/ WIDTH 2) -1) -1)) ; Tank moving to the left

(check-expect (move-tank (make-tank 0 -1)) (make-tank 0 1)) ; Tank going left, hitting the edge
(check-expect (move-tank (make-tank (- WIDTH (image-width TANK)) 1))
              (make-tank (- WIDTH (image-width TANK)) -1)) ; Tank going right, hitting the edge 

(define (move-tank t)
  (cond [(> (+ (tank-x t) (tank-dx t)) (- WIDTH (image-width TANK))) (make-tank (- WIDTH (image-width TANK)) (- (tank-dx t)))]
        [(< (+ (tank-x t) (tank-dx t)) 0) (make-tank 0 (- (tank-dx t)))]
        [else
         (make-tank (+ (tank-x t) (tank-dx t)) (tank-dx t))]))

;; Game -> Image
;; render all the game parts in the appropriate places

;(define (render-game g) BACKGROUND)


(check-expect (render-game (make-game empty empty (make-tank (/ WIDTH 2) 0)))
              (place-image/align TANK (/ WIDTH 2) HEIGHT "left" "bottom" BACKGROUND))

(check-expect (render-game (make-game empty empty (make-tank 0 0)))
              (place-image/align TANK 0 HEIGHT "left" "bottom" BACKGROUND))

(check-expect (render-game (make-game (list (make-invader 50 10 5) (make-invader 300 100 2)) empty (make-tank (/ WIDTH 2) 0)))
              (place-image/align INVADER 50 10 "left" "bottom" 
                                 (place-image/align INVADER 300 100 "left" "bottom"
                                                    (place-image/align TANK (/ WIDTH 2) HEIGHT "left" "bottom" BACKGROUND))))

(check-expect (render-game (make-game (list (make-invader 400 300 5)) (list (make-missile 200 150)) (make-tank (/ WIDTH 2) 0)))
              (place-image/align INVADER 400 300 "left" "bottom"
                                 (place-image/align MISSILE 200 150 "left" "bottom"
                                                    (place-image/align TANK (/ WIDTH 2) HEIGHT "left" "bottom" BACKGROUND))))

(check-expect (render-game (make-game (list (make-invader 50 10 5) (make-invader 300 100 2)) (list (make-missile 100 200)) (make-tank 50 0)))
              (place-image/align INVADER 50 10 "left" "bottom"
                                 (place-image/align INVADER 300 100 "left" "bottom"
                                                    (place-image/align MISSILE 100 200 "left" "bottom"
                                                                       (place-image/align TANK 50 HEIGHT "left" "bottom" BACKGROUND)))))
(define (render-game g)
  (render-invaders (game-invaders g)
                   (render-missiles (game-missiles g)
                                    (render-tank (game-tank g)))))

;; Invaders -> Image
;; Render the list of invaders at the appropriate place on the screen
;(define (render-invaders loi img) BACKGROUND)

(check-expect (render-invaders (list (make-invader 50 10 5) (make-invader 300 100 2)) BACKGROUND)
              (place-image/align INVADER 50 10 "left" "bottom"
                                 (place-image/align INVADER 300 100 "left" "bottom" BACKGROUND)))

;<use Template from Invaders>

(define (render-invaders invaders img)
  (cond [(empty? invaders) img]
        [else 
         (render-invader (first invaders)
                         (render-invaders (rest invaders) img))]))

;; Invader Image -> Image
;; Take a single invader and place it on the screen

;(define (render-invader (make-invader 50 10) BACKGROUND) BACKGROUND)

(check-expect (render-invader (make-invader 50 10 5) BACKGROUND)
              (place-image/align INVADER 50 10 "left" "bottom" BACKGROUND))

;(define (render-invader i img)
;(place-image/align (invader-x i) (invader-y i) "left" "bottom" img))

(define (render-invader i img)
  (place-image/align INVADER (invader-x i) (invader-y i) "left" "bottom" img))

;; Missiles Image -> Image
;; render the list of missiles at the right place on the screen
(check-expect (render-missiles (list (make-missile 20 30)) BACKGROUND)
              (place-image/align MISSILE 20 30 "left" "bottom" BACKGROUND))

(check-expect (render-missiles (list (make-missile 20 30) (make-missile 50 60)) BACKGROUND)
              (place-image/align MISSILE 20 30 "left" "bottom"
                                 (place-image/align MISSILE 50 60 "left" "bottom" BACKGROUND)))

(define (render-missiles missiles img)
  (cond [(empty? missiles) img]
        [else 
         (render-missile (first missiles)
                         (render-missiles (rest missiles) img))]))

;; Missile Image -> Image
;; Render a single missile at the right place on the screen

(check-expect (render-missile (make-missile 20 30) BACKGROUND)
              (place-image/align MISSILE 20 30 "left" "bottom" BACKGROUND))

(define (render-missile m img)
  (place-image/align MISSILE (missile-x m) (missile-y m) "left" "bottom" img))
  
;; Tank -> Image
;; Render a single tank at the right place on the screen

;(define (render-tank t) BACKGROUND)

(check-expect (render-tank (make-tank 100 1))
              (place-image/align TANK 100 HEIGHT "left" "bottom" BACKGROUND))

(define (render-tank t)
  (place-image/align TANK (tank-x t) HEIGHT "left" "bottom" BACKGROUND))

;; Game -> Boolean
;; end game when invader reaches the end on the screen

(check-expect (end-game (make-game (list (make-invader 300 HEIGHT 2)) empty TANK1)) true)
(check-expect (end-game (make-game (list (make-invader 300 150 2)) empty TANK1)) false)

(define (end-game g)
  (check-invaders? (game-invaders g)))

;; Invaders -> Boolean 
;; Check list of invaders to see if the (invader-y i) reached the HEIGHT of the screen

(check-expect (check-invaders? (list (make-invader 300 HEIGHT 2))) true)
(check-expect (check-invaders? (list (make-invader 300 150 2))) false)
(check-expect (check-invaders? empty) false)

(define (check-invaders? loi)
  (cond [(empty? loi) false]
        [else
         (if (>= (invader-y (first loi)) HEIGHT (image-height INVADER))
             true
             (check-invaders? (rest loi)))]))


;; Initialize the game
(main (make-game empty empty (make-tank (/ WIDTH 2) 5)))
