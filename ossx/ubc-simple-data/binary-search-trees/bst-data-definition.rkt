;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname binary_search_tree_data_definition) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

;; bst-dd-starter.rkt

; 
; PROBLEM:
; 
; Design a data definition to represent binary search trees. As a reminder,
; here is one example BST:
; 
; .


(define-struct node (key val l r))
;; BST (Binary Search Tree) is one of
;; - false
;; - (make-node Integer String BST BST)
;; interp. false means no BST, or empty BST
;; key is the node key
;; val is the node val
;; l and r and left and right subtrees

;; NOTE: For a given node, key is greater than all nodes in it's l(left) child
;; and key is less than all keys in it's r(right) child
;; The same key never appears twice in the tree

(define BST0 false) ;; empty tree

;; Left side of the tree
(define BST7 (make-node 7 "ruf" false false))
(define BST1 (make-node 1 "abc" false false))
(define BST4 (make-node 4 "dcj" false BST7))
(define BST3 (make-node 3 "ilk" BST4 BST1))

;; Right side of the tree
(define BST14 (make-node 14 "olp" false false))
(define BST27 (make-node 27 "wit" BST14 false))
(define BST50 (make-node 50 "dug" false false))
(define BST42 (make-node 42 "ily" BST27 BST50))

;; Root
(define BST10 (make-node 10 "why" BST3 BST42))

(define (fn-for-bst tree)
  (cond [(false? tree)(...)]
        [else
         (... (node-key tree) ; Integer
              (node-val tree) ; Integer
              (fn-for-bst (node-l tree))
              (fn-for-bst (node-r tree)) 
              )]))

;; Template rules used:
;; - one of: 2 cases
;; - atomic distinct: false
;; - compound: (make-node Integer String BST BST)
;; - self-reference: (node-l tree) has type BST