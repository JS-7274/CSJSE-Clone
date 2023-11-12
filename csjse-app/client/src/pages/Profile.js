import React, {useState, useEffect} from 'react';

const Profile = ({ user }) => {
    const [activeTab, setActiveTab] = useState('Profile-Information');

   /* useEffect(() => {
        handleTabClick('Profile Information');
    }, []); */

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <>
        <div className='profile-container'>
            <div className='profile-greeting'>Hello, {/*{user.username} */}</div>
        </div>
        <div className='profile-container'>
            <div className='sidebar'>
                <button onClick={() => handleTabClick('Profile Information')}>Profile Information</button>
                <button onClick={() => handleTabClick('Testimony')}>Testimony</button>
                <button onClick={() => handleTabClick('Resume')}>Resume</button>
            </div>
            <div className='profile-content'>
                {activeTab === 'Profile' && (
                    <div>
                    <h2>General Information</h2>
                    {/* Display general profile information here */}
                    </div>
                )}
                {activeTab === 'Testimony' && (
                    <div>
                    <h2>Testimony</h2>
                    {/* Display testimony here */}
                    </div>
                )}
                {activeTab === 'Resume' && (
                    <div>
                    <h2>Resume</h2>
                    {/* Display resume here */}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default Profile