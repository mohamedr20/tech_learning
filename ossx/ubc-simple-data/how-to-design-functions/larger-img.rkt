;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname larger-img) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require 2htdp/image)

; 
; Design a function that consumes two images and produces true if
; the first is larger than the second.


;; Image -> Boolean
;; Design a function that takes in two images and compares the two sizes
;; Returns true if the first image is larger than the second

;; Stub
;(define (larger-img img1 img2) false)

;; Testing

(check-expect (larger-image?
               (circle 12 "solid" "red")
               (circle 11 "solid" "blue"))
                      true)
(check-expect (larger-image? (rectangle 25 20 "solid" "blue")
                            (rectangle 35 20 "solid" "green"))
                            false)

(define (larger-image? img1 img2)
 (and
  (> (image-height img1) (image-height img2))
  (> (image-width img1) (image-width img2))))
                      