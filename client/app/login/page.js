import './form.css'

export default function login (){

    return(
    <div>
<div className="Box">
   <div className="form-container">
	<p className="logintitle">Login</p>
	<form className="form">
		<div className="input-group">
			<label for="username">Username</label>
			<input type="text" name="username" id="username" placeholder=""/>
		</div>
		<div className="input-group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" placeholder=""/>
			<div className="forgot">
				<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
			</div>
		</div>
		<button className="sign"> Login
</button>
	</form>
	<div className="social-message">
		<div className="line"></div>
		<p className="message">Login with social accounts</p>
		<div className="line"></div>
	</div>

	<p className="signup">Don't have an account?
		<a rel="noopener noreferrer" href="/sign" className="">Sign up</a>
	</p>
</div>
</div>


</div>


);}