import { useForm } from '../lib/providers/FormContext';
import { submitFundData } from '../lib/services/firestoreService';
import AdminNav from './AdminNav';
import { NumericFormat } from "react-number-format";
import '../../src/App.css';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import ExtraDataTable from './ExtraDataTable';
import InstallmentTable from './InstallmentTable';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const AdduserForm = () => {
  const { state, dispatch } = useForm();
  const navigate = useNavigate()


  const [isInstallment, setIsInstallment] = useState(false)
  const [isExtraUser, setIsExtraUser] = useState(false)
  const [editIndex, setEditIndex] = useState(false);
  const [loading, setLoading] = useState(false)

  // Handlers for form fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating installment: ${name} = ${value}`);
    dispatch({ type: 'SET_INSTALLMENT', name, value });
  };

  const handleAddInstallment = () => {
    const { name, date, receiptNo, receivedAmount } = state.installment;

    if (!name || !date || !receiptNo || !receivedAmount) {
      alert('Please fill out all the fields.');
      return;
    }

    dispatch({ type: 'ADD_INSTALLMENT' });
    setIsInstallment(false)
    setEditIndex(false)
  };

  const handleEditInstallment = (index) => {
    console.log("Editing installment at index:", index);
    setEditIndex(true)
    dispatch({ type: 'EDIT_INSTALLMENT', index });
    setIsInstallment(true)
  };

  // Extra user data manage
  const handleExtraUserChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ExtraUser: ${name} = ${value}`);
    dispatch({ type: 'SET_EXTRAUSER', name, value });
  };

  const handleAddExtraUser = () => {
    const { name, date, relation, receivedAmount } = state.extraUser;

    if (!name || !date || !relation || !receivedAmount) {
      alert('Please fill out all the extra user fields.');
      return;
    }
    setIsExtraUser(false)
    dispatch({ type: 'ADD_EXTRAUSER' })
  }

  const handleEditExtraUser = (index) => {
    console.log("Editing extra user at index:", index);
    setIsExtraUser(true)
    dispatch({ type: 'EDIT_EXTRAUSER', index });
  };


  const handleSubmit = async (e) => {
    if (!state.username || !state.houseNumber || !state.areaCode) {
        alert('Please fill out all the extra user fields.');
      return;
    }
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'SET_ERROR', value: null });

    let installmentsToSave = [];    
    installmentsToSave = state.installments;

    let extrausersToSave = [];
    extrausersToSave = state.extraUsers;

    const formData = {
      username: state.username,
      houseNumber: state.houseNumber,
      areaCode: state.areaCode,
      address: state.address,
      mobile: state.mobile,
      totalAmount: state.totalAmount, 
      installments: installmentsToSave,
      extraUsers: extrausersToSave
    };
    setLoading(true)

    try {
      await submitFundData(formData);
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: error.message });
    } finally {
      setLoading(false)
      navigate('/user-dashboard')
    }
  };

  console.log('current load status : ', loading);
  
  return (
    <div className={` bg-primary ${ !isExtraUser || !isInstallment ? 'h-screen' : '' } `}>
      {/* loading animation  */}
      <div className='text-2xl absolute z-20 left-[48%]'>
            {
                loading ? (
                    <Loading  className = "absolute" />
                ) : ''
            }
        </div>

      <AdminNav currentSection="Add User" />
      <div className={`bg-light ${ !isExtraUser || !isInstallment ? 'h-[90%]' : '' } pb-36 rounded-xl pt-7 mx-2 sm:mx-7 flex flex-col items-center ${loading ? 'blur-sm' : ''} `}>
        <div className='text-3xl font-semibold text-secondary pb-3'>
          <h1 className='text-center'>Add User Details</h1>
        </div>
        <form  className='pt-1 md:pt-10 sm:w-[85%]'>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 my-4'>
            <div className='w-[75%] sm:w-full'>
              <label className='text-[15px] md:text-[20px]'>Enter user name</label> <br />
              <input
                className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px] focus:border-2 focus:border-primary'
                type="text"
                name="username"
                placeholder='Example: Muhammed Musthafa M'
                value={state.username}
                onChange={handleFieldChange}
                required
                autoComplete="off"
              />
            </div>
            <div className='w-[75%] sm:w-full flex gap-3'>
              <div className='w-[50%]'>
                <label className='text-[15px] md:text-[20px]'>Enter house no</label> <br />
                
                <NumericFormat
                  className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                  name="houseNumber"
                  placeholder='Example: 114'
                  value={state.houseNumber}
                  onChange={handleFieldChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className='w-[50%]'>
                <label className='text-[15px] md:text-[20px]'>Area code</label> <br />
                
                <select id="countries" 
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]
                    focus:ring-secondary focus:border-secondary ' 
                    name='areaCode'
                    value={state.areaCode }
                    onChange={(e) => {
                        dispatch({
                            type: 'SET_FIELD',
                            field: 'areaCode',
                            value: e.target.value
                        })
                    }}
                    >
                    <option value="default" className='text-'>Select Area</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                </select>
              </div>
            </div>

          </div>

          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 my-4'>
                <div className='w-[75%] sm:w-full '>
                    <label className='text-[15px] md:text-[20px]'>Address:</label> <br />
                    <input
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                    type="text"
                    name="address"
                    placeholder='Example: Al-Noor(H), Malappuram' 
                    value={state.address}
                    onChange={handleFieldChange}
                    autoComplete="off"
                    />
                </div>

                <div className='w-[75%] sm:w-full flex gap-3'>
                    <div className='w-[50%] '>
                        <label className='text-[15px] md:text-[20px]'>Enter mobile no</label>
                        
                        <NumericFormat
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                        name="mobile"
                        placeholder='Example: 7025302327'
                        value={state.mobile}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        />
                    </div>
                    <div className='w-[50%] '>
                        <label className='text-[15px] md:text-[20px]'> Total amount</label>
                        
                        <NumericFormat
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                        thousandSeparator={true}
                        name="totalAmount"
                        placeholder='Example: 100,000'
                        value={state.totalAmount}
                        onChange={handleFieldChange}
                        required
                        autoComplete="off"
                        />
                    </div>
                </div>
                
            </div>

                {/* handle buttons */}
            <div className='flex justify-center items-center pt-3 gap-3'>
                <button
                  className='bg-secondary text-light rounded-md text-center p-2 '
                  type="button"
                  onClick= {() => setIsInstallment(!isInstallment)}
                >
                  Add installment
                </button>

                <button
                  className='bg-secondary text-light rounded-md text-center p-2 '
                  type="button"
                  onClick={() => setIsExtraUser(!isExtraUser)}
                >
                  Add extra user
                </button>
              </div>


          
          {/* Installment Div Start Here.... */}
          <div className={`flex-col justify-center items-center ${isInstallment ? 'flex' : 'hidden' } `}>
            <div className='flex justify-start w-[75%] sm:w-full items-start pl-20'>
              <label className='text-start text-[15px] md:text-[20px]'>Add Installments</label>
            </div>
            <div className='w-[75%] sm:w-full flex flex-col border border-primary py-5 px-2 sm:px-8 bg-dark rounded-md'>
              <div className='gap-12 my-4'>
                <div className='w-full flex gap-3'>
                  <div className='w-[50%]'>
                    <label className='text-[15px] md:text-[20px]'>Select installment</label>
                    <FormControl fullWidth>
                        <Select
                            labelId="installment-select-label"
                            id="installment-select"
                            name="name"
                            value={state.installment.name || "default"}
                            onChange={(e) => {
                            dispatch({
                                type: 'SET_INSTALLMENT',
                                name: 'name',
                                value: e.target.value,
                            });
                            }}
                            sx={{
                            width: '100%',
                            border: '1px solid',
                            borderColor: '#626F47', 
                            borderRadius: '7px',
                            backgroundColor: '#FEFAE0', 
                            padding: '2px 8px',
                            fontWeight: 500,
                            fontSize: '15px',
                            color: '#626F47',
                            '& .MuiSelect-select': {
                                padding: '8px 12px',
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '15px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                            },
                            '& .MuiMenuItem-root': {
                                fontSize: '15px',
                            },
                            '&:focus': {
                                borderColor: 'primary.main', // Focus border color, change as needed
                            },
                            // Add responsive font-size for md screen
                            '@media (min-width: 768px)': {
                                fontSize: '20px',
                            },
                            }}
                        >
                            <MenuItem value="default">--Select an option--</MenuItem>

                            {!editIndex && state.installments.length === 0 ? ( 
                                <MenuItem value="Installment 1">Installment 1</MenuItem>
                                )  :  (
                                <MenuItem value="Installment 1">Installment 1</MenuItem>

                            )}

                            { state.installments.length > 0 && state.installments.length < 5 && (
                            <MenuItem value={`Installment ${state.installments.length + 1}`}>
                                Installment {state.installments.length + 1}
                            </MenuItem>
                            )}

                        </Select>
                        </FormControl>

                  </div>
                  <div className='w-[50%]'>
                    <label className='text-[15px] md:text-[20px]'>Installment date</label>
                    <input
                      className='w-full border px-1 border-secondary text-secondary rounded-md bg-light py-2 font-medium text-[14px] md:text-[20px] placeholder:text-primary placeholder:text-[13px]'
                      type="date"
                      name="date"
                      value={state.installment.date}
                      onChange={handleInstallmentChange}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className='w-full flex gap-3 '>
                  <div className='w-[50%]'>
                    <label className='text-[15px] md:text-[20px]'>Receipt no</label>
                    <NumericFormat
                      className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                      name="receiptNo"
                      placeholder='Example: 206'
                      value={state.installment.receiptNo}
                      onChange={handleInstallmentChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className='w-[50%]'>
                    <label className='text-[15px] md:text-[20px]'>Received amount</label>
                    <NumericFormat
                      className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                      thousandSeparator={true}
                      name="receivedAmount"
                      placeholder='Example: 50,000'
                      value={state.installment.receivedAmount}
                      onChange={handleInstallmentChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>


              <div className='flex justify-center items-center pt-3'>
                <button
                  className='bg-secondary text-light rounded-md text-center p-2 '
                  type="button"
                  onClick={handleAddInstallment}
                >
                  Add Installment
                </button>
              </div>
            </div>
          </div>
          {/* Installment Div Ends Here.... */}

          {/* Extra user Div Starts Here... */}
          <div className={`flex-col justify-center items-center ${isExtraUser ? 'flex' : 'hidden' } pt-5`}>
            <div className='flex justify-start w-[75%] sm:w-full items-start'>
              <label className='text-start text-[15px] md:text-[20px]'>Add Extra User</label>
            </div>
            <div className='w-[75%] sm:w-full flex flex-col border border-primary py-5 px-2 sm:px-8 bg-dark rounded-md'>
                <div className='w-full flex flex-col gap-3 sm:flex-row  '>
                    <div className='w-full sm:w-[50%] gap-3 flex '>
                        <div className='w-[50%]'>
                            <label className='text-[15px] md:text-[20px]'>Enter user name</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            type="text"
                            name="name"
                            placeholder='Example: Ahamed'
                            value={state.extraUser.name}
                            autoComplete="off"
                            onChange={(e) => {
                            dispatch({
                                type: 'SET_EXTRAUSER',
                                name: 'name',
                                value: e.target.value,
                            });
                            }}
                            />
                        </div>

                        <div className='w-[50%]'>
                            <label className='text-[15px] md:text-[20px]'>Enter Date</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            type="date"
                            name="date"
                            value={state.extraUser.date}
                            onChange={handleExtraUserChange}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    
                    <div className='w-full sm:w-[50%] gap-3 flex '>
                        <div className='w-[50%] '>
                            <label className='text-[15px] md:text-[20px]'>Relation</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            type='text'
                            name="relation"
                            placeholder='Example: Father'
                            value={state.extraUser.relation}
                            onChange={handleExtraUserChange}
                            autoComplete="off"
                            />   
                        </div>
                        <div className='w-[50%]'>
                            <label className='text-[15px] md:text-[20px]'>Received amount</label>
                            <NumericFormat
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            thousandSeparator={true}
                            name="receivedAmount"
                            placeholder='Example: 50,000'
                            value={state.extraUser.receivedAmount}
                            onChange={handleExtraUserChange}
                            autoComplete="off"
                            />   
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center pt-3'>
                <button
                  className='bg-secondary text-light rounded-md text-center p-2 '
                  type="button"
                  onClick={handleAddExtraUser}
                >
                  Add Extra User
                </button>
              </div>
            </div>
          </div>
            {/* Extra user Div Ends Here... */}

            <div className='w-full flex flex-col sm:flex-row gap-3 pt-7'>
                {/* installments display */}
                <div className='w-full sm:w-[50%] px-12 sm:px-0'>
                    { state.installments.length > 0 && 
                      <>
                        <h1>Added installments</h1>
                        <InstallmentTable onEditInstallment={handleEditInstallment} />
                      </>
                    }
                </div>

                {/* extra user data */}
                <div className='w-full sm:w-[50%] px-12 sm:px-0'>
                    { state.extraUsers.length > 0 && 
                      <>
                        <h1>Added users</h1>
                        <ExtraDataTable onEditExtraUser={handleEditExtraUser} />
                      </>
                    }
                </div>
            </div>
            

          <div className='flex justify-center pt-4 gap-4' >
            <button
              type="submit"
              onClick={handleSubmit}
              className='bg-secondary text-dark py-2 px-5 rounded-md text-center text-[20px] '
            >
              Submit user data
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdduserForm;

