
function changeVis(input) {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
} 

export const Password = ({ value, onChange}) => (
    <div className="login-page-inputs-password ">
        <input 
            className="login-page-box-inputs-password-input" 
            type="password" 
            placeholder="Password" 
            id="pass"
            value={value}
            onChange={onChange}
        />
        <button 
            className="login-page-box-inputs-password-show_button " 
            src={show}  
            onClick={changeVis}
        />
    </div>
);