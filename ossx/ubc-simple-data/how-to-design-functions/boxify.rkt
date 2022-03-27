;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname boxify) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require 2htdp/image)

;; boxify-starter.rkt

; 
; PROBLEM:
; 
; Use the How to Design Functions (HtDF) recipe to design a function that consumes an image, 
; and appears to put a box around it. Note that you can do this by creating an "outline" 
; rectangle that is bigger than the image, and then using overlay to put it on top of the image. 
; For example:
; 
; (boxify (ellipse 60 30 "solid" "red")) should produce .
; 
; Remember, when we say DESIGN, we mean follow the recipe.
; 
; Leave behind commented out versions of the stub and template.
; 


;; Image -> Image
;; Takes in a image of a ellipse and creates a border around the ellipse

;;Stub
;; (define (boxify (ellipse 60 30 "solid" "red") ""))

;; Testing

(define ELLIPSE_1 (ellipse 60 30 "solid" "red"))
(define CIRCLE_1 (circle 10 "solid" "red"))

(check-expect (boxify ELLIPSE_1)
              (overlay (rectangle 62 32 "outline" "black")
                       (ellipse 60 30 "solid" "red")))
(check-expect (boxify CIRCLE_1)
              (overlay (rectangle 22 22 "outline" "black")
                       (circle 10 "solid" "red")))


(define (boxify i)
  (overlay (rectangle (+ (image-width i) 2)
                      (+ (image-height i) 2)
                      "outline"
                      "black")
           i))

