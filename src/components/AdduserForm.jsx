import { useForm } from '../lib/providers/FormContext';
import { submitFundData } from '../lib/services/firestoreService';
import AdminNav from './AdminNav';
import { NumericFormat } from "react-number-format";

const AdduserForm = () => {
  const { state, dispatch } = useForm();

  // Handlers for form fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_INSTALLMENT', name, value });
  };

  const handleAddInstallment = () => {
    dispatch({ type: 'ADD_INSTALLMENT' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'SET_ERROR', value: null }); // Clear previous errors

    let installmentsToSave = [];
    if (state.amountPaid < state.totalAmount) {
      installmentsToSave = state.installments; // Save installments if they haven't paid the full amount
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
      // Submit data to Firestore
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
    <div className='bg-primary h-screen '>

        <AdminNav currentSection= "Add User"  />

        <div className='bg-light h-screen rounded-xl mx-7 pt-7 px-12 flex flex-col items-center'>
            <div className='text-3xl font-semibold text-secondary pb-3'>
                <h1 className='text-center'>Add User Details</h1>
            </div>
          <form onSubmit={handleSubmit} className='pt-1 md:pt-10'>

            <div className='flex justify-center items-center gap-12 my-4'>
                <div className='w-full'>
                    <label className='text-[20px]'>Enter user name</label> <br />
                    <input
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]  '
                    type="text"
                    name="username"
                    placeholder='Example: Muhammed Musthafa M'
                    value={state.username}
                    onChange={handleFieldChange}
                    required
                    />
                </div>
                <div className='w-full flex gap-3'>
                    <div className='w-[50%] '>
                        <label className='text-[20px]'>Enter house number</label> <br />
                        <input
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                        type="text"
                        name="houseNumber"
                        placeholder='Example: 114 '
                        value={state.houseNumber}
                        onChange={handleFieldChange}
                        required
                        />
                    </div>

                    <div className='w-[50%]'>
                    <label className='text-[20px]'>Area Code:</label> <br />
                    <input
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                    type="text"
                    name="areaCode"
                    placeholder='Example: A1 '
                    value={state.areaCode}
                    onChange={handleFieldChange}
                    required
                    />
                </div>
                </div>
                
            </div>

            <div className='flex justify-center items-center gap-12 my-4 '>
                <div className='w-full '>
                    <label className='text-[20px]'>Address:</label> <br />
                    <input
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                    type="text"
                    name="address"
                    placeholder='Example: Al-Noor(H), Malappuram' 
                    value={state.address}
                    onChange={handleFieldChange}
                    required
                    />
                </div>

                <div className='w-full flex gap-3'>
                    <div className='w-[50%] '>
                        <label className='text-[20px]'>Enter mobile no</label>
                        <input
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                        type="text"
                        name="mobile"
                        placeholder='Example: 7025302327'
                        value={state.mobile}
                        onChange={handleFieldChange}
                        required
                        />
                    </div>
                    <div className='w-[50%] '>
                        <label className='text-[20px]'> Enter total amount</label>
                        <input
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                        type="number"
                        name="totalAmount"
                        placeholder='Example: 100000'
                        value={state.totalAmount}
                        onChange={handleFieldChange}
                        required
                        />
                    </div>
                </div>
                
            </div>

            <label className='text-[20px]'>Add Installments</label>
            <div className='w-full border border-primary py-5 px-8  bg-dark rounded-md'>
                <div className='flex justify-center items-center gap-12 my-4 '>
                    <div className='w-full flex gap-3'>
                        <div className='w-[50%] '>
                            <label className='text-[20px]'>Select installment</label>
                            <input
                                className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                            type="text"
                            name="name"
                            placeholder='Example: First installment'
                            value={state.installment.name}
                            onChange={handleInstallmentChange}
                            />
                        </div>
                        <div className='w-[50%] '>
                            <label className='text-[20px]'>Installment date</label>
                            <input
                                className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                            type="date"
                            placeholder='21-11-2024'
                            name="date"
                            value={state.installment.date}
                            onChange={handleInstallmentChange}
                            />
                        </div>
                    </div>

                    <div className='w-full flex gap-3'>
                        <div className='w-[50%] '>
                            <label className='text-[20px]'>Receipt no</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                            type="text"
                            name="receiptNo"
                            placeholder='Example: 206'
                            value={state.installment.receiptNo}
                            onChange={handleInstallmentChange}
                            />
                        </div>
                        <div className='w-[50%] '>
                            <label className='text-[20px]'>Received amount</label>
                            <NumericFormat
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[20px] placeholder:text-primary placeholder:text-[16px]'
                            thousandSeparator={true} // Adds commas for readability
                            name="receivedAmount"
                            placeholder='Example: 50 000'
                            value={state.installment.receivedAmount}
                            onChange={handleInstallmentChange}
                            
                            />
                        </div>
                    </div>
      
                </div>
                
                <div className='flex justify-center items-center pt-3'>
                    <button className='bg-secondary text-light px-3 py-2 text-[20px] font-medium rounded-md'
                    type="button" onClick={handleAddInstallment} >
                    Add Installment
                    </button>
                </div>
        
            </div>

            <div>
                <h3>Installments:</h3>
                <ul>
                {state.installments.map((inst, index) => (
                    <li key={index}>{inst.name} - {inst.date} - {inst.receiptNo} - {inst.receivedAmount}</li>
                ))}
                </ul>
            </div>

            {state.error && <div style={{ color: 'red' }}>{state.error}</div>}

            <button type="submit" disabled={state.isLoading}>
                {state.isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
    </div>
  );
};

export default AdduserForm;
