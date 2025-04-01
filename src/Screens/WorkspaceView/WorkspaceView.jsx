import React, { useEffect, useState } from 'react'
import './WorkspaceView.css'
import { useParams } from 'react-router-dom';

const WorkspaceView = () => {
    const { user_id } = useParams()
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await fetch(`/workspaces/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setWorkspaces(data.workspaces);
                }
            } catch (error) {
                console.error("Error al cargar workspaces:", error);
            }
        };
        if (user_id){
            fetchWorkspaces();
        }
        
    }, [user_id]);
    
  return (
    <div className='container-view'>
    <ul>
                {workspaces.map((workspace) => (
                    <li key={workspace.id}>{workspace.name}</li>
                ))}
            </ul>
    </div>
  )
}

export default WorkspaceView