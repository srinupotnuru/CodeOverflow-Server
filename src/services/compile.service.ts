import axios from "Axios"
export const compile = async (program:any) => {

    const options:any = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': '9c49072fe1mshdd34de97cf2d4a2p1ee385jsn414d8b5996eb'
        },
        data: program
      };
      
      axios.request(options).then(function (response) {
        const token = response.data.token;
        const submissionOptions:any = {
          method: 'GET',
          url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
          params: {base64_encoded: 'true', fields: '*'},
          headers: {
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': '9c49072fe1mshdd34de97cf2d4a2p1ee385jsn414d8b5996eb'
          }
        };
        
        axios.request(submissionOptions).then(function (resp) {
          return resp;
        }).catch(function (error) {
          console.error(error);
        });
      }).catch(function (error) {
          console.error(error);
      });

      
}