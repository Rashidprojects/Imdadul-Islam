import { NumericFormat } from "react-number-format";
import { useAddUserForm } from "../../lib/hooks/useAddUserForm";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Installment = () => {
    const {
        state, dispatch,
        handlers: {
            handleInstallmentChange,
            handleAddInstallment
        },
        uiState: {
            editIndex
        }
    } = useAddUserForm();

    console.log('in installment :', state.installments.length);
    
    

  return (
    <div>
        <div className={`flex-col justify-center items-center ${state.isInstallment ? 'flex' : 'hidden' } `}>
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
                                value={ editIndex ? state.installment.name : state.installment.name || "default"}
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
                                { state.installments.length === 0 && ( 
                                    <MenuItem value="Installment 1">Installment 1</MenuItem>
                                    ) }

                                { state.installments.length > 0 && state.installments.length < 15 && (
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
                        className='w-full border px-1 border-secondary text-secondary rounded-md bg-light py-2 font-medium text-[14px] md:text-[20px] '
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
                        className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] '
                        name="receiptNo"
                        value={state.installment.receiptNo}
                        onChange={handleInstallmentChange}
                        autoComplete="off"
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label className='text-[15px] md:text-[20px]'>Received amount</label>
                        <NumericFormat
                        className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] '
                        thousandSeparator={true}
                        name="receivedAmount"
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
    </div>
  )
}

export default Installment