;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname arrange-images) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require 2htdp/image)

;; arrange-images-starter.rkt (problem statement)

; 
; PROBLEM:
; 
; In this problem imagine you have a bunch of pictures that you would like to 
; store as data and present in different ways. We'll do a simple version of that 
; here, and set the stage for a more elaborate version later.
; 
; (A) Design a data definition to represent an arbitrary number of images.
; 
; (B) Design a function called arrange-images that consumes an arbitrary number
;     of images and lays them out left-to-right in increasing order of size.
;     


;; Constants
(define BLANK (square 0 "solid" "white"))

;; Data Definitions

;; ListOfImage is one of:
;; - empty
;; - (cons Image ListOfImage)

(define LOI_1 empty)
(define LOI_2 (cons (rectangle 20 30 "solid" "red") empty))
(define LOI_3 (cons (rectangle 20 30 "solid" "red") (cons (rectangle 10 15 "solid" "blue") empty)))

(define I1 (rectangle 10 20 "solid" "red"))
(define I2 (rectangle 20 30 "solid" "blue"))
(define I3 (rectangle 30 40 "solid" "green"))

#; (define (fn-for-loi loi)
     (cond [(empty? loi) (...)]
           [else (first loi)
                 (fn-for-loi (rest loi))]))

;; Template rules used:
;; - atomic non-distinct: empty
;; - compound: (cons Image ListOfImage)
;; - self-reference: (rest loi) is ListOfImage

;; Functions

;; ListOfImage -> Image
;; consumes a list of images and lays them out left-to-right
;; in increasing order of size

;; sort images in increasing order of size and then lay them out left-to-right
(check-expect (arrange-images (cons (rectangle 10 20 "solid" "blue")
                                    (cons (rectangle 20 30 "solid" "red")
                                          empty)))
              (beside (rectangle 10 20 "solid" "blue")
                      (rectangle 20 30 "solid" "red")              
                      BLANK))
(check-expect (arrange-images (cons (rectangle 20 30 "solid" "red")
                                    (cons (rectangle 10 20 "solid" "blue")
                                          empty)))
              (beside (rectangle 10 20 "solid" "blue")
                      (rectangle 20 30 "solid" "red")              
                      BLANK))
;; sort the list of images and then layout the images
(define (arrange-images loi)
  (layout-images (sort-images loi)))

;; ListOfImage -> Image
;; place images beside each other in order of list
;(define (layout-images loi) BLANK)

(check-expect (layout-images empty) BLANK)
(check-expect (layout-images (cons (rectangle 10 20 "solid" "blue")
                                   (cons (rectangle 20 30 "solid" "red")
                                         empty)))
              (beside
               (rectangle 10 20 "solid" "blue")
               (rectangle 20 30 "solid" "red")
               BLANK))

(define (layout-images loi)
  (cond [(empty? loi) BLANK]
        [else
         (beside (first loi)
                 (layout-images (rest loi)))]))
              
;; ListOfImage -> ListOfImage
;; sort the list of images in increasing order of size

;(define (sort-images loi) loi)

(check-expect (sort-images empty) empty)
(check-expect (sort-images (cons I1 (cons I2 empty)))
              (cons I1 (cons I2 empty)))
(check-expect (sort-images (cons I2 (cons I1 empty)))
              (cons I1 (cons I2 empty)))
(check-expect (sort-images (cons I3 (cons I1 (cons I2 empty))))
              (cons I1 (cons I2 (cons I3 empty))))

(define (sort-images loi)
  (cond [(empty? loi) empty]
        [else
         (insert (first loi)
                 (sort-images (rest loi)))])) ;result of natural recursion will be sorted
;; Image ListOfImage -> ListOfImage
;; insert img in proper palce in list (in increasing order)

;(define (insert img loi) loi)

(check-expect (insert I1 empty) (cons I1 empty))
(check-expect (insert I1 (cons I2 (cons I3 empty))) (cons I1 (cons I2 (cons I3 empty))))
(check-expect (insert I2 (cons I1 (cons I3 empty))) (cons I1 (cons I2 (cons I3 empty))))
(check-expect (insert I3 (cons I1 (cons I2 empty))) (cons I1 (cons I2 (cons I3 empty))))

(define (insert img loi)
  (cond [(empty? loi) (cons img empty)]
        [else
         (if (larger? img (first loi))
             (cons (first loi)
                   (insert img
                           (rest loi)))
             (cons img loi))]))


;; Image Image -> Boolean
;; compare sizes of two images

;(define (larger? img1 img2) false)

(check-expect (larger? I1 I2) false)
(check-expect (larger? I2 I1) true)
(check-expect (larger? I3 I1) true)

(define (larger? img1 img2)
  (> (* (image-height img1) (image-width img1))
     (* (image-height img2) (image-width img2))))