;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname list_data) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))

(define-struct account(num name))
;; Accounts is one of:
;; -empty
;; - (cons (make-account Natural String) Accounts)
;; interp. a list of accounts where each:
;; - num is an account number
;; - name is a person's name

(define ACS1 empty)
(define ACS2 (list (make-account 1 "abc") (make-account 2 "dcj")))

#; (define (fn-for-account accs)
     (cond [(empty? accs) (...)]
           [else
            (... (account-num (first accs)) ; Natural
                 (account-name (first accs)) ;String
                 (fn-for-accounts(rest accs)))]))

;; We have a number of account numbers and names
;; given an account number we have to look up the name

;; Accounts Natural -> String
;; interp. given a account number find the name related to the account

(check-expect (find-account (list (make-account 1 "abc") (make-account 2 "dcj")) 1) "abc")
(check-expect (find-account empty 0) empty)

; <take template from Accounts>
(define (find-account accs accs-num)
  (cond [(empty? accs) empty]
        [else
         (if (= (account-num (first accs)) accs-num)
             (account-name (first accs))
             (find-account (rest accs) accs-num))]))
