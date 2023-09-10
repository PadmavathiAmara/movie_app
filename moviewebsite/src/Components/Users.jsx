import './Users.scss';
import Person3Icon from '@mui/icons-material/Person3';
import Face3Icon from '@mui/icons-material/Face3';

export const Users = () => {

    let users = JSON.parse(localStorage.getItem("UsersList"));
    console.log(users);
    // users.map((u) => {
    //     console.log(u.Username);
    // })
    return (
        <div className="users">
            <div>
                <h2>Users Info</h2>
            </div>
            {users ? <div className="tableDiv">
               <div id='head'>
                <div className='un' id='un'>USERNAME</div>
                <div className='email' id='email'>EMAIL ID</div>
                <div className='mobile' id='mobile'>MOBILE NO</div>
                <div className='gen' id='gen'>GENDER</div>
               </div>
               <div>
               {users.map((user) => {
                   return <div id='row'>
                    <div className='un'><div>{user.Gender=="female" ? <Face3Icon/> : <Person3Icon/>}
                    </div>{user.Username}</div>
                    <div className='email'>{user.EmailId}</div>
                    <div className='mobile'>+91 {user.MobileNo}</div>
                    <div className='gen'>{user.Gender}</div>
                   </div>
                })}
                </div>
                


            </div> : <h3><i>No Users registered!</i></h3>}



        </div>
    )
}
export default Users;