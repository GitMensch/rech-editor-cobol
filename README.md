# Rech's VSCode extension for Cobol language

## IntelliSense for Cobol variable declaration
The variable declaration is done in two steps so that the editor parses the picture and generates the most approprivate VALUE in the VALUE clause:

* If it's a numeric display variable (picture contains **.**, **z**, **b**, **-** or **,**) inserts **VALUE IS ZEROS**.
![Display variable declaration](doc/variable/display-var-declaration.gif)
* If it's a numeric variable for computing, with decimal **v** or negative **s**, inserts **VALUE IS ZEROS COMP**.
![Computing variable with comma declaration](doc/variable/comma-numeric-var-declaration.gif)
* If it's an alphanumeric variable inserts **VALUE IS SPACES**.
![Alphanumeric variable declaration](doc/variable/alphanumeric-var-declaration.gif)
* If it's a  variable for computing, without decimal **v** nor negative **s**, inserts **VALUE IS ZEROS COMP-X**.
![Computing variable declaration](doc/variable/compute-var-declaration.gif)

