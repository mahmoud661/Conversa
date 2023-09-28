import './from.css'

export default function sign (){

    return(
    <div>
<div className="Box">
   <div className="form-container">
	<p className="logintitle">Sign up</p>
	<form className="form">
		<div className="input-group">
			<label for="username">Username</label>
			<input type="text" name="username" id="username" placeholder=""/>
		</div>
		<div className="input-group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" placeholder=""/>
		</div>
        <div className="input-group">
			<label for="password">conform Password</label>
			<input type="password" name="password" id="password" placeholder=""/>
		</div>
		<button className="sign"> Sign up
</button>
	</form>
	<div className="social-message">
		<div className="line"></div>
		<p className="message">Login with social accounts</p>
		<div className="line"></div>
	</div>

	
</div>
</div>


</div>


);}