<template>
    <div>
        <Navbar />
        <main>
            <!-- Display Error Messages -->
            <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div>
            <div v-if="successMessage" class="bg-green-500 text-white p-4 text-lg mb-4 text-center">
                {{ successMessage }}
            </div>

            <!-- Messages Table -->
          
                <div class="flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700 mb-4">
                    <div class="bg-white px-6 py-4 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2">
                        <h1 class="mb-4 text-3xl text-center">Messages</h1>

                        <!-- Table for Messages -->
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th class="py-2">Sender</th>
                                    <th class="py-2">Message</th>
                                    <th class="py-2">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Loop through messages and display them in the table -->
                                <tr v-for="message in messages.messages" :key="message._id">
                                    <td class="py-2">{{ getSenderName(message.sender) }}</td>
                                    <td class="py-2">{{ message.text }}</td>
                                    <td class="py-2">{{ message.timestamp }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
          
        </main>
        <div class="text-center">
            <button @click="toggleSendMessageDiv"
                class="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none"
                    style="font-size: 14px;"> <!-- Adjust the font-size as needed -->
                    Send Message
                </button>
         </div>

        <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div>
        <div v-if="successMessage" class="bg-green-500 text-white p-4 text-lg mb-4 text-center">
            {{ successMessage }}
        </div>
        <!-- Select User and Compose Message Form -->
        <div v-if="showSendMessageDiv" class="bg-grey-lighter min-h-screen flex flex-col mb-2">
            <div
                class="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2">
                    <h1 class="mb-8 text-3xl text-center">Send a Message</h1>
                    <h4>Your Email : {{ userData && userData.email ? userData.email : 'Loading...' }}</h4>
                    <!-- Select User Dropdown -->
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="receiver">Select a User:</label>
                        <select v-model="selectedUser" id="receiver" name="receiver"
                            class="block border border-gray-300 w-full p-3 rounded">
                            <option v-for="user in users" :key="user._id" :value="user._id">
                                {{ user.email }}
                            </option>
                        </select>
                    </div>
                    <!-- Message Text Area -->
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Message:</label>
                        <textarea v-model="messageText" id="message" name="message" rows="4"
                            class="block border border-gray-300 w-full p-3 rounded"></textarea>
                    </div>

                    <!-- Send Message Button -->
                    <div class="text-center">
                        <button @click="sendMessage"
                            class="w-full py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
  

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import Navbar from '../../components/Navbar.vue'
import { watch } from 'vue'
import Swal from 'sweetalert2';
import io from 'socket.io-client';

const store = useStore()

// Initialize userData ref with the current value from the store
const userData = ref(store.state.userData)
const jwtToken = ref(store.state.jwtToken)
console.log('JWT Token in Store:', store.state.jwtToken)

// Watch for changes in userData from the store
watchEffect(() => {
    // Update the value of userData when it changes in the store
    userData.value = store.state.userData
    jwtToken.value = store.state.jwtToken
})

const users = ref([]) // Initialize users as an empty array
const messages = ref([]) // Initialize messages as an empty array

// Watch for changes in the JWT token
watch(
    () => store.state.jwtToken,
    (newValue) => {
        console.log('JWT Token in Watcher:', newValue)
    }
)

const showSendMessageDiv = ref(false); // Initialize showSendMessageDiv as a ref

const toggleSendMessageDiv = () => {
    showSendMessageDiv.value = !showSendMessageDiv.value; // Toggle the variable to show/hide the div
};

// Function to load JWT token
const loadJwtToken = async () => {
    jwtToken.value = store.state.jwtToken
}
// Function to fetch messages
const getMessages = async () => {
    if (jwtToken.value) {
        try {
            const response = await axios.get('http://localhost:3000/messages/my_messages', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken.value}`
                }
            })
            messages.value = response.data
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    } else {
        console.warn('JWT token is not present. Skipping fetchMessages.')
    }
}

// Call loadJwtToken when the component is mounted
onMounted(async () => {
    await loadJwtToken() // Wait for JWT token to load
    await getMessages() // Fetch messages after JWT token is available
    console.log('Fetched Messages:', messages.value);
})

// Fetch users and populate the users array
const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/todos/users')
        users.value = response.data
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

// Call getUsers when the component is mounted
onMounted(() => {
    getUsers()
})

const messageText = ref('')
const selectedUser = ref(null) // Initialize this with the selected user's ID

const sendMessage = async () => {
    console.log('Selected User:', selectedUser.value);
    console.log('Message Text:', messageText.value);
    try {
        // Emit the message to the specific room of the receiver
        socket.emit('send_message', {
            text: messageText.value,
            receiver: selectedUser.value,
        });

        // Display a success message immediately
        await Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Your message has been sent successfully.',
        });

        // Clear the message text input
        messageText.value = '';

        // Set showSendMessageDiv to false to hide the message div
        showSendMessageDiv.value = false;
    } catch (error) {
        console.error('Error sending message:', error);
    }
};


// Function to get sender's name based on _id
const getSenderName = (senderId) => {
  const sender = users.value.find((user) => user._id === senderId)
  return sender ? sender.name : 'Unknown Sender'
}

const socket = io('http://localhost:3000');

socket.on('new_message', (message) => {
  // Handle the new message event here, e.g., display a notification
  console.log('New Message Received:', message);

  // You can use a notification library like SweetAlert or create a custom notification
  // Example using SweetAlert:
  Swal.fire({
    icon: 'info',
    title: 'New Message Received',
    text: 'You have received a new message.',
  });
});


</script>
  

  
  

  