This experiment builds upon a past repository, but may not represent my vision for that final product. Thus, it made more sense to upload this as its own thing until I can decide how to better implement the CRUD concept. In its current form, I have maintained most of the front end, but introduced a simple form under an "Add-On" div that allows users to upload their own images, and provide whatever names and descriptions they want. Since it would be difficult to cover all Plastic Army Men toys, I thought this would be a fun way to let the user do it themselves.

My vision is to ultimately have user entries in "Add-On" conform to the same lightbox format and functionality as the previous hardcoded entries, as well as the option to add a "Category" option to the form that will allow users to place additions under specific categories, (EX: Infantry, Armor), or even create entirely new ones, (EX: Sea, Air). I also want to add a better means of including custom user images, such as an "Upload Image" button, and the image url should probably be hidden for aesthetic reasons. However, these goals are beyond the scope of what I can achieve at this time.



Step 1, Run the Site:

-To run the project, you'll need to use the Git Bash terminal.
-Navigate to the project directory, and type...

npm install package.json --save

...to install the project dependencies.
-From there, type...

nodemon

...in the terminal to connect to the server.
-Finally, access the project by opening a browser, and visiting the address...

http://localhost:3030/



Step 2, Use CRUD Functions:

For this part, navigate from the home page to the "Units and Accessories" JS tab, and scroll to the bottom. you should see a form beneath an "Add-On" div. I have included images in the public/img directory with which you can experiment, but for now you'll need to drag an image there manually if you wish to use an alternate image.

-To create an entry, fill out the form and hit submit. NOTE: to use an image, dice.JPG for example, type the path and image name into the form field, (img/dice.JPG in this example). The data entered should now be visible on the front-end.

-To edit an entry, click the edit button. You should see some data has been placed into the form's fields. Change them to whatever you want, then hit submit to finalize your changes.

NOTE: at any time when using create and edit, you can hit the cancel button to empty and reset the form.

-To delete an entry, simply click the delete button. A prompt should appear asking if you're sure, and you can confirm or deny.

That's it!
