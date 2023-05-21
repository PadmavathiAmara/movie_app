import './Users.scss';

export const Users = () => {

    let users = JSON.parse(localStorage.getItem("UsersList"));
    console.log(users);
    users.map((u) => {
        console.log(u.Username);
    })
    return (
        <div className="users">
            <div>
                <h2>Users Info</h2>
            </div>
            {users ? <div className="tableDiv">
               <div id='head'>
                <div className='un' id='un'>USERNAME</div>
                <div className='email' id='email'>EMAILID</div>
                <div className='mobile' id='mobile'>MOBILENO</div>
                <div className='gen' id='gen'>GENDER</div>
               </div>
                {users.map((user) => {
                   return <div id='row'>
                    <div className='un'>{user.Username}</div>
                    <div className='email'>{user.EmailId}</div>
                    <div className='mobile'>+91 {user.MobileNo}</div>
                    <div className='gen'>{user.Gender}</div>
                   </div>
                })}


            </div> : "No Users registered!"}



        </div>
    )
}
export default Users;