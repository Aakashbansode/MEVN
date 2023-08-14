import { ref,computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';



const Filters = () => {


    const applyFilters = async () => {
        console.log('applyFilters function called');
        // Prepare your payload with selected filter options
        const payload = {
          country: selectedCountry.value,
          amenities: selectedAmenities.value,
          bedrooms: selectedBedrooms.value,
          propertyTypes: selecteduniquePropertyTypes.value,
          roomNames: selectedRoomNames.value,
          reviewRange: reviewRange.value,
          priceRange: priceRange.value,
        };
    
        // Send the payload to the server and fetch data based on filters
        try {
          const response = await fetch('your-server-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            const data = await response.json();
            // Handle the received data as needed
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error(error);
        }
    
        dialog.value = false; // Close the dialog after applying filters
      };




 // Add the CreateAccount function to the module exports
 return {
    applyFilters
    
  };
};

export default Filters;

