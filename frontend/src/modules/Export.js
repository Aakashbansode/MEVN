import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const Export = () => {

    const export_user = ref({
        email: '',
        age: '',
      });

      const error = ref('');
      const successMessage = ref('');

      const users_export = () => {
        const email = export_user.value.email;
        const age = export_user.value.age;
      
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            age: age
          })
        };
      
        fetch('http://localhost:3000/users/export', requestOptions)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          })
          .catch(error => {
            console.error(error);
            error.value = 'Failed to export file.';
            successMessage.value = '';
          });
      };
      
      





    return {
        users_export,
        export_user,
        error,
        successMessage,
      }

};
export default Export;



