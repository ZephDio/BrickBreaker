
class Contact{
    constructor(email,username,password,confirmepassword){
        this.email= email;
        this.username=username;
    }
    
    setPassword(password,confirmpassword){
        if (password === confirmpassword){
            this.password = password;
        }
    }
    
    isContactValid(){
        let checker = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        if (!checker.test(this.email)) {
                console.log(this.email)
                return 'email invalid reglette'
            }
        let namelength = this.username.length
        if(namelength<=3){
            return 'Username is too short'
        }else if(namelength>14){
            return 'Username is too long'
        }
        for(const charactere of this.username){
            if(charactere === " "){
                return 'space inside Username unallowed'
            }
        }
        if(this.password === undefined){
            return 'password not matching'
        }
        return 'valid'
    }
  
}






new Vue({ 
    el: '.cardregister',
    data: {
        Username: "",
        email: "",
        Password: "",
        ConfirmPassword: "",
        phone : ""
    },
    
    methods:
    {
        createContact(){

           const contact = new Contact(this.email,this.Username)
           console.log(this.Password + " " + this.ConfirmPassword)
           contact.setPassword(this.Password,this.ConfirmPassword)
           console.log(contact)
           if(contact.isContactValid()=== 'valid'){
              //ECRIRE ICI SUR LE JSON
           }
        }
    }
    
});