import React from 'react';
import { useRole } from '../../context/RoleContext';

const Settings = () => {
    const { role, setRole } = useRole();
    return (
        <div className="">
            <h2 className="text-xl font-bold mb-4 bg-primary text-base-300 p-5 text-center rounded-field">Role Settings</h2>

         
            <div className='text-center'>
                <select defaultValue="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="select select-xl">
                    <option disabled={true}>Pick a role here </option>
                    <option value="Viewer">Viewer</option>
                    <option value="Admin">Admin</option>
                </select>

                <p className="mt-3 text-primary font-bold text-3xl">Current Role: {role}</p>
            </div>


            <p className="text-xs text-base-content font-medium lg:px-50 md:px-50 py-20 mb-5">The Role Settings feature allows users to switch between different access levels within the application, specifically between Viewer and Admin roles. This functionality is implemented using a global state management approach to ensure that the selected role is applied consistently across the entire dashboard. When the role is set to Viewer, users can only view financial data, including summaries, charts, and transaction lists, without the ability to modify any information. In contrast, selecting the Admin role enables additional capabilities such as adding, editing, and deleting transactions. The selected role is also persisted using local storage, ensuring that the user’s preference remains intact even after refreshing the page. This approach simulates a basic role-based access control system on the frontend, enhancing both usability and interaction within the application.
            </p>
        </div>
    );
};

export default Settings;