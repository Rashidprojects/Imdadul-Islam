import { useEffect, useState } from "react";
import { useForm } from "../providers/FormContext";
import { submitFundData } from "../services/firestoreService";
import { useNavigate } from "react-router-dom";

export const useAddUserForm = () => {
  const { state, dispatch } = useForm();

  const [editIndex, setEditIndex] = useState(false);  
  const [isData, setIsData] = useState(false)
  const navigate = useNavigate()
  

  const installmentSum = state.installments.reduce((sum, installment) => {
    const receivedAmount = installment.receivedAmount.replace(/,/g, '');
    return sum + (Number(receivedAmount) || 0);
  }, 0);

  const extraUsersSum = state.extraUsers.reduce((sum, extraUser) => {
    const receivedAmount = extraUser.receivedAmount.replace(/,/g, '');
    return sum + (Number(receivedAmount) || 0);
  }, 0);

  const totalRecieved = installmentSum + extraUsersSum

  const subTotal = 
  (Number(state.totalAmount.replace(/,/g, '')) || 0) + 
  (Number(extraUsersSum) || 0);
  
  console.log('subTotal : ', subTotal);
  
  console.log('total amount on add form : ', state.totalAmount.replace(/,/g, ''));
  console.log('total recieved on add form : ', totalRecieved);  
  
  const pending = state.totalAmount.replace(/,/g, '') - installmentSum

  console.log('current state is : ', state); 
  
  useEffect(() => {
    dispatch({ type: 'SET_FIELD', field: 'totalReceived', value: totalRecieved });
    dispatch({ type: 'SET_FIELD', field: 'pending', value: pending });
    dispatch({ type: 'SET_FIELD', field: 'subTotal', value: subTotal });
  },[totalRecieved, pending, subTotal])
  

  console.log('total amount on add form : ', state.totalAmount.replace(/,/g, ''));
  console.log('total recieved : ', totalRecieved); 



  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_INSTALLMENT', name, value });
  };

  const handleAddInstallment = () => {
    if ( !state.installment.date || !state.installment.receivedAmount) { 
      alert('Complete all installment fields.');
      return;
    }
    dispatch({ type: 'ADD_INSTALLMENT' });
    setEditIndex(false);
    setIsData(true)
  };

  const handleEditInstallment = (index) => {
    setEditIndex(true);
    dispatch({ type: 'EDIT_INSTALLMENT', index })
  }

  const handleIsInstallment = () => {
    const newValue = !state.isInstallment;
    dispatch({ type: 'SET_IS_INSTALLMENT', value: newValue })
  }

  const handleExtraUserChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_EXTRAUSER', name, value });
  };

  const handleAddExtraUser = () => {
    if (!state.extraUser.name || !state.extraUser.date) {
      alert('Complete all extra user fields.');
      return;
    }
    dispatch({ type: 'ADD_EXTRAUSER' });
    setIsData(true)
  };

  const handleIsExtraUser = () => {
    const newValue = !state.isExtraUser;
    dispatch({ type: 'SET_IS_EXTRAUSER', value: newValue })
  }
  

  const handleSubmit = async (e) => {
    if (!state.username || !state.houseNumber || !state.areaCode) {
        alert('Please fill out all the user fields.');
      return;
    }
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', value: true });

    try {
      await submitFundData(state);
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
      navigate('/user-dashboard')
    }
  };

  return {
    state, dispatch,
    handlers: {
      handleFieldChange,
      handleIsInstallment,
      handleInstallmentChange,
      handleAddInstallment,
      handleEditInstallment,
      handleIsExtraUser,
      handleExtraUserChange,
      handleAddExtraUser,
      handleSubmit,
    },
    uiState: { editIndex, isData },
  };
};
