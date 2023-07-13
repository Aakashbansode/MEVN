import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import axios from 'axios';


const Airbnb = () => {
       
      const error = ref('');
      const successMessage = ref('');

      const airbnb = 
        ref({   
          name: '',
        listingsAndReviews: {}
    });

    const showFullDescriptionFlag = ref({});

  const toggleFullDescription = (itemId) => {
    showFullDescriptionFlag.value[itemId] = !showFullDescriptionFlag.value[itemId];
  };


    const GetAll_airbnbdata = async () => {
      try {
        await fetch("http://localhost:3000/users/airbnbdata")
          .then((res) => res.json())
          .then((data) => {
            console.log(data); // Log the received data
            airbnb.value.listingsAndReviews = data;
          });
      } catch (error) {
        console.log(error);
      }
    };
    
   
    
    const room = ref({   
    });
    
    // const getspecificroom = async (roomId) => {
    //   try {
    //     const response = await axios.get(`http://localhost:3000/users/room/${roomId}`);
    //     room.value = response.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const getspecificroom = async (roomId) => {
      try {
        const response = await fetch(`http://localhost:3000/users/room/${roomId}`);
        if (response.ok) {
          const data = await response.json();
          room.value = data;
          console.log('New room data:', room.value);
        } else {
          throw new Error('Failed to fetch room data');
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    

  // Add the CreateAccount function to the module exports
  return { 
    GetAll_airbnbdata, 
    airbnb,
    showFullDescriptionFlag,
    toggleFullDescription,
    getspecificroom,
    room,

  }
}
export default Airbnb;