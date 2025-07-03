import { useState } from "react";
import type { Deal } from "../features/deals/types";

const useDealForm = (initialState = {}) => {
  const [formData, setFormData] = useState<Deal>({
    client_id: "",
    title: "",
    amount: 0,
    status: "nuevo",
    close_date: "",
    notes: "",
    ...initialState,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      client_id: "",
      title: "",
      amount: 0,
      status: "nuevo",
      close_date: "",
      notes: "",
    });
  };

  return { formData, handleChange, resetForm, setFormData };
};

export default useDealForm;
