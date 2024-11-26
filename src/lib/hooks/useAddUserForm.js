import { useState } from 'react';
import { useForm } from '../providers/FormContext';
import { submitFundData } from '../services/firestoreService';

export const useAddUserForm = () => {
  const { state, dispatch } = useForm();

  const [editIndex, setEditIndex] = useState(false);

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
    setEditIndex(false)
  };

  const handleIsInstallment = () => {
    const newValue = !state.isInstallment;
    dispatch({ type: 'SET_IS_INSTALLMENT', value: newValue })
    console.log('Add Installment button clicked, isInstallment:', newValue); // Debugging log
  }

  const handleIsExtraUser = () => {
    const newValue = !state.isExtraUser;
    dispatch({ type: 'SET_IS_EXTRAUSER', value: newValue })
    console.log('Add Extra User button clicked, isExtraUser:', newValue); // Debugging log
  }

  const handleEditInstallment = (index) => {
    console.log("Editing installment at index:", index);
    setEditIndex(true)
    dispatch({ type: 'EDIT_INSTALLMENT', index });
  };


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
    state,
    dispatch,
    handlers: {
      handleFieldChange,
      handleInstallmentChange,
      handleAddInstallment,
      handleIsInstallment,
      handleEditInstallment,
      handleExtraUserChange,
      handleAddExtraUser,
      handleIsExtraUser,
      handleSubmit,
    },
    uiState: { editIndex, },
  };
};

/*  This states usage :-

    const AddUserForm = () => {
    const {
        state,
        handlers: {
        handleFieldChange,
        handleInstallmentChange,
        handleAddInstallment,
        handleExtraUserChange,
        handleAddExtraUser,
        handleSubmit,
        toggleInstallmentForm,
        toggleExtraUserForm,
        },
        uiState: { isInstallment, isExtraUser },
    } = useAddUserForm();

*/
