import { useForm } from '../lib/providers/FormContext';
import { submitFundData } from '../lib/services/firestoreService';
import AdminNav from './AdminNav';
import { NumericFormat } from "react-number-format";
import '../../src/App.css';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdduserForm = () => {
  const { state, dispatch } = useForm();


  

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
    console.log('name: ', name + " date:", date + ' receiptNo : ', receiptNo + ' receivedAmount :', receivedAmount);

    if (!name || !date || !receiptNo || !receivedAmount) {
      alert('Please fill out all the fields.');
      return;
    }

    dispatch({ type: 'ADD_INSTALLMENT' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'SET_ERROR', value: null });

    let installmentsToSave = [];
    if (state.amountPaid < state.totalAmount) {
      installmentsToSave = state.installments;
    }

    const formData = {
      username: state.username,
      houseNumber: state.houseNumber,
      areaCode: state.areaCode,
      address: state.address,
      mobile: state.mobile,
      totalAmount: state.totalAmount,
      installments: installmentsToSave,
    };

    try {
      await submitFundData(formData);
      alert('Data submitted successfully!');
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return (
    <div className='bg-primary '>
      <AdminNav currentSection="Add User" />
      <div className='bg-light pb-36 rounded-xl mx-7 pt-7 sm:px-16 md:px-24 flex flex-col items-center'>
        <div className='text-3xl font-semibold text-secondary pb-3'>
          <h1 className='text-center'>Add User Details</h1>
        </div>
        <form onSubmit={handleSubmit} className='pt-1 md:pt-10 sm:w-[85%]'>
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
                    required
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
                        required
                        />
                    </div>
                    <div className='w-[50%] '>
                        <label className='text-[15px] md:text-[20px]'> Total amount</label>
                        {/* 
                    <NumericFormat
                      thousandSeparator={true}
                      name="receivedAmount"
                      placeholder='Example: 50 000'
                      value={state.installment.receivedAmount}
                      onChange={handleInstallmentChange}
                    />
                 */}
                        <NumericFormat
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                        thousandSeparator={true}
                        name="totalAmount"
                        placeholder='Example: 100,000'
                        value={state.totalAmount}
                        onChange={handleFieldChange}
                        required
                        />
                    </div>
                </div>
                
            </div>


          {/* Installment Div Start Here.... */}
          <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-start w-[75%] sm:w-full items-start'>
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

                            {state.installments.length === 0 && (
                            <MenuItem value="First installment">Installment 1</MenuItem>
                            )}

                            {state.installments.length > 0 && state.installments.length < 3 && (
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
                    />
                  </div>
                </div>

                <div className='w-full flex gap-3'>
                  <div className='w-[50%]'>
                    <label className='text-[15px] md:text-[20px]'>Receipt no</label>
                    <input
                      className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                      type="text"
                      name="receiptNo"
                      placeholder='Example: 206'
                      value={state.installment.receiptNo}
                      onChange={handleInstallmentChange}
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
                  Add installment
                </button>
              </div>
            </div>
          </div>
          {/* Installment Div Ends Here.... */}

          <div>
                <h3>Installments:</h3>
                <ul>
                {state.installments.map((inst, index) => (
                    <li key={index}>{inst.name} - {inst.date} - {inst.receiptNo} - {inst.receivedAmount}</li>
                ))}
                </ul>
            </div>



          <div className='flex justify-center pt-4 gap-4' >
          <button
              className='bg-primary text-dark p-3 rounded-md text-center'
            >
               Include Extra user
            </button>

            <button
              type="submit"
              className='bg-primary text-dark p-3 rounded-md text-center'
            >
              Add user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdduserForm;
