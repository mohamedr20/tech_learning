#############
Relationships for Models
#############

- User
  - Has one library card
  - Has one address
  - Can have multiple book items
  - Can have multiple user fines
  - Can have multiple user roles
    ################################
- Library
  - Has one address
  - Has many library business hours
  - Has many library racks
    ################################
- Book
  - Can have many book items (copies)
  - Can have many categories
  - A book can have many authors
    #######################################
- Author
  - An author can be linked to many different books
    #######################################
