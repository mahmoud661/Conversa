<<<<<<< HEAD
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
=======
import { data } from 'autoprefixer';
import './from.css'
import { Suspense } from 'react';

export default async function sign (){

	await new Promise( (resolve)=> {
		setTimeout(() => {
			resolve();
		}, 2000);
			},);

      const response = await fetch("http://localhost:4000/api",{
		cache:'no-cache',
	  });
      
	  const data = await response.json();

	
    return (
      <div>
       
        <div className="Box">
          <div className="form-container">
            <p className="logintitle">Sign up</p>
            <form className="form">
              <div className="input-group">
                <label>Username</label>
                <input type="text" id="username" placeholder="" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="" />
              </div>
              <div className="input-group">
                <label>conform Password</label>
                <input type="password" id="conform-password" placeholder="" />
              </div>
              <button className="sign"> Sign up</button>
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
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
