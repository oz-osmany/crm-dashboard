import { FiClipboard, FiFileText, FiMail, FiPhone, FiVideo } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect } from "react";
import { fetchClientsById } from "../features/clients/clientSlice";

const ClientInfoSidebar = () => {

  const { id } = useParams();  
  const dispatch = useAppDispatch();  
  const client = useAppSelector(state => state.clients.selectedClient);

   useEffect(() => {
      if(id){
       dispatch( fetchClientsById( id ) );       
      }
      
    }, [id, dispatch]);
  return (
    
    <aside className="cliente-sidebar">
      <div className="cliente-sidebar__header">
        <div className="cliente-sidebar__top">
          <img src="/assets/0fb173e7-bac6-4e4e-bf73-bb7c46fcc9e6.png" alt="Avatar" className="cliente-sidebar__avatar" />
        </div>
        <div>
          <h2 className="cliente-sidebar__name">{client?.name}</h2>
          <p className="cliente-sidebar__role">CEO</p>
        </div>
      </div>

      <div className="cliente-sidebar__actions">
        <div className="cliente-sidebar__icons">
            <div> 
                <div>
                  <button ><FiMail /> </button>
                  <p>Email</p>  
                </div>
            </div>
            <div>
                <div>
                  <button ><FiPhone /> </button>
                  <p>Call</p>  
                </div>
            </div>
            <div>
                <div>
                  <button ><FiFileText /> </button>
                  <p>Log</p>  
                </div>
            </div>
            <div>
                <div>
                  <button ><FiClipboard /> </button>
                  <p>Task</p>  
                </div>
            </div>
            <div>
                <div>
                  <button ><FiVideo /> </button>
                  <p>Meet</p>  
                </div>
            </div>
        </div>
        
        </div>

      <div className="cliente-sidebar__about">
        <h3>About this contact</h3>
        <p><strong>Name:</strong> {client?.name} </p>
        <p><strong>Email:</strong> {client?.email} </p>
      </div>
    </aside>
  );
};

export default ClientInfoSidebar;
