import styled from "styled-components"
import { Title } from "./Title"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const FormPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0 10px;
`

const FormLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  width: 400px;
  line-height: 26px;
  margin-bottom: 10px;
`
const FormInput = styled.input`
  height: 20px;
  flex: 0 0 200px;
  margin-left: auto;
`

const SubmitInput = styled.input`
  height: 35px;
  width: 90px;
  cursor: pointer;
  align-self: center;
  margin: 15px 0;
`

// sample data
// {
//   "id": 11,
//   "name": "Brad Pitt",
//   "username": "Samantha",
//   "email": "Nathan@yesenia.net",
//   "address": {
//     "street": "Douglas Extension",
//     "suite": "Suite 847",
//     "city": "McKenziehaven",
//     "zipcode": "59590-4157",
//     "geo": {
//       "lat": "-68.6102",
//       "lng": "-47.0653"
//     }
//   },
//   "phone": "1-463-123-4447",
//   "website": "ramiro.info",
//   "company": {
//     "name": "Romaguera-Jacobson",
//     "catchPhrase": "Face to face bifurcated interface",
//     "bs": "e-enable strategic applications"
//   }
// }

const AddUser = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data))
    const createNewUser = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const user = await result.json()
      navigate("/afterCreated", { replace: true })
    }

    createNewUser()
  }

  return <div>
    <Title>Add New User</Title>
    <FormPanel>
      <UserForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput hidden {...register("id", { valueAsNumber: true })} value={11} />
        <FormLabel htmlFor="">
          Name:
          <FormInput {...register("name")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Username:
          <FormInput {...register("username")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Email:
          <FormInput {...register("email")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Address(Street):
          <FormInput {...register("address.street")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Suite:
          <FormInput {...register("address.suite")} />
        </FormLabel>
        <FormLabel htmlFor="">
          City:
          <FormInput {...register("address.city")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Zipcode:
          <FormInput {...register("address.zipcode")} />
        </FormLabel>
        <FormLabel htmlFor="">
          GEO.LAT:
          <FormInput {...register("address.geo.lat")} />
        </FormLabel>
        <FormLabel htmlFor="">
          GEO.LNG:
          <FormInput {...register("address.geo.lng")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Phone:
          <FormInput {...register("phone")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Website:
          <FormInput {...register("website")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Company Name:
          <FormInput {...register("company.name")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Company CatchPhrase:
          <FormInput {...register("company.catchPhrase")} />
        </FormLabel>
        <FormLabel htmlFor="">
          Company BS:
          <FormInput {...register("company.bs")} />
        </FormLabel>
        <SubmitInput type="submit" value="Submit" />
      </UserForm>
    </FormPanel>
  </div>
}

export default AddUser