
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik, FormikProvider, FieldArray } from 'formik'
import * as yup from 'yup'

import { Container, Stack, Grid, Typography, Button, Card, TextField, InputAdornment, Popper, Select, MenuItem, FormControl, InputLabel} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles'

import { createProduct, updateProduct } from '../../app/products/products.action'
import { selectProduct } from '../../app/products/products.selector';
import { getProduct } from '../../app/products/products.action';

const PopperStyle = styled((props) => (
  <Popper placement='bottom-start' {...props} />
))({
  width: '280px !important',
});


const validationSchema = yup.object({
  title: yup
    .string()
    .required('Name is required'),
  description: yup
    .string()
    .max(1000, 'Description cannot be more than 250 characters')
    .required('Description is required'),
  price: yup.number().min(1, 'Price is required'),
  business: yup.string().required('Merchant is required'),
  type: yup.string().required('Reward category is required')


});

const types = [
  'Food',
  'Groceries',
  'Shopping',
  'Travel',
  'Transport',
  'Acitivties',
  'Health',
  'Finance'
]

const business = [
  'McDonald',
  'GongCha',
  'KFC',
  'Popeyes',
  'Jollibee',
  'Subway',
  'FairPrice',
  'ColdStorage',
  'ShengSiong',
  'Giant'
]

const CreateProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {id} = useParams()
    
    useEffect(() => {
        dispatch(getProduct(id))
    }, [])

    const product = useSelector(selectProduct)

    const Thumb = ( {file} ) => {
      const [state, setState] = useState({
        loading: false,
        thumb: undefined
      })

      useEffect(() => {
        if (!file) return 
        setState({...state, loading: true})
        const reader = new FileReader()
        reader.onloadend = () => {
            setState({ loading: false, thumb: reader.result });
        };
        reader.readAsDataURL(file);
      }, [file])

      if (!file) { return null; }

      if (state.loading) { return <p>loading...</p>; }

      return (<img src={state.thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200} />);
    }
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
        image: null,
        price: '',
        type: '',
        business: '',
        validity: new Date(),
        codes: [{code: ''}]
      },
      validationSchema: validationSchema,
      onSubmit: (values, {resetForm}) => {
        try{
           const formData = new FormData();
           formData.append('title', values.title)
           formData.append('description', values.description)
           formData.append('image', values.image)
           formData.append('price', values.price)
           formData.append('type', values.type)
           formData.append('business', values.business)
           formData.append('validity', values.validity)
           formData.append('codes',JSON.stringify(values.codes))
           dispatch(updateProduct(id, formData)).then(response => {
             resetForm()
             navigate('/dashboard/product/list')
           })
        } catch (err) {
          alert(err)
        }
      },
    });

    useEffect(() => {
      formik.setValues({...product, image: ''})
    }, [product])

    return ( 
    <Container>
      <Typography variant="h4" gutterBottom sx={{mb: 5}}>
        Update product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Card sx={{p: 2.4, mb:2}}>
                <Stack spacing={2}>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="Product Name"
                      required
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                    <div>
                      <Typography variant='subtitle2' color='grey.600' gutterBottom>
                        Description
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Write something awesome..."
                        multiline
                        rows={6}
                        id="description"
                        name="description"
                        required
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                      />
                    </div>
                    <div>
                      <Typography variant='subtitle2' color='grey.600' gutterBottom>
                        Image
                      </Typography>
                      
                     <input id="image" name="image" type="file" onChange={(event) => {
                        formik.setFieldValue("image", event.currentTarget.files[0]);
                      }} className="form-control" />
                      <Thumb file={formik.values.image} />
                    </div>
                </Stack>
            </Card>
            <Card sx={{p: 2.4, mb: 2}}>
              <div>
                  <Typography variant='subtitle2' color='grey.600' gutterBottom>
                    Codes
                  </Typography>
                <FormikProvider value={formik}>
                  <FieldArray name="codes">
                    {({ push, remove }) => (
                      <Stack spacing={2}>
                        <Grid container spacing={2}>
                          {formik?.values?.codes?.map((code, index) => {
                            return (
                                  <Grid item xs={6} key={index}>
                                    <Stack direction='row' alignItems='center' spacing={2}>
                                      <TextField
                                        size='small'
                                        label='Codes'
                                        id='codes'
                                        name={`codes.${index}.code`}
                                        placeholder='Enter a code'
                                        value={code.code}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                      />
                                      <Button
                                        type="button"
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => remove(index)}
                                      >
                                        x
                                      </Button>
                                    </Stack>
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Button
                          sx={{width:20}}
                          type="button"
                          variant="contained"
                          onClick={() =>
                            push({code: ''})
                          }
                        >
                          Add
                        </Button>
                      </Stack>
                    )}
                  </FieldArray>
                </FormikProvider>
                </div>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card sx={{p: 2.4, mb: 2}} >
              <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label='price'
                    id="price"
                    name="price"
                    placeholder='0'
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    required
                    InputProps= {
                      {
                        endAdornment: <InputAdornment position="end">points</InputAdornment>
                      }
                    }
                  />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                      disablePast
                      name="validity"
                      value={formik.values.validity}
                      onChange={(date) => formik.setFieldValue('validity', date, true)}
                      label="Expiry Date"
                      inputFormat="dd/MM/yyyy"    
                      renderInput={(params) => <TextField   
                      {...params} sx={{ width: '100%' }}/>}
                  />                    
               </LocalizationProvider> 
               <FormControl>
                <InputLabel id="business">Merchant</InputLabel>
                <Select
                  labelId='business'
                  id="business"
                  value={formik.values.business}
                  label="business"
                  name='business'
                  onChange={formik.handleChange}
                  required
                >
                  {business.map((val, indx) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                  </Select> 
               </FormControl>
              <FormControl>
                  <InputLabel id="type">Reward Category</InputLabel>
                  <Select
                  labelId='type'
                  id="type"
                  value={formik.values.type}
                  label="type"
                  name='type'
                  onChange={formik.handleChange}
                  required
                >
                  {types.map((val, indx) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                  </Select> 
               </FormControl>
              </Stack>
            </Card>
            <Button color="primary" variant="contained" fullWidth type="submit" sx={{p: '10px 22px'}}>
                  Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>    

     );
}
 
export default CreateProduct;