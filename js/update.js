// document.addEventListener('DOMContentLoaded', async () => {
//   const updateForm = document.getElementById('updateProfileForm');
//   const userId = localStorage.getItem('userId'); // Replace with logic to fetch the user ID dynamically.

//   // Pre-fill form fields with existing user data
//   try {
//     const response = await fetch(`https://tutorji.onrender.com/api/users/profile/${userId}`);
//     if (response.ok) {
//       const user = await response.json();
//       document.getElementById('name').value = user.name || '';
//       document.getElementById('contact').value = user.contact || '';
//       document.getElementById('aadhar').value = user.aadhar || '';
//       document.getElementById('address').value = user.address || '';



//       // Optionally display the current profile picture
//       if (user.profilePicture) {
//         document.getElementById('profilePictureBox').innerHTML = `<img src="${user.profilePicture}" alt= "profile pic" />` 
//       }
//     } else {
//       alert('Failed to load user data.');
//     }
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//   }

//   // Handle form submission for profile update
//   updateForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(updateForm);

//     try {
//       const response = await fetch(`https://tutorji.onrender.com/api/users/update/${userId}`, {
//         method: 'PATCH',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('Profile updated successfully!');
//         console.log('Updated user:', data.user);

//         // Optionally redirect or reload
//         window.location.href = '/profile.html';
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to update profile.');
//       }
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       alert('An unexpected error occurred.');
//     }
//   });
// });





document.getElementById('updateProfileForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const userId = document.getElementById('userId').value; // Hidden input with user ID
  const formData = new FormData();

  // Append form fields to FormData
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('contact', document.getElementById('contact').value);
  formData.append('aadhar', document.getElementById('aadhar').value);
  formData.append('address', document.getElementById('address').value);

  // Append password if updated
  const password = document.getElementById('password').value;
  if (password) {
    formData.append('password', password);
  }

  // Append profile picture if uploaded
  const profilePicture = document.getElementById('profilePicture').files[0];
  if (profilePicture) {
    formData.append('profilePicture', profilePicture);
  }

  try {
    const response = await fetch(`https://tutorji.onrender.com/api/users/update/${userId}`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      alert('Profile updated successfully!');
      console.log('Updated user:', data.user);
      window.location.href = '/profile.html';
    } else {
      const error = await response.json();
      alert(`Update failed: ${error.message}`);
    }
  } catch (err) {
    console.error('Error updating profile:', err);
    alert('An unexpected error occurred. Please try again later.');
  }
});
