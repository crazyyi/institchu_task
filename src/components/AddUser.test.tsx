import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import AfterCreated from './AfterCreated';
import AddUser from './AddUser';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

interface GEO {
  lat: string,
  lng: string
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: GEO
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company
}

global.fetch = jest.fn();

describe('Add User Form module', () => {
  test('add new user and get response from server', async () => {
    const { container } = render(<BrowserRouter><AddUser /></BrowserRouter>);
    const data: User = {
      "id": 11,
      "name": "Brad Pitt",
      "username": "BradPitt",
      "email": "brad.pitt@gmail.com",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    };

    const nameInput = container.querySelector(`input[name="name"]`) as HTMLInputElement;
    fireEvent.change(nameInput, {
      target: { value: "Brad Pitt" },
    });
    const usernameInput = container.querySelector(`input[name="username"]`) as HTMLInputElement;
    fireEvent.change(usernameInput, {
      target: { value: "BradPitt" },
    });
    const emailInput = container.querySelector(`input[name="email"]`) as HTMLInputElement;
    fireEvent.change(emailInput, {
      target: { value: "brad.pitt@gmail.com" },
    });
    const streetInput = container.querySelector(`input[name="address.street"]`) as HTMLInputElement;
    fireEvent.change(streetInput, {
      target: { value: "Douglas Extension" },
    });
    const suiteInput = container.querySelector(`input[name="address.suite"]`) as HTMLInputElement;
    fireEvent.change(suiteInput, {
      target: { value: "Suite 847" },
    });
    const cityInput = container.querySelector(`input[name="address.city"]`) as HTMLInputElement;
    fireEvent.change(cityInput, {
      target: { value: "McKenziehaven" },
    });
    const zipcodeInput = container.querySelector(`input[name="address.zipcode"]`) as HTMLInputElement;
    fireEvent.change(zipcodeInput, {
      target: { value: "59590-4157" },
    });
    const geoLatInput = container.querySelector(`input[name="address.geo.lat"]`) as HTMLInputElement;
    fireEvent.change(geoLatInput, {
      target: { value: "-68.6102" },
    });
    const geoLngInput = container.querySelector(`input[name="address.geo.lng"]`) as HTMLInputElement;
    fireEvent.change(geoLngInput, {
      target: { value: "-47.0653" },
    });
    const phoneInput = container.querySelector(`input[name="phone"]`) as HTMLInputElement;
    fireEvent.change(phoneInput, {
      target: { value: "1-463-123-4447" },
    });
    const websiteInput = container.querySelector(`input[name="website"]`) as HTMLInputElement;
    fireEvent.change(websiteInput, {
      target: { value: "ramiro.info" },
    });
    const companyNameInput = container.querySelector(`input[name="company.name"]`) as HTMLInputElement;
    fireEvent.change(companyNameInput, {
      target: { value: "Romaguera-Jacobson" },
    });
    const companyCPInput = container.querySelector(`input[name="company.catchPhrase"]`) as HTMLInputElement;
    fireEvent.change(companyCPInput, {
      target: { value: "Face to face bifurcated interface" },
    });
    const companyBSInput = container.querySelector(`input[name="company.bs"]`) as HTMLInputElement;
    fireEvent.change(companyBSInput, {
      target: { value: "e-enable strategic applications" },
    });

    const button = screen.getByText('Submit')
    fireEvent.click(button);

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(data),
    });

    render(<MemoryRouter><AfterCreated /></MemoryRouter>);
    await waitFor(() => screen.getByText("New user is created"))
    const linkElement = screen.getByText(/Home Page/i);
    expect(linkElement).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    });

  })
})