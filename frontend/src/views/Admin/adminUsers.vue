<template>
  <div>
    <Navbar></Navbar>
    <v-card class="mx-auto" max-width="500">
      <v-card-title>
        Users List
      </v-card-title>
      <v-divider></v-divider>
      <v-virtual-scroll :items="users" height="320" item-height="48">
        <template v-slot:default="{ item: user }">
          <v-list-item>
            <template v-slot:default>
              <v-list-item-content>
                <v-list-item-title>
                  {{ user.name }} <!-- Replace 'name' with the actual property name -->
                </v-list-item-title>
                <v-list-item-subtitle>
          Status : {{ user.status }}
          <svg
  @click="toggleStatus(user)"
  class="h-8 w-8 cursor-pointer"
  :class="{ 'text-green-500': user.status === 'active', 'text-red-500': user.status !== 'active' }"
  viewBox="0 0 28 28"
  fill="all"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="2"
    v-if="user.status === 'active'"
  />
  <circle
    cx="12"
    cy="12"
    r="10"
    fill="all"
    stroke="currentColor"
    stroke-width="2"
    v-else
  />
</svg>

        </v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <template v-slot:prepend>
              <v-icon class="bg-primary">mdi-account</v-icon>
            </template>
            <template v-slot:append>
              <v-btn
                
                icon="mdi-pencil"
                size="x-small"
                variant="tonal"             
              >
              <router-link
        :to="`/Admin/users/edit/${user._id}`"
      >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              </router-link>
            </v-btn>
              <v-btn 
                @click="confirmDelete(user)" 
                icon="mdi-delete"
                size="x-small"
                variant="tonal"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </v-btn>
            <v-btn
                size="small"
                variant="tonal"
              >
                View User
                <v-icon
                  color="orange darken-4"
                  end
                >
                  mdi-open-in-new
                </v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>


<script setup>
import Navbar from '../../components/Navbar.vue';
import { ref, onMounted } from 'vue';
import Admin from '@/modules/Admin';
import Swal from 'sweetalert2';

const {  getAllUsersData,users } = Admin();

const errorMessage = ref('');

onMounted(() => {
     getAllUsersData();
});



const toggleStatus = async (user) => {
    try {
      const userId = user._id;
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
  
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      };
  
      const response = await fetch(`http://localhost:3000/admin/user/update/${userId}`, requestOptions);
      const data = await response.json();
  
      if (response.ok) {
        // Update the user's status locally
        user.status = newStatus;
        // Show a success SweetAlert message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `User status for ${data.user.name}. updated to ${newStatus}.`,
        });
      } else {
        // Handle the error, e.g., show error message
        console.error('Error updating user status:', data.error);
        errorMessage.value = 'Failed to update user status. Please try again.';
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      // Handle the error, e.g., show error message
      errorMessage.value = 'Failed to update user status. Please try again.';
    }
  };

  const deleteUser = async (user) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    };

    const response = await fetch(`http://localhost:3000/admin/user/delete/${user}`, requestOptions);
    const data = await response.json();

    if (response.ok) {
      console.log('User deleted:', data);
    } else {
      console.error('Error deleting user:', data.error);
      throw new Error(data.error || 'Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};


const confirmDelete = (user) => {
  console.log('user:', user);
  Swal.fire({
    title: 'Confirm Delete',
    text: `Are you sure you want to delete the user ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteUser(user._id); // Pass user._id to deleteUser
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `The user ${user.name} has been deleted.`,
      });
      // Optionally, you can refresh the user list or take other actions after deletion
    }
  });
};


</script>
