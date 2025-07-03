import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchDeals } from "../features/deals/dealSlice";
import { Link } from "react-router-dom";

const Deals = () => {
  const dispatch = useAppDispatch();
  const { deals, status, error } = useAppSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  return (
    <div className="deals">
      <div className="deals__header">
        <h1>Negocios</h1>
        <Link to="/dashboard/deals/nuevo" className="btn">+ Nuevo negocio</Link>
      </div>

       {status === "loading" && <p>Cargando negocios...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <ul className="deals__list">
        {deals.map((deal) => (
          <li key={deal.id} className="card">
            <div className="deals__info">
              <h3>{deal.title}</h3>
              {/* <p><strong>Cliente:</strong> {deal.client_name || "Sin nombre"}</p> */}
              <p><strong>Monto:</strong> ${deal.amount}</p>
              <p><strong>Estado:</strong> {deal.status}</p>
              <p><strong>Cierre:</strong> {deal.close_date}</p>
            </div>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default Deals;
