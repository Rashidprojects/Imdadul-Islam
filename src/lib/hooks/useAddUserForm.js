import { useEffect, useState } from "react";
import { useForm } from "../providers/FormContext";
import { submitFundData } from "../services/firestoreService";

export const useAddUserForm = () => {
  const { state, dispatch } = useForm();
  const [editIndex, setEditIndex] = useState(false);  

  console.log('hello from kdy : ', state.installments);

  const installmentSum = state.installments.reduce((sum, installment) => {
    const receivedAmount = installment.receivedAmount.replace(/,/g, '');
    return sum + (Number(receivedAmount) || 0);
  }, 0);

  const extraUsersSum = state.extraUsers.reduce((sum, extraUser) => {
    const receivedAmount = extraUser.receivedAmount.replace(/,/g, '');
    return sum + (Number(receivedAmount) || 0);
  }, 0);

  const totalRecieved = installmentSum + extraUsersSum
  const pending = state.totalAmount.replace(/,/g, '') - totalRecieved

  console.log('installment sum = ', pending);

  
  useEffect(() => {
    
    dispatch({ type: 'SET_FIELD', field: 'totalReceived', value: totalRecieved });
    dispatch({ type: 'SET_FIELD', field: 'pending', value: pending });


  },[totalRecieved])

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_INSTALLMENT', name, value });
  };

  const handleAddInstallment = () => {
    if (!state.installment.name || !state.installment.date) {
      alert('Complete all installment fields.');
      return;
    }
    dispatch({ type: 'ADD_INSTALLMENT' });
    updateTotalReceived(); // Recalculate total after adding an installment
    setEditIndex(false);
  };

  const handleIsInstallment = () => {
    const newValue = !state.isInstallment;
    dispatch({ type: 'SET_IS_INSTALLMENT', value: newValue })
    console.log('Add Installment button clicked, isInstallment:', newValue); // Debugging log
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
    updateTotalReceived(); // Recalculate total after adding an extra user
  };

  const handleIsExtraUser = () => {
    const newValue = !state.isExtraUser;
    dispatch({ type: 'SET_IS_EXTRAUSER', value: newValue })
    console.log('Add Extra User button clicked, isExtraUser:', newValue); // Debugging log
  }

  const calculateTotalReceived = (installments, extraUsers) => {
    console.log('Installments:', installments);
    console.log('Extra Users:', extraUsers);
    const installmentSum = installments.reduce(
      (sum, installment) => sum + (Number(installment.receivedAmount) || 0),
      0
    );
    console.log('Installment Sum:', installmentSum);
    const extraUserSum = extraUsers.reduce(
      (sum, extraUser) => sum + (Number(extraUser.receivedAmount) || 0),
      0
    );
    console.log('Extra User Sum:', extraUserSum);

    return installmentSum + extraUserSum;
  };

  const updateTotalReceived = () => {
    console.log('Calling calculateTotalReceived...');
    const total = calculateTotalReceived(state.installments, state.extraUsers);
    console.log('Total Received:', total);
    dispatch({ type: 'SET_FIELD', field: 'totalReceived', value: total });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', value: true });

    try {
      await submitFundData(state);
      alert('Data submitted successfully!');
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return {
    state, dispatch,
    handlers: {
      handleFieldChange,
      handleIsInstallment,
      handleInstallmentChange,
      handleAddInstallment,
      handleIsExtraUser,
      handleExtraUserChange,
      handleAddExtraUser,
      handleSubmit,
    },
    uiState: { editIndex },
  };
};
