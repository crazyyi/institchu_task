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
    render(<BrowserRouter><AddUser /></BrowserRouter>);
    const data: User = {
      "id": 11,
      "name": "Brad Pitt",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
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