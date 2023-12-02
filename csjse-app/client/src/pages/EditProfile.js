//

//Defines an API endpoint for updating user's profile data
app.put('/api/user-profile', async (req, res) => {  //defines a PUT request for the API endpoint, will be called when PUT request made to /api/user-profile endpoint
    try {   //try-catch block for error-handling
       const updatedProfileData = await updateUserProfileData(req.user.id, req.body);   //function tries to update profile info, takes 2 arguments: user ID and new profile data
       res.json(updatedProfileData);    //If the update succeeds, returns updated profile data as JSON response
    } catch (error) {
       res.status(500).json({ error: 'Server error updating user profile data' });  //Sends JSON response with error code and message
    }
    //application should be able to update user profile by making PUT request to /api/user-profile with updated data in request body
   });

//Makes a PUT request to /api/user-profile with new profile data represented as updatedData argument
async function updateUserProfileData(updatedData) {
    try {
       const response = await fetch('/api/user-profile', {  //configure request to API endpoint
           method: 'PUT',   //sets request method type
           headers: { 'Content-Type': 'application/json' }, //creates and sets header
           body: JSON.stringify(updatedData),   //establishes new profile data as the request body
       });
       if (!response.ok) {  //checks response to the request
         throw new Error('Error updating user profile data'); //throws error if response unsuccessful
       }
       const updatedProfile = await response.json();    //reads response body as JSON if response successful
       displayUpdatedProfileData(updatedProfile);   //displays updated data
    } catch (error) {   //throws error message if PUT request unsuccessful
       console.error('Error:', error);  //logs error to console
    }
    //application should update user's profile info in server and then display updated changes based on data received in the following server response
   }

   //Updates UI with updated user info received from server
   function displayUpdatedProfileData(updatedProfile) {
    document.getElementById('email').value = updatedProfile.email;    //takes updated values and inserts them into the appropriate value fields displayed in the UI
    document.getElementById('password').value = updatedProfile.password;
    // Add any other fields with information to be updated
   }
    //application UI should accurately reflect updates to profile data submitted to server
   