import axios from "Axios"
export const compile = async () => {
    console.log("called")
    var program = {
        script : "print('hello')",
        language: "python",
        versionIndex: "0",
        clientId: "b4d6d069cdf55120c81c4eda72b5312d",
        clientSecret:"86e7cd0feb8c0ba1cfcf769ede27985a80d8bd66005bdf488255903fd0b6efc5"
    };
    return axios({
        method: 'get',
        url: 'http://dummy.restapiexample.com/api/v1/employees',
        headers: {
            'Content-Type': "application/json",
        }
    }).catch(e=>{
        console.log("e",e)
    });
       
        
    

}