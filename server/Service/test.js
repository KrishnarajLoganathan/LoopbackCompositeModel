"use strict";
class Person {

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return this.firstName + " & " + this.lastName;
  }

}

class Student extends Person {

  constructor(studentId, firstName, lastName) {
    super(firstName, lastName);
    this.studentId = studentId;
  }

  getStudentInfo() {
     return new Promise((resolve, reject) => {
        // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
        // In this example, we use setTimeout(...) to simulate async code. 
        // In reality, you will probably be using something like XHR or an HTML5 API.
        setTimeout(function(){
            resolve("Success!"); // Yay! Everything went well!
        }, 2000);
        });
    //return this.studentId + " " + this.lastName + ", " + this.firstName;
  }

}


exports.testObject = {
         testMethod : (arg1, arg2) => {
             const student = new Student(1, arg1, arg2);
            console.log(student.getFullName());
            
            student.getStudentInfo().then((successMessage) => {
            // successMessage is whatever we passed in the resolve(...) function above.
            // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
            console.log("Yay! " + successMessage);
            });
             //console.log(arg1,arg2)
         }

 }



/*module.exports = (Location) => {

  // define remote method
  Location.getLocation = (data) => {
    return new Promise((resolve, reject) => {

      resolve(data);

    });
  }
}
*/