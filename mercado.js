List = new Mongo.Collection("mercado");

if (Meteor.isClient) {
   // This code only runs on the client
   Template.body.helpers({
      list: function () {
         // Show newest tasks first
         return List.find({}, {sort: {createdAt: -1}, limit: 10});
      },
      sum: function () {
         list = List.find({}, {sort: {createdAt: -1}});
         total = 0;

         list.forEach(function (item) {
            price = item.number.replace(",", ".");
            total += parseFloat(price);
         });

         total = total.toString().replace(".", ",");

         return total;
      }
   });

   Template.body.events({
      "submit .new-task": function (event) {
         // This function is called when the new task form is submitted
         var text = event.target.text.value;
         var number = event.target.number.value;

         number = number.replace(",", ".");

         if (text != "" || number != "") {
            List.insert({
               text: text,
               number: number,
               createdAt: new Date() // current time
            });
         }

         // Clear form
         event.target.text.value = "";
         event.target.number.value = "";

         // Prevent default form submit
         return false;
      }
   });
}