;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname total_area_image_list) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require 2htdp/image)

;; image-list-starter.rkt

;; =================
;; Data definitions:

; 
; PROBLEM A:
; 
; Design a data definition to represent a list of images. Call it ListOfImage. 
; 


;; ListOfImage is one of:
;; - empty
;; - (cons Image ListOfImage)

(define LOI_1 empty)
(define LOI_2 (cons (rectangle 10 15 "solid" "red") empty))
(define LOI_3 (cons (rectangle 10 15 "solid" "red")
              (cons (rectangle 15 25 "solid" "brown") empty)))

#; (define (fn-for-loi loi)
     (cond [(empty? loi) (...)]
           [else (first loi)
                 (fn-for-loi (rest loi))]))

;; Template rules used:
;; - one of 3 cases:
;; - atomic non-distinct: Image
;; - compound: (cons Image ListOfImage)
;; - self-reference: (rest loi)

;; =================
;; Functions:

; 
; PROBLEM B:
; 
; Design a function that consumes a list of images and produces a number 
; that is the sum of the areas of each image. For area, just use the image's 
; width times its height.
; 


;; ListOfImage -> Number
;; consume a list of images and return the sums of areas for each image
;; interp. area is image width * image height

;(define (total-area empty) 0) ;stub

(check-expect (total-area LOI_1) 0)
(check-expect (total-area LOI_2) 150)
(check-expect (total-area LOI_3) 525)

; <use template from ListOfImage>

(define (count lon)
  (cond [(empty? lon) 0]
        [else (+ 1 (count (rest lon)))]))


(define (total-area loi)
     (cond [(empty? loi) 0]
           [else
            (+ (* (image-width (first loi))
                  (image-height (first loi)))
                  (total-area (rest loi)))]))

