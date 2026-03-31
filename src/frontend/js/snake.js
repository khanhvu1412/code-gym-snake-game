function togglePassword(id, icon){

    let input = document.getElementById(id);

    if(input.type === "password"){
        input.type = "text";
        icon.textContent = "🙉";
    }else{
        input.type = "password";
        icon.textContent = "🙈";
    }

}