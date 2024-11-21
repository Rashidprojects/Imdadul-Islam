// FormContext.jsx
import { createContext, useReducer, useContext } from 'react';

// Initial state for the form
const initialState = {
  username: '',
  houseNumber: '',
  areaCode: '',
  address: '',
  mobile: '',
  totalAmount: '',
  installments: [],
  installment: { name: '', date: '', receiptNo: '', receivedAmount: '' }, // Added receivedAmount
  amountPaid: '',
  isLoading: false,
  error: null,
};

// Action types
const SET_FIELD = 'SET_FIELD';
const SET_INSTALLMENT = 'SET_INSTALLMENT';
const ADD_INSTALLMENT = 'ADD_INSTALLMENT';
const RESET_FORM = 'RESET_FORM';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Reducer function to manage state
const formContextReducer = (state, action) => {
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [action.field]: action.value };
    case SET_INSTALLMENT:
      return { ...state, installment: { ...state.installment, [action.name]: action.value } };
    case ADD_INSTALLMENT:
      return { ...state, installments: [...state.installments, state.installment], installment: { name: '', date: '', receiptNo: '', receivedAmount: '' } }; // Reset receivedAmount
    case RESET_FORM:
      return initialState;
    case SET_LOADING:
      return { ...state, isLoading: action.value };
    case SET_ERROR:
      return { ...state, error: action.value };
    default:
      return state;
  }
};

// Create context
const FormContext = createContext();

// Context provider component
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formContextReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to access the context
export const useForm = () => useContext(FormContext);