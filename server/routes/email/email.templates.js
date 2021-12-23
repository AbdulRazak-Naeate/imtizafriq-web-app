const { CLIENT_ORIGIN } = require('../../config')

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.


 const confirmEmail= id => ({
    subject: 'React Confirm Email',
    html: `
      <a href='${CLIENT_ORIGIN}/dashboard/email/confirm?_id=${id}'>
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/dashboard/email/confirm?_id=${id}`
  })
  
 const confirmOrder= (data) =>({
	
    subject:'Daabia.com , We recieve your Order Successfully',
    html:`
	<table cellpadding="0" cellspacing="0" border="5" id="backgroundTable">
	<tr>
		<td>
		<table cellpadding="0" cellspacing="0" border="0" align="center">
			<tr>
				<td width="200" valign="top">Data</td>
				<td width="200" valign="top">Data</td>
				<td width="200" valign="top">Data</td>
			</tr>
		</table>


		<!-- Yahoo Link color fix updated: Simply bring your link styling inline. -->
		<a href="http://htmlemailboilerplate.com" target ="_blank" title="Styling Links" style="color: orange; text-decoration: none;">Coloring Links appropriately</a>

		
		<img class="image_fix" src="full asdf to image" alt="Your alt text" title="Your title text" width="x" height="x" />

	
		<span class="mobile_link">123-456-7890</span>

		</td>
	</tr>
	</table>

    `
  })

  module.exports.confirmEmail=confirmEmail
  module.exports.confirmOrder=confirmOrder